import type { TrainingScenario, TrainingEvaluation } from "@/types/training";

/**
 * Évalue une réponse d'apporteur selon un scénario
 * Scoring basé sur des règles et mots-clés (100% local)
 */
export function evaluateAnswer(
  answer: string,
  scenario: TrainingScenario
): TrainingEvaluation {
  const lowerAnswer = answer.toLowerCase();

  // Détection des flags
  const hasForbidden = scenario.scoring.forbidden_keywords.some((keyword) =>
    lowerAnswer.includes(keyword.toLowerCase())
  );

  const hasPriceFixed = scenario.scoring.price_fixed_keywords.some((keyword) =>
    lowerAnswer.includes(keyword.toLowerCase())
  );

  const hasRDV = scenario.scoring.rdv_keywords.some((keyword) =>
    lowerAnswer.includes(keyword.toLowerCase())
  ) && (lowerAnswer.includes("15 min") || 
        lowerAnswer.includes("15 minutes") || 
        lowerAnswer.includes("créneau") || 
        lowerAnswer.includes("disponible") ||
        lowerAnswer.includes("lundi") ||
        lowerAnswer.includes("mardi") ||
        lowerAnswer.includes("mercredi") ||
        lowerAnswer.includes("jeudi") ||
        lowerAnswer.includes("vendredi") ||
        lowerAnswer.includes("semaine") ||
        lowerAnswer.includes("semaine prochaine"));

  const hasQualification = (scenario.scoring.qualification_keywords || []).some((keyword) =>
    lowerAnswer.includes(keyword.toLowerCase())
  ) || lowerAnswer.includes("besoin") ||
     lowerAnswer.includes("objectif") ||
     lowerAnswer.includes("situation") ||
     lowerAnswer.includes("pour mieux comprendre") ||
     lowerAnswer.includes("quel est votre");

  const hasFramework = (scenario.scoring.framework_keywords || []).some((keyword) =>
    lowerAnswer.includes(keyword.toLowerCase())
  ) || lowerAnswer.includes("ordre d'idée") ||
     lowerAnswer.includes("sur-mesure") ||
     lowerAnswer.includes("devis après") ||
     lowerAnswer.includes("devis personnalisé") ||
     lowerAnswer.includes("nexus circle vous fait") ||
     lowerAnswer.includes("fourchette") ||
     lowerAnswer.includes("indicatif");

  // Structure claire : phrases courtes + call-to-action
  const sentences = answer.split(/[.!?]/).filter((s) => s.trim().length > 0);
  const avgLength = sentences.reduce((sum, s) => sum + s.length, 0) / (sentences.length || 1);
  const hasClearStructure = sentences.length >= 2 && avgLength < 120 &&
    (lowerAnswer.includes("?") || lowerAnswer.includes("disponible") || lowerAnswer.includes("intéressé"));

  // Scoring
  let score = 5; // Base = 5/10

  // +2 si RDV proposé
  if (hasRDV) {
    score += 2;
  }

  // +1 si qualification
  if (hasQualification) {
    score += 1;
  }

  // +1 si respect du cadre Nexus
  if (hasFramework) {
    score += 1;
  }

  // +1 si structure claire
  if (hasClearStructure) {
    score += 1;
  }

  // Pénalités
  if (hasForbidden) {
    score -= 3;
  }

  if (hasPriceFixed) {
    score -= 3;
  }

  // Bonus keywords
  if (scenario.scoring.bonus_keywords) {
    const bonusCount = scenario.scoring.bonus_keywords.filter((keyword) =>
      lowerAnswer.includes(keyword.toLowerCase())
    ).length;
    score += Math.min(bonusCount * 0.5, 1); // Max +1
  }

  // Vérification des must_include
  if (scenario.scoring.must_include_all) {
    const allPresent = scenario.scoring.must_include_all.every((phrase) =>
      lowerAnswer.includes(phrase.toLowerCase())
    );
    if (!allPresent) {
      score -= 1;
    }
  }

  // Clamp entre 0 et 10
  score = Math.max(0, Math.min(10, Math.round(score * 10) / 10));

  // RDV obtenu ?
  const rdv_obtained =
    score >= 7 && hasRDV && !hasForbidden && !hasPriceFixed;

  // Génération des feedbacks
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Points forts
  if (hasRDV) {
    strengths.push("✅ Excellente proposition de RDV avec créneau précis");
  }
  if (hasQualification) {
    strengths.push("✅ Bonne qualification du besoin du prospect");
  }
  if (hasFramework) {
    strengths.push("✅ Respect parfait du cadre Nexus Circle (pas de prix fixe, fourchette indicative)");
  }
  if (hasClearStructure && !hasForbidden && !hasPriceFixed) {
    strengths.push("✅ Message structuré et professionnel");
  }
  if (!hasForbidden && !hasPriceFixed) {
    strengths.push("✅ Aucune promesse ou prix fixe, respect des règles");
  }
  if (lowerAnswer.includes("nexus circle") || lowerAnswer.includes("notre équipe")) {
    strengths.push("✅ Bonne référence à Nexus Circle pour le suivi");
  }

  // Si pas assez de forces, ajouter des génériques
  while (strengths.length < 3) {
    if (!strengths.some((s) => s.includes("Ton professionnel"))) {
      strengths.push("✅ Ton professionnel et adapté");
    } else if (!strengths.some((s) => s.includes("Approche"))) {
      strengths.push("✅ Approche centrée sur le besoin du prospect");
    } else {
      break;
    }
  }

  // Axes d'amélioration
  if (!hasRDV) {
    improvements.push("❌ Tu n'as pas proposé de créneau ou de next step clair pour le RDV");
  }
  if (hasForbidden) {
    improvements.push("❌ Tu as fait une promesse ou négocié — c'est interdit pour les apporteurs d'affaires");
  }
  if (hasPriceFixed) {
    improvements.push("❌ Tu as annoncé un prix fixe — on doit rester sur une fourchette/ordre d'idée indicatif");
  }
  if (!hasFramework) {
    improvements.push("⚠️ Ajoute des mentions comme 'sur-mesure', 'devis personnalisé' ou 'fourchette indicative'");
  }
  if (!hasQualification) {
    improvements.push("⚠️ Pose plus de questions pour qualifier le besoin et la situation du prospect");
  }
  if (score < 6) {
    improvements.push("💡 Structure mieux ta réponse : accroche → valeur → question de qualification → proposition de RDV");
  }
  if (!hasClearStructure && sentences.length > 0) {
    improvements.push("⚠️ Raccourcis tes phrases pour plus de clarté et impact");
  }

  // Si pas assez d'améliorations, ajouter des génériques
  while (improvements.length < 3) {
    if (!improvements.some((i) => i.includes("PERSONNALISER"))) {
      improvements.push("💡 Personnalise davantage ta réponse selon le contexte du prospect");
    } else {
      break;
    }
  }

  // Prendre exactement 3 de chaque
  return {
    score,
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3),
    ideal_answer: scenario.ideal_answer,
    rdv_obtained,
    flags: {
      hasForbidden,
      hasRDV,
      hasPriceFixed,
      hasQualification,
      hasFramework,
      hasClearStructure,
    },
  };
}

