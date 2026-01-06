import type { TrainingScenario, ScenarioCategory, ScenarioChannel, ScenarioDifficulty } from "@/types/training";

export function filterScenarios(
  scenarios: TrainingScenario[],
  filters: {
    category?: ScenarioCategory;
    channel?: ScenarioChannel;
    difficulty?: ScenarioDifficulty;
  }
): TrainingScenario[] {
  return scenarios.filter((scenario) => {
    if (filters.category && scenario.category !== filters.category) {
      return false;
    }
    if (filters.channel && scenario.channel !== filters.channel) {
      return false;
    }
    if (filters.difficulty && scenario.difficulty !== filters.difficulty) {
      return false;
    }
    return true;
  });
}
