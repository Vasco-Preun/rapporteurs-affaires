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
const loginLogsKey = "login_logs";

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

export async function readLoginLogsFromStorage(): Promise<any[]> {
  if (useKV) {
    try {
      const logs = await kv.get(loginLogsKey);
      return logs ? (Array.isArray(logs) ? logs : []) : [];
    } catch (error) {
      console.error("Error reading login logs from KV:", error);
      return [];
    }
  } else {
    // Stockage local
    const loginLogsFile = path.join(dataDir, "login_logs.json");
    try {
      if (!fs.existsSync(loginLogsFile)) {
        return [];
      }
      const content = fs.readFileSync(loginLogsFile, "utf8");
      return JSON.parse(content);
    } catch (error) {
      console.error("Error reading login logs from file:", error);
      return [];
    }
  }
}

export async function writeLoginLogsToStorage(logs: any[]): Promise<void> {
  // Garder seulement les 1000 dernières connexions
  const recentLogs = logs.slice(-1000);
  
  if (useKV) {
    try {
      await kv.set(loginLogsKey, recentLogs);
    } catch (error) {
      console.error("Error writing login logs to KV:", error);
      throw error;
    }
  } else {
    // Stockage local
    const loginLogsFile = path.join(dataDir, "login_logs.json");
    try {
      fs.writeFileSync(loginLogsFile, JSON.stringify(recentLogs, null, 2), "utf8");
    } catch (error) {
      console.error("Error writing login logs to file:", error);
      throw error;
    }
  }
}
