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

// Clé format : apporteur:login_history:<userId>
function getLoginHistoryKey(userId: string): string {
  return `apporteur:login_history:${userId}`;
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

// Enregistrer une nouvelle connexion d'un apporteur (ajoute à l'historique)
export async function setLastLogin(userId: string): Promise<void> {
  const newLogin = {
    at: new Date().toISOString(),
  };

  if (useKV) {
    try {
      const key = getLoginHistoryKey(userId);
      // Récupérer l'historique existant ou créer un nouveau tableau
      const existingHistory = await kv.get<Array<{ at: string }>>(key) || [];
      // Ajouter la nouvelle connexion au début du tableau (plus récente en premier)
      const updatedHistory = [newLogin, ...existingHistory];
      // Limiter à 1000 connexions max pour éviter de surcharger le stockage
      const limitedHistory = updatedHistory.slice(0, 1000);
      await kv.set(key, limitedHistory);
    } catch (error) {
      console.error("Error setting login history in KV:", error);
      throw error;
    }
  } else {
    // Stockage local (pour développement)
    const historyFile = path.join(dataDir, `login_history_${userId}.json`);
    try {
      // Récupérer l'historique existant ou créer un nouveau tableau
      let existingHistory: Array<{ at: string }> = [];
      if (fs.existsSync(historyFile)) {
        const content = fs.readFileSync(historyFile, "utf8");
        existingHistory = JSON.parse(content) || [];
      }
      // Ajouter la nouvelle connexion au début du tableau
      const updatedHistory = [newLogin, ...existingHistory];
      // Limiter à 1000 connexions max
      const limitedHistory = updatedHistory.slice(0, 1000);
      fs.writeFileSync(historyFile, JSON.stringify(limitedHistory, null, 2), "utf8");
    } catch (error) {
      console.error("Error writing login history to file:", error);
      throw error;
    }
  }
}

// Récupérer la dernière connexion d'un apporteur (pour compatibilité)
export async function getLastLogin(userId: string): Promise<{ at: string } | null> {
  const history = await getLoginHistory(userId);
  if (!history || history.length === 0) {
    return null;
  }
  // Retourner la première connexion (la plus récente)
  return history[0];
}

// Récupérer tout l'historique de connexions d'un apporteur
export async function getLoginHistory(userId: string): Promise<Array<{ at: string }>> {
  if (useKV) {
    try {
      const key = getLoginHistoryKey(userId);
      const history = await kv.get<Array<{ at: string }>>(key);
      return history || [];
    } catch (error) {
      console.error("Error getting login history from KV:", error);
      return [];
    }
  } else {
    // Stockage local (pour développement)
    const historyFile = path.join(dataDir, `login_history_${userId}.json`);
    try {
      if (!fs.existsSync(historyFile)) {
        return [];
      }
      const content = fs.readFileSync(historyFile, "utf8");
      const history = JSON.parse(content);
      return Array.isArray(history) ? history : [];
    } catch (error) {
      console.error("Error reading login history from file:", error);
      return [];
    }
  }
}
