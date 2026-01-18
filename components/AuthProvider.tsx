"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, name: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Session check error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success && data.user) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Erreur de connexion" };
      }
    } catch (error) {
      return { success: false, error: "Erreur de connexion" };
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Erreur réseau" }));
        return { success: false, error: errorData.error || `Erreur ${res.status}` };
      }

      const data = await res.json();

      if (data.success) {
        // Après inscription, connecter automatiquement
        return await login(email, password);
      } else {
        return { success: false, error: data.error || "Erreur d'inscription" };
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      return { success: false, error: error.message || "Erreur d'inscription. Vérifiez votre connexion." };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const refreshSession = async () => {
    await checkSession();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
