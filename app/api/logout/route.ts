import { NextRequest, NextResponse } from "next/server";
import { deleteSiteSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await deleteSiteSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
