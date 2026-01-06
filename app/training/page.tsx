"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { RotateCcw, CheckCircle, XCircle, AlertCircle, Youtube, Video, Search, PlayCircle } from "lucide-react";
import type { TrainingScenario, TrainingEvaluation, ScenarioCategory, ScenarioChannel, ScenarioDifficulty } from "@/types/training";
import { filterScenarios } from "@/lib/training/scenarios";
import { evaluateAnswer } from "@/lib/training/evaluator";
import type { VideoItem } from "@/types";

type TabType = "videos" | "training";

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<TabType>("videos");
  
  // Training state
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<TrainingEvaluation | null>(null);
  const scenarioSectionRef = useRef<HTMLDivElement>(null);
  
  // Filters
  const [categoryFilter, setCategoryFilter] = useState<ScenarioCategory | "all">("all");
  const [channelFilter, setChannelFilter] = useState<ScenarioChannel | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<ScenarioDifficulty | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Videos state
  const [videoSearchQuery, setVideoSearchQuery] = useState("");

  // Load scenarios
  const [allScenarios, setAllScenarios] = useState<TrainingScenario[]>([]);
  const [scenariosLoaded, setScenariosLoaded] = useState(false);

  useEffect(() => {
    // Load scenarios from API (since we're client-side)
    fetch("/api/training/scenarios")
      .then((res) => res.json())
      .then((data) => {
        if (data.scenarios) {
          setAllScenarios(data.scenarios);
          setScenariosLoaded(true);
        }
      })
      .catch((error) => {
        console.error("Error loading scenarios:", error);
      });
  }, []);

  const filteredScenarios = useMemo(() => {
    let filtered = allScenarios;

    // Apply filters
    if (categoryFilter !== "all" || channelFilter !== "all" || difficultyFilter !== "all") {
      filtered = filterScenarios(allScenarios, {
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        channel: channelFilter !== "all" ? channelFilter : undefined,
        difficulty: difficultyFilter !== "all" ? difficultyFilter : undefined,
      });
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.objection.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [allScenarios, categoryFilter, channelFilter, difficultyFilter, searchQuery]);

  const selectedScenario = allScenarios.find((s) => s.id === selectedScenarioId);

  // Scroll automatique vers la section d'entraînement quand un scénario est sélectionné
  useEffect(() => {
    if (selectedScenario && scenarioSectionRef.current) {
      // Petit délai pour laisser le DOM se mettre à jour
      setTimeout(() => {
        scenarioSectionRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }, 100);
    }
  }, [selectedScenarioId, selectedScenario]);

  const videos: VideoItem[] = [
    {
      id: "1",
      title: "Comment décrocher un RDV en 30 secondes",
      description: "Tutoriel complet sur les techniques de prospection téléphonique efficace.",
      category: "youtube",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["prospection", "appel", "tutoriel"],
      content: `Dans cette vidéo, vous découvrirez les techniques essentielles pour décrocher un rendez-vous en moins de 30 secondes lors de vos appels de prospection.\n\n**Points clés abordés :**\n- L'accroche parfaite pour capter l'attention\n- La présentation efficace de votre offre\n- Les questions à poser pour qualifier rapidement\n- La fermeture qui mène au RDV\n\n**Comment l'utiliser :**\nÉcoutez cette vidéo avant vos sessions de prospection téléphonique. Notez les phrases clés qui résonnent avec votre style et adaptez-les à votre façon de parler. L'objectif est de transformer chaque appel en opportunité de rendez-vous.`,
    },
    {
      id: "2",
      title: "Scripts DM LinkedIn qui convertissent",
      description: "Découvrez les meilleurs scripts pour vos messages LinkedIn.",
      category: "youtube",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["linkedin", "dm", "scripts"],
      content: `Cette vidéo vous présente des scripts éprouvés pour vos messages LinkedIn qui ont permis de décrocher des dizaines de rendez-vous.\n\n**Ce que vous apprendrez :**\n- La structure d'un DM LinkedIn qui convertit\n- Les formules d'accroche personnalisées\n- Comment éviter le spam et créer de la valeur\n- Les templates à adapter selon votre cible\n\n**Astuce pratique :**\nCréez votre bibliothèque personnelle de scripts en notant ceux qui fonctionnent le mieux selon le type de prospect (entrepreneur, dirigeant, influenceur). Testez différentes approches et mesurez vos taux de réponse.`,
    },
    {
      id: "3",
      title: "Gérer les objections courantes",
      description: "Comment répondre aux objections les plus fréquentes en prospection.",
      category: "youtube",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["objections", "vente"],
      content: `Apprenez à transformer les objections en opportunités avec cette formation sur la gestion des objections courantes.\n\n**Objections traitées :**\n- "Je n'ai pas le temps"\n- "C'est trop cher"\n- "J'ai déjà un prestataire"\n- "Ce n'est pas le bon moment"\n- "Je dois réfléchir"\n\n**Pourquoi c'est important :**\nLes objections sont normales et attendues. Cette vidéo vous donne les outils pour les anticiper et les gérer de manière professionnelle. Chaque objection bien gérée rapproche votre prospect d'un rendez-vous.`,
    },
    {
      id: "4",
      title: "Techniques de closing pour obtenir un RDV",
      description: "Les meilleures techniques pour transformer un prospect en RDV.",
      category: "youtube",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["closing", "rdv"],
      content: `Le closing est l'étape cruciale qui transforme une conversation intéressante en rendez-vous concret.\n\n**Techniques abordées :**\n- La technique de l'alternative (choix guidé)\n- La question assumante\n- Le closing par l'urgence\n- Le closing par la curiosité\n- La reformulation pour confirmer\n\n**À retenir :**\nUn bon closing n'est pas de la manipulation, c'est aider votre prospect à prendre une décision qui lui sera bénéfique. Cette vidéo vous apprend à fermer naturellement et professionnellement chaque conversation.`,
    },
    {
      id: "5",
      title: "Vidéo Nexus Circle - Exemple d'appel réussi",
      description: "Exemple concret d'un appel réussi avec un prospect.",
      category: "nexus",
      url: "#",
      tags: ["exemple", "appel"],
      content: `Cette vidéo montre un exemple réel d'un appel de prospection qui a abouti à un rendez-vous.\n\n**Analyse de l'appel :**\n- Structure de la conversation\n- Moments clés qui ont fait basculer\n- Gestion des silences et objections\n- Fermeture naturelle sur le RDV\n\n**Comment tirer profit de cette vidéo :**\nAnalysez chaque phase de l'appel et identifiez ce qui a fonctionné. Réécoutez les moments où le prospect montre de l'intérêt et notez les phrases qui créent cet engagement. Adaptez ces techniques à votre propre style.`,
    },
  ];

  const filteredVideos = videos.filter((video) => {
    return (
      video.title.toLowerCase().includes(videoSearchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(videoSearchQuery.toLowerCase()) ||
      video.tags?.some((tag) => tag.toLowerCase().includes(videoSearchQuery.toLowerCase())) ||
      video.content?.toLowerCase().includes(videoSearchQuery.toLowerCase())
    );
  });

  const getYouTubeEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}`;
  };

  const handleEvaluate = () => {
    if (!selectedScenario || !answer.trim()) {
      alert("Veuillez sélectionner un scénario et rédiger une réponse");
      return;
    }

    const result = evaluateAnswer(answer, selectedScenario);
    setEvaluation(result);
  };

  const resetTraining = () => {
    setSelectedScenarioId("");
    setAnswer("");
    setEvaluation(null);
  };

  const getDifficultyColor = (difficulty: ScenarioDifficulty) => {
    switch (difficulty) {
      case "facile":
        return "bg-green-100 text-green-800";
      case "moyen":
        return "bg-yellow-100 text-yellow-800";
      case "dur":
        return "bg-red-100 text-red-800";
    }
  };

  const getChannelIcon = (channel: ScenarioChannel) => {
    switch (channel) {
      case "appel":
        return "📞";
      case "dm":
        return "💬";
      case "whatsapp":
        return "📱";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ressources & Entraînement</h1>
        <p className="text-gray-600 text-lg">
          Découvrez nos vidéos de prospection et entraînez-vous avec nos scénarios pour améliorer vos compétences.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("videos")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "videos"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Youtube className="inline mr-2" size={20} />
            Vidéos de Prospection
          </button>
          <button
            onClick={() => setActiveTab("training")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "training"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Video className="inline mr-2" size={20} />
            Entraînement par Scénarios
          </button>
        </nav>
      </div>

      {/* Videos Tab */}
      {activeTab === "videos" && (
        <div>
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une vidéo ou un thème..."
                value={videoSearchQuery}
                onChange={(e) => setVideoSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Videos Grid */}
          <div className="space-y-8">
            {filteredVideos.map((video) => (
              <div key={video.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <PlayCircle className="text-primary-600 mr-3" size={28} />
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">{video.title}</h3>
                      <p className="text-gray-600 mt-1">{video.description}</p>
                    </div>
                  </div>
                  {video.tags && (
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Video Embed */}
                <div className="mb-6">
                  {video.youtubeId ? (
                    <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                      <iframe
                        src={getYouTubeEmbedUrl(video.youtubeId)}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ) : video.url && video.url !== "#" ? (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Vidéo à intégrer (embed ou upload)</p>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <Video className="mx-auto text-gray-400 mb-2" size={48} />
                        <p className="text-gray-500">Vidéo à venir</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Text */}
                {video.content && (
                  <div className="bg-blue-50 border-l-4 border-primary-500 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">i</span>
                      À propos de cette vidéo
                    </h4>
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {video.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="mx-auto mb-4 text-gray-400" size={48} />
              <p>Aucune vidéo trouvée pour cette recherche.</p>
            </div>
          )}
        </div>
      )}

      {/* Training Tab */}
      {activeTab === "training" && (
        <div>
          {!evaluation ? (
            <>
              {/* Scenario Selector */}
              <div className="card mb-8">
                <h2 className="text-xl font-semibold mb-4">Choisissez un scénario d&apos;entraînement</h2>
                
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-field pl-10 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as ScenarioCategory | "all")}
                      className="input-field text-sm"
                    >
                      <option value="all">Toutes</option>
                      <option value="entreprise">Entreprises</option>
                      <option value="influenceur">Influenceurs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Canal</label>
                    <select
                      value={channelFilter}
                      onChange={(e) => setChannelFilter(e.target.value as ScenarioChannel | "all")}
                      className="input-field text-sm"
                    >
                      <option value="all">Tous</option>
                      <option value="appel">Appel</option>
                      <option value="dm">DM LinkedIn</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value as ScenarioDifficulty | "all")}
                      className="input-field text-sm"
                    >
                      <option value="all">Toutes</option>
                      <option value="facile">Facile</option>
                      <option value="moyen">Moyen</option>
                      <option value="dur">Dur</option>
                    </select>
                  </div>
                </div>

                {/* Scenarios List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {!scenariosLoaded ? (
                    <p className="text-gray-500 text-center py-8">Chargement des scénarios...</p>
                  ) : filteredScenarios.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Aucun scénario trouvé</p>
                  ) : (
                    filteredScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => {
                          setSelectedScenarioId(scenario.id);
                          setAnswer("");
                        }}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedScenarioId === scenario.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{scenario.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(scenario.difficulty)}`}>
                                {scenario.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{scenario.context}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>{scenario.category === "entreprise" ? "🏢" : "👤"} {scenario.category === "entreprise" ? "Entreprise" : "Influenceur"}</span>
                              <span>{getChannelIcon(scenario.channel)} {scenario.channel}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Selected Scenario Brief */}
              {selectedScenario && (
                <div ref={scenarioSectionRef} className="card mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{selectedScenario.title}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(selectedScenario.difficulty)}`}>
                          {selectedScenario.difficulty}
                        </span>
                        <span className="text-sm text-gray-600">
                          {selectedScenario.category === "entreprise" ? "🏢" : "👤"} {selectedScenario.category === "entreprise" ? "Entreprise" : "Influenceur"}
                        </span>
                        <span className="text-sm text-gray-600">
                          {getChannelIcon(selectedScenario.channel)} {selectedScenario.channel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <h4 className="font-semibold text-gray-900 mb-2">📋 Contexte</h4>
                      <p className="text-gray-700 text-sm">{selectedScenario.context}</p>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <h4 className="font-semibold text-gray-900 mb-2">❓ Objection principale</h4>
                      <p className="text-gray-700 text-sm italic">&quot;{selectedScenario.objection}&quot;</p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                      <h4 className="font-semibold text-gray-900 mb-2">🎯 Objectif</h4>
                      <p className="text-gray-700 text-sm">{selectedScenario.goal}</p>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                      <h4 className="font-semibold text-gray-900 mb-2">⚠️ Rappels importants</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>❌ Pas de prix fixe - utilisez des fourchettes indicatives</li>
                        <li>❌ Pas de promesses ou garanties</li>
                        <li>❌ Pas de négociation</li>
                        <li>✅ Objectif unique : obtenir un RDV</li>
                      </ul>
                    </div>
                  </div>

                  {/* Answer Textarea */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre réponse (comme si vous parliez au prospect) :
                    </label>
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Rédigez votre réponse pour ce prospect..."
                      rows={8}
                      className="input-field"
                    />
                  </div>

                  {/* Evaluate Button */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleEvaluate}
                      disabled={!answer.trim()}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Évaluer ma réponse
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Evaluation Results */
            <div className="space-y-6">
              {/* Score Card */}
              <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Rapport d&apos;Évaluation</h2>
                  <div className="flex items-center space-x-2">
                    {evaluation.rdv_obtained ? (
                      <span className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        <CheckCircle className="mr-1" size={16} />
                        RDV Obtenu
                      </span>
                    ) : (
                      <span className="flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        <XCircle className="mr-1" size={16} />
                        RDV Non Obtenu
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-5xl font-bold text-primary-600 mb-2">
                  {evaluation.score.toFixed(1)}/10
                </div>
                <p className="text-gray-600">Note globale</p>
              </div>

              {/* Strengths */}
              <div className="card bg-green-50 border-green-200">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CheckCircle className="mr-2 text-green-600" size={24} />
                  Points Forts
                </h3>
                <ul className="space-y-2">
                  {evaluation.strengths.map((strength, idx) => (
                    <li key={idx} className="text-gray-700">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="card bg-yellow-50 border-yellow-200">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="mr-2 text-yellow-600" size={24} />
                  Axes d&apos;Amélioration
                </h3>
                <ul className="space-y-2">
                  {evaluation.improvements.map((improvement, idx) => (
                    <li key={idx} className="text-gray-700">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal Answer */}
              <div className="card bg-blue-50 border-blue-200">
                <h3 className="text-xl font-semibold mb-4">Réponse Idéale</h3>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-gray-700 whitespace-pre-line">{evaluation.ideal_answer}</p>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-center">
                <button onClick={resetTraining} className="btn-primary flex items-center">
                  <RotateCcw className="mr-2" size={16} />
                  Nouveau scénario
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
