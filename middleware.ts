import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Vérifier si l'utilisateur a une session site
  const siteSession = request.cookies.get("site_session");
  const isAuthenticated = siteSession?.value === "authenticated";
  
  // Pages publiques (login et API login)
  const publicPaths = ["/login", "/api/login"];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // Si pas authentifié et pas sur une page publique, rediriger vers login
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Si authentifié et sur la page login, rediriger vers l'accueil
  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
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
