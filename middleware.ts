import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "partner_session";
const ADMIN_SESSION_COOKIE = "admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Routes publiques (accessibles sans authentification)
  const publicRoutes = ["/login", "/api/auth"];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Routes d'API et statiques (toujours accessibles)
  const isApiRoute = pathname.startsWith("/api");
  const isStaticFile = pathname.startsWith("/_next") || 
                       pathname.startsWith("/favicon") ||
                       pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|css|js)$/);
  
  // Routes admin publiques (login admin)
  const adminPublicRoutes = ["/admin/login"];
  const isAdminPublicRoute = adminPublicRoutes.some(route => pathname === route);
  
  // Si c'est une route publique, statique ou API, laisser passer
  if (isPublicRoute || isStaticFile || isApiRoute || isAdminPublicRoute) {
    return NextResponse.next();
  }
  
  // Protection spéciale pour les routes admin
  if (pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get(ADMIN_SESSION_COOKIE);
    
    // Si pas de session admin, rediriger vers /admin/login
    if (!adminSession?.value || adminSession.value !== "authenticated") {
      const adminLoginUrl = new URL("/admin/login", request.url);
      adminLoginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(adminLoginUrl);
    }
    
    // Admin authentifié, continuer
    return NextResponse.next();
  }
  
  // Pour les autres routes, vérifier si l'utilisateur est connecté (apporteur d'affaires)
  const session = request.cookies.get(SESSION_COOKIE);
  
  // Si pas de session et pas sur une route publique, rediriger vers /login
  if (!session?.value) {
    const loginUrl = new URL("/login", request.url);
    // Ajouter l'URL d'origine comme paramètre pour rediriger après connexion
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Utilisateur authentifié, continuer
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
