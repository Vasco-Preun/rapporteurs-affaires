import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";

// Détecter si on est sur Vercel (avec KV) ou en local
const isVercelKVAvailable = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
const useKV = isVercelKVAvailable;

// Stockage local (fichiers JSON)
const dataDir = path.join(process.cwd(), "data");

if (!useKV && !fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const usersKey = "users";

// Clé format : apporteur:last_login:<userId>
function getLastLoginKey(userId: string): string {
  return `apporteur:last_login:${userId}`;
}

// Fonctions de stockage abstraites
export async function readUsersFromStorage(): Promise<any[]> {
  if (useKV) {
    try {
      const users = await kv.get(usersKey);
      return users ? (Array.isArray(users) ? users : []) : [];
    } catch (error) {
      console.error("Error reading users from KV:", error);
      return [];
    }
  } else {
    // Stockage local
    const usersFile = path.join(dataDir, "users.json");
    try {
      if (!fs.existsSync(usersFile)) {
        return [];
      }
      const content = fs.readFileSync(usersFile, "utf8");
      return JSON.parse(content);
    } catch (error) {
      console.error("Error reading users from file:", error);
      return [];
    }
  }
}

export async function writeUsersToStorage(users: any[]): Promise<void> {
  if (useKV) {
    try {
      await kv.set(usersKey, users);
    } catch (error) {
      console.error("Error writing users to KV:", error);
      throw error;
    }
  } else {
    // Stockage local
    const usersFile = path.join(dataDir, "users.json");
    try {
      fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
    } catch (error) {
      console.error("Error writing users to file:", error);
      throw error;
    }
  }
}

// Enregistrer la dernière connexion d'un apporteur (seulement lors du login)
export async function setLastLogin(userId: string): Promise<void> {
  const lastLogin = {
    at: new Date().toISOString(),
  };

  if (useKV) {
    try {
      const key = getLastLoginKey(userId);
      await kv.set(key, lastLogin);
    } catch (error) {
      console.error("Error setting last login in KV:", error);
      throw error;
    }
  } else {
    // Stockage local (pour développement)
    const lastLoginFile = path.join(dataDir, `last_login_${userId}.json`);
    try {
      fs.writeFileSync(lastLoginFile, JSON.stringify(lastLogin, null, 2), "utf8");
    } catch (error) {
      console.error("Error writing last login to file:", error);
      throw error;
    }
  }
}

// Récupérer la dernière connexion d'un apporteur
export async function getLastLogin(userId: string): Promise<{ at: string } | null> {
  if (useKV) {
    try {
      const key = getLastLoginKey(userId);
      const lastLogin = await kv.get<{ at: string }>(key);
      return lastLogin || null;
    } catch (error) {
      console.error("Error getting last login from KV:", error);
      return null;
    }
  } else {
    // Stockage local (pour développement)
    const lastLoginFile = path.join(dataDir, `last_login_${userId}.json`);
    try {
      if (!fs.existsSync(lastLoginFile)) {
        return null;
      }
      const content = fs.readFileSync(lastLoginFile, "utf8");
      return JSON.parse(content);
    } catch (error) {
      console.error("Error reading last login from file:", error);
      return null;
    }
  }
}
