import { NextRequest, NextResponse } from "next/server";
import { verifyUser, recordLastLogin } from "@/lib/users";
import { cookies } from "next/headers";

const SESSION_COOKIE = "partner_session";
const SESSION_DURATION = 60 * 60 * 24 * 30; // 30 jours

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    const result = await verifyUser(email, password);

    if (!result.success || !result.user) {
      return NextResponse.json(
        { error: result.message || "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Créer la session
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, result.user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_DURATION,
    });

    // Enregistrer la date/heure de dernière connexion (seulement lors du login réussi)
    await recordLastLogin(result.user.id);

    return NextResponse.json({ 
      success: true,
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la connexion" },
      { status: 500 }
    );
  }
}
