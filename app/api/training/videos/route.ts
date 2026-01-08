import { NextResponse } from "next/server";
import { getVideos } from "@/lib/content";

export async function GET() {
  try {
    const videos = getVideos();
    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error loading videos:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des vidéos" },
      { status: 500 }
    );
  }
}
