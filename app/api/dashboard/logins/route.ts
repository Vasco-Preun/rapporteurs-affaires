import { NextRequest, NextResponse } from "next/server";
import { getAllLastLogins } from "@/lib/users";

/**
 * API sécurisée pour exposer les données de connexion des apporteurs d'affaires
 * À appeler depuis le dashboard Nexus externe
 * 
 * Authentification : Clé API via header "X-API-Key"
 * Variable d'environnement : DASHBOARD_API_KEY
 * 
 * Usage:
 * GET /api/dashboard/logins
 * Headers: { "X-API-Key": "votre-clé-api" }
 */
export async function GET(request: NextRequest) {
  try {
    // Vérifier la clé API
    const apiKey = request.headers.get("X-API-Key");
    const validApiKey = process.env.DASHBOARD_API_KEY;

    if (!validApiKey) {
      console.error("DASHBOARD_API_KEY n'est pas configurée dans les variables d'environnement");
      return NextResponse.json(
        { error: "Configuration serveur incomplète" },
        { status: 500 }
      );
    }

    if (!apiKey || apiKey !== validApiKey) {
      return NextResponse.json(
        { error: "Clé API invalide" },
        { status: 401 }
      );
    }

    // Récupérer les dernières connexions
    const lastLogins = await getAllLastLogins();

    // Formater les données pour le dashboard
    const formattedData = lastLogins.map((item) => ({
      userId: item.userId,
      userName: item.user?.name || "N/A",
      userEmail: item.user?.email || "N/A",
      lastLogin: item.lastLogin?.at || null,
      createdAt: item.user?.createdAt || null,
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      count: formattedData.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des données" },
      { status: 500 }
    );
  }
}
