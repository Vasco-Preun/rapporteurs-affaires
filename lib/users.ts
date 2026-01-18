import bcrypt from "bcryptjs";
import {
  readUsersFromStorage,
  writeUsersToStorage,
  setLastLogin as setLastLoginStorage,
  getLastLogin as getLastLoginStorage,
  getLoginHistory as getLoginHistoryStorage,
} from "@/lib/storage";

export interface User {
  id: string;
  email: string;
  name: string;
  hashedPassword: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LastLogin {
  at: string; // Format ISO: "YYYY-MM-DDTHH:MM:SSZ"
}

export interface LoginHistory {
  at: string; // Format ISO: "YYYY-MM-DDTHH:MM:SSZ"
}

async function readUsers(): Promise<User[]> {
  return await readUsersFromStorage();
}

async function writeUsers(users: User[]): Promise<void> {
  await writeUsersToStorage(users);
}

export async function createUser(email: string, name: string, password: string): Promise<{ success: boolean; message: string; userId?: string }> {
  try {
    const users = await readUsers();
    
    // Vérifier si l'email existe déjà
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "Cet email est déjà utilisé" };
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase(),
      name,
      hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsers(users);

    return { success: true, message: "Compte créé avec succès", userId: newUser.id };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { success: false, message: error.message || "Erreur lors de la création du compte" };
  }
}

export async function verifyUser(email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> {
  const users = await readUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, message: "Email ou mot de passe incorrect" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordValid) {
    return { success: false, message: "Email ou mot de passe incorrect" };
  }

  // Note: La dernière connexion est enregistrée dans Vercel KV par recordLastLogin() lors du login
  // Pas besoin de mettre à jour ici

  return { success: true, user };
}

export async function getUserById(userId: string): Promise<User | undefined> {
  const users = await readUsers();
  return users.find(u => u.id === userId);
}

export async function getAllUsers(): Promise<User[]> {
  return await readUsers();
}

// Enregistrer la dernière connexion (appelé uniquement lors du login réussi)
export async function recordLastLogin(userId: string): Promise<void> {
  await setLastLoginStorage(userId);
}

// Récupérer la dernière connexion d'un apporteur
export async function getLastLoginForUser(userId: string): Promise<LastLogin | null> {
  return await getLastLoginStorage(userId);
}

// Récupérer les dernières connexions de tous les apporteurs (pour l'admin)
export async function getAllLastLogins(): Promise<Array<{ userId: string; lastLogin: LastLogin | null; user?: User }>> {
  const users = await readUsers();
  const result = await Promise.all(
    users.map(async (user) => {
      const lastLogin = await getLastLoginStorage(user.id);
      return {
        userId: user.id,
        lastLogin,
        user,
      };
    })
  );
  return result;
}

// Récupérer l'historique complet de connexions de tous les apporteurs (pour l'admin)
export async function getAllLoginHistories(): Promise<Array<{ userId: string; loginHistory: LoginHistory[]; lastLogin: LastLogin | null; user?: User }>> {
  const users = await readUsers();
  const result = await Promise.all(
    users.map(async (user) => {
      const loginHistory = await getLoginHistoryStorage(user.id);
      const lastLogin = loginHistory.length > 0 ? loginHistory[0] : null;
      return {
        userId: user.id,
        loginHistory,
        lastLogin,
        user,
      };
    })
  );
  return result;
}
