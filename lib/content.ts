import fs from "fs";
import path from "path";
import type {
  ServiceItem,
  ScriptItem,
  ArgumentItem,
  PrimeItem,
  ExampleItem,
  VideoItem,
  ScriptType,
} from "@/types";

const contentDir = path.join(process.cwd(), "content");

// Fonction générique pour lire un fichier JSON
function readJSONFile<T>(filename: string): T[] {
  const filePath = path.join(contentDir, filename);
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

// Fonction générique pour écrire un fichier JSON
function writeJSONFile<T>(filename: string, data: T[]): void {
  const filePath = path.join(contentDir, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

export function getServices(): ServiceItem[] {
  return readJSONFile<ServiceItem>("services.json");
}

export function getServicesByCategory(category: "entreprise" | "influenceur"): ServiceItem[] {
  return getServices().filter((service) => service.category === category);
}

export function getScripts(): ScriptItem[] {
  return readJSONFile<ScriptItem>("scripts.json");
}

export function getScriptsByType(type: ScriptType): ScriptItem[] {
  return getScripts().filter((script) => script.type === type);
}

export function getArguments(): ArgumentItem[] {
  return readJSONFile<ArgumentItem>("arguments.json");
}

export function getArgumentsByService(service: string): ArgumentItem[] {
  return getArguments().filter((arg) => arg.service === service);
}

export function getPrimes(): PrimeItem[] {
  return readJSONFile<PrimeItem>("primes.json");
}

export function getActivePrimes(): PrimeItem[] {
  return getPrimes().filter((prime) => prime.status === "active");
}

export function getExamples(): ExampleItem[] {
  return readJSONFile<ExampleItem>("examples.json");
}

export function getVideos(): VideoItem[] {
  return readJSONFile<VideoItem>("videos.json");
}

export function getVideosByCategory(category: "youtube" | "nexus"): VideoItem[] {
  return getVideos().filter((video) => video.category === category);
}

// Fonctions d'écriture pour l'admin
export function saveServices(services: ServiceItem[]): void {
  writeJSONFile("services.json", services);
}

export function saveScripts(scripts: ScriptItem[]): void {
  writeJSONFile("scripts.json", scripts);
}

export function saveArguments(argumentItems: ArgumentItem[]): void {
  writeJSONFile("arguments.json", argumentItems);
}

export function savePrimes(primes: PrimeItem[]): void {
  writeJSONFile("primes.json", primes);
}

export function saveExamples(examples: ExampleItem[]): void {
  writeJSONFile("examples.json", examples);
}

export function saveVideos(videos: VideoItem[]): void {
  writeJSONFile("videos.json", videos);
}

