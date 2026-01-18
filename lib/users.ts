import bcrypt from "bcryptjs";
import {
  readUsersFromStorage,
  writeUsersToStorage,
  readLoginLogsFromStorage,
  writeLoginLogsToStorage,
} from "@/lib/storage";

export interface User {
  id: string;
  email: string;
  name: string;
  hashedPassword: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginLog {
  userId: string;
  email: string;
  name: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

async function readUsers(): Promise<User[]> {
  return await readUsersFromStorage();
}

async function writeUsers(users: User[]): Promise<void> {
  await writeUsersToStorage(users);
}

async function readLoginLogs(): Promise<LoginLog[]> {
  return await readLoginLogsFromStorage();
}

async function writeLoginLogs(logs: LoginLog[]): Promise<void> {
  await writeLoginLogsToStorage(logs);
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

  // Mettre à jour la dernière connexion
  user.lastLogin = new Date().toISOString();
  await writeUsers(users);

  return { success: true, user };
}

export async function getUserById(userId: string): Promise<User | undefined> {
  const users = await readUsers();
  return users.find(u => u.id === userId);
}

export async function getAllUsers(): Promise<User[]> {
  return await readUsers();
}

export async function logLogin(userId: string, email: string, name: string, ip?: string, userAgent?: string): Promise<void> {
  const logs = await readLoginLogs();
  
  const log: LoginLog = {
    userId,
    email,
    name,
    timestamp: new Date().toISOString(),
    ip,
    userAgent,
  };

  logs.push(log);
  await writeLoginLogs(logs);
}

export async function getLoginLogs(limit: number = 100): Promise<LoginLog[]> {
  const logs = await readLoginLogs();
  return logs.slice(-limit).reverse(); // Les plus récents en premier
}

export async function getLoginLogsByUser(userId: string): Promise<LoginLog[]> {
  const logs = await readLoginLogs();
  return logs.filter(log => log.userId === userId).reverse();
}
