export type ScenarioCategory = "entreprise" | "influenceur";
export type ScenarioChannel = "appel" | "dm" | "whatsapp";
export type ScenarioDifficulty = "facile" | "moyen" | "dur";

export interface TrainingScenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  channel: ScenarioChannel;
  difficulty: ScenarioDifficulty;
  context: string; // Description du prospect
  objection: string; // Objection principale
  goal: string; // Ex: "Obtenir un RDV de 15 minutes"
  ideal_answer: string; // Réponse modèle
  scoring: {
    must_include_any: string[]; // Mots/phrases attendus (au moins 1 ou x)
    must_include_all?: string[]; // Phrases obligatoires
    bonus_keywords?: string[]; // Augmente la note si présent
    forbidden_keywords: string[]; // Pénalités fortes
    rdv_keywords: string[]; // Indicateurs de proposition de RDV
    price_fixed_keywords: string[]; // Ex: "ça coûte 1500", "prix fixe", "garanti"
    qualification_keywords?: string[]; // Mots pour la qualification
    framework_keywords?: string[]; // Mots pour respect du cadre Nexus
  };
  feedback_templates?: {
    strengths: string[];
    improvements: string[];
  };
}

export interface TrainingEvaluation {
  score: number; // 0-10
  strengths: string[]; // 3 items
  improvements: string[]; // 3 items
  ideal_answer: string;
  rdv_obtained: boolean;
  flags: {
    hasForbidden: boolean;
    hasRDV: boolean;
    hasPriceFixed: boolean;
    hasQualification: boolean;
    hasFramework: boolean;
    hasClearStructure: boolean;
  };
}
