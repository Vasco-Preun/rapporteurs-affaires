import fs from "fs";
import path from "path";
import type { TrainingScenario } from "@/types/training";

const scenariosPath = path.join(process.cwd(), "content", "training_scenarios.json");

export function loadScenarios(): TrainingScenario[] {
  try {
    const fileContents = fs.readFileSync(scenariosPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error loading training scenarios:", error);
    return [];
  }
}

