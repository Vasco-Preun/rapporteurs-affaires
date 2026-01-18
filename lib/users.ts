import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const dataDir = path.join(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");
const loginLogsFile = path.join(dataDir, "login_logs.json");

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

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

function readUsers(): User[] {
  try {
    if (!fs.existsSync(usersFile)) {
      return [];
    }
    const content = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
}

function writeUsers(users: User[]): void {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing users:", error);
    throw error;
  }
}

function readLoginLogs(): LoginLog[] {
  try {
    if (!fs.existsSync(loginLogsFile)) {
      return [];
    }
    const content = fs.readFileSync(loginLogsFile, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading login logs:", error);
    return [];
  }
}

function writeLoginLogs(logs: LoginLog[]): void {
  try {
    // Garder seulement les 1000 dernières connexions pour éviter que le fichier ne devienne trop gros
    const recentLogs = logs.slice(-1000);
    fs.writeFileSync(loginLogsFile, JSON.stringify(recentLogs, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing login logs:", error);
    throw error;
  }
}

export async function createUser(email: string, name: string, password: string): Promise<{ success: boolean; message: string; userId?: string }> {
  const users = readUsers();
  
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
  writeUsers(users);

  return { success: true, message: "Compte créé avec succès", userId: newUser.id };
}

export async function verifyUser(email: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> {
  const users = readUsers();
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
  writeUsers(users);

  return { success: true, user };
}

export function getUserById(userId: string): User | undefined {
  const users = readUsers();
  return users.find(u => u.id === userId);
}

export function getAllUsers(): User[] {
  return readUsers();
}

export async function logLogin(userId: string, email: string, name: string, ip?: string, userAgent?: string): Promise<void> {
  const logs = readLoginLogs();
  
  const log: LoginLog = {
    userId,
    email,
    name,
    timestamp: new Date().toISOString(),
    ip,
    userAgent,
  };

  logs.push(log);
  writeLoginLogs(logs);
}

export function getLoginLogs(limit: number = 100): LoginLog[] {
  const logs = readLoginLogs();
  return logs.slice(-limit).reverse(); // Les plus récents en premier
}

export function getLoginLogsByUser(userId: string): LoginLog[] {
  const logs = readLoginLogs();
  return logs.filter(log => log.userId === userId).reverse();
}
