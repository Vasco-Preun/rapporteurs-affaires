import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUserById } from "@/lib/users";

const SESSION_COOKIE = "partner_session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);

    if (!session?.value) {
      return NextResponse.json({ authenticated: false });
    }

    const user = await getUserById(session.value);

    if (!user) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
