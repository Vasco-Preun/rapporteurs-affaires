import { NextResponse } from "next/server";
import { loadScenarios } from "@/lib/training/loadScenarios";

export async function GET() {
  try {
    const scenarios = loadScenarios();
    return NextResponse.json({ scenarios });
  } catch (error) {
    console.error("Error loading scenarios:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des scénarios" },
      { status: 500 }
    );
  }
}

