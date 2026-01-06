import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getServices,
  getScripts,
  getArguments,
  getPrimes,
  getExamples,
  getVideos,
  saveServices,
  saveScripts,
  saveArguments,
  savePrimes,
  saveExamples,
  saveVideos,
} from "@/lib/content";

export async function GET() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    return NextResponse.json({
      services: getServices(),
      scripts: getScripts(),
      arguments: getArguments(),
      primes: getPrimes(),
      examples: getExamples(),
      videos: getVideos(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.services) saveServices(body.services);
    if (body.scripts) saveScripts(body.scripts);
    if (body.arguments) saveArguments(body.arguments);
    if (body.primes) savePrimes(body.primes);
    if (body.examples) saveExamples(body.examples);
    if (body.videos) saveVideos(body.videos);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

