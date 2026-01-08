import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

// Admin session
const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_DURATION = 60 * 60 * 24; // 24 heures

// Site session
const SITE_SESSION_COOKIE = "site_session";

// Admin functions
export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return false;
  }
  // Si le mot de passe dans l'env est déjà hashé, on compare directement
  // Sinon, on hash le mot de passe fourni et on compare
  try {
    return await bcrypt.compare(password, adminPassword) || password === adminPassword;
  } catch {
    return password === adminPassword;
  }
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  return session?.value === "authenticated";
}

// Site authentication functions
export async function verifySitePassword(password: string): Promise<boolean> {
  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) {
    // Si pas de mot de passe défini, on refuse l'accès (sécurité par défaut)
    console.error("[AUTH] SITE_PASSWORD non défini dans les variables d'environnement");
    return false;
  }
  
  // Nettoyer les espaces en début/fin
  const cleanPassword = password.trim();
  const cleanSitePassword = sitePassword.trim();
  
  try {
    // Essayer d'abord la comparaison en clair (pour Vercel)
    if (cleanPassword === cleanSitePassword) {
      return true;
    }
    // Ensuite essayer bcrypt si le mot de passe dans l'env est hashé
    return await bcrypt.compare(cleanPassword, cleanSitePassword);
  } catch (error) {
    // En cas d'erreur bcrypt, fallback sur comparaison en clair
    console.error("[AUTH] Erreur lors de la vérification:", error);
    return cleanPassword === cleanSitePassword;
  }
}

export async function createSiteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SITE_SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
  });
}

export async function deleteSiteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SITE_SESSION_COOKIE);
}

export async function isSiteAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SITE_SESSION_COOKIE);
  return session?.value === "authenticated";
}

