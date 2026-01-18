import { NextResponse } from "next/server";
import { getLoginLogs } from "@/lib/users";
import { isAuthenticated } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    // Vérifier que c'est un admin (ou vous pouvez créer une autre vérification)
    const auth = await isAuthenticated();
    
    // Pour l'instant, on autorise si admin ou on peut changer ça plus tard
    // if (!auth) {
    //   return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    // }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "100");

    const logs = await getLoginLogs(limit);

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Get logs error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
