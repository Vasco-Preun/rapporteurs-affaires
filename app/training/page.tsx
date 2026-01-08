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
  const [allVideos, setAllVideos] = useState<VideoItem[]>([]);
  const [videosLoaded, setVideosLoaded] = useState(false);

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

  useEffect(() => {
    // Load videos from API (since we're client-side)
    fetch("/api/training/videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.videos) {
          // Trier pour mettre le guide complet en premier
          const sortedVideos = [
            ...data.videos.filter((v: VideoItem) => v.id === "guide-cold-call"),
            ...data.videos.filter((v: VideoItem) => v.id !== "guide-cold-call")
          ];
          setAllVideos(sortedVideos);
          setVideosLoaded(true);
        }
      })
      .catch((error) => {
        console.error("Error loading videos:", error);
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

  const filteredVideos = allVideos.filter((video) => {
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
        return "bg-green-500/20 text-green-400";
      case "moyen":
        return "bg-yellow-500/20 text-yellow-400";
      case "dur":
        return "bg-red-500/20 text-red-400";
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
        <h1 className="text-4xl font-extrabold text-text-primary mb-4 uppercase tracking-wide">Ressources & Entraînement</h1>
        <p className="text-text-secondary text-lg">
          Découvrez nos vidéos de prospection et entraînez-vous avec nos scénarios pour améliorer vos compétences.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-subtle mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("videos")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "videos"
                ? "border-gold text-gold"
                : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-subtle"
            }`}
          >
            <Youtube className="inline mr-2" size={20} />
            Vidéos de Prospection
          </button>
          <button
            onClick={() => setActiveTab("training")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "training"
                ? "border-gold text-gold"
                : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-subtle"
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
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
            {filteredVideos.map((video) => {
              const isGuideComplet = video.id === "guide-cold-call";
              return (
              <div key={video.id} className={`card ${isGuideComplet ? "border-gold/50 border-2" : ""}`}>
                {isGuideComplet && (
                  <div className="mb-4 pb-4 border-b border-gold/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase">
                        Guide Complet
                      </span>
                      <span className="text-gold font-bold text-sm">Formation Essentielle</span>
                    </div>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <PlayCircle className="text-gold mr-3" size={28} />
                    <div>
                      <h3 className={`font-bold text-text-primary uppercase tracking-wide ${isGuideComplet ? "text-3xl" : "text-2xl"}`}>
                        {video.title}
                      </h3>
                      <p className="text-text-secondary mt-1">{video.description}</p>
                    </div>
                  </div>
                  {video.tags && (
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-border-subtle text-gold px-2 py-1 rounded"
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
                    <div className="aspect-video bg-background-secondary rounded-lg flex items-center justify-center">
                      <p className="text-text-muted">Vidéo à intégrer (embed ou upload)</p>
                    </div>
                  ) : (
                    <div className="aspect-video bg-background-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border-subtle">
                      <div className="text-center">
                        <Video className="mx-auto text-text-muted mb-2" size={48} />
                        <p className="text-text-muted">Vidéo à venir</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Text */}
                {video.content && (
                  <div className={`border-l-4 border-gold rounded-lg p-4 ${isGuideComplet ? "bg-background-primary border-gold" : "bg-background-secondary"}`}>
                    <h4 className="font-bold text-text-primary mb-3 flex items-center uppercase tracking-wide text-sm">
                      <span className="bg-gold text-background-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">i</span>
                      {isGuideComplet ? "Contenu" : "À propos"}
                    </h4>
                    <div className={`text-sm leading-relaxed space-y-2 ${isGuideComplet ? "text-text-primary" : "text-text-secondary"}`}>
                      {video.content.split('\n').map((line, idx) => {
                        const trimmed = line.trim();
                        // Titre en gras
                        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                          const text = trimmed.replace(/\*\*/g, '');
                          return <p key={idx} className="font-bold text-text-primary mt-3 first:mt-0">{text}</p>;
                        }
                        // Puces
                        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                          return <p key={idx} className="ml-3">{trimmed}</p>;
                        }
                        // Ligne vide
                        if (trimmed === '') {
                          return null;
                        }
                        // Texte normal
                        return <p key={idx}>{trimmed}</p>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
            })}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              <Search className="mx-auto mb-4 text-text-muted" size={48} />
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
                <h2 className="text-xl font-bold mb-4 text-text-primary uppercase tracking-wide">Choisissez un scénario d&apos;entraînement</h2>
                
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2 tracking-widest">Recherche</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={16} />
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
                    <label className="block text-sm font-medium text-text-secondary mb-2 tracking-widest">Catégorie</label>
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
                    <label className="block text-sm font-medium text-text-secondary mb-2 tracking-widest">Canal</label>
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
                    <label className="block text-sm font-medium text-text-secondary mb-2 tracking-widest">Difficulté</label>
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
                    <p className="text-text-muted text-center py-8">Chargement des scénarios...</p>
                  ) : filteredScenarios.length === 0 ? (
                    <p className="text-text-muted text-center py-8">Aucun scénario trouvé</p>
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
                            ? "border-gold bg-border-subtle"
                            : "border-border-subtle hover:border-gold/50 hover:bg-background-secondary"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-text-primary uppercase tracking-wide">{scenario.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(scenario.difficulty)}`}>
                                {scenario.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary mb-2">{scenario.context}</p>
                            <div className="flex items-center gap-3 text-xs text-text-muted">
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
                      <h3 className="text-2xl font-bold text-text-primary mb-2 uppercase tracking-wide">{selectedScenario.title}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(selectedScenario.difficulty)}`}>
                          {selectedScenario.difficulty}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {selectedScenario.category === "entreprise" ? "🏢" : "👤"} {selectedScenario.category === "entreprise" ? "Entreprise" : "Influenceur"}
                        </span>
                        <span className="text-sm text-text-secondary">
                          {getChannelIcon(selectedScenario.channel)} {selectedScenario.channel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-background-secondary border-l-4 border-blue-500 p-4 rounded">
                      <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide">📋 Contexte</h4>
                      <p className="text-text-secondary text-sm">{selectedScenario.context}</p>
                    </div>

                    <div className="bg-background-secondary border-l-4 border-red-500 p-4 rounded">
                      <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide">❓ Objection principale</h4>
                      <p className="text-text-secondary text-sm italic">&quot;{selectedScenario.objection}&quot;</p>
                    </div>

                    <div className="bg-background-secondary border-l-4 border-green-500 p-4 rounded">
                      <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide">🎯 Objectif</h4>
                      <p className="text-text-secondary text-sm">{selectedScenario.goal}</p>
                    </div>

                    <div className="bg-background-secondary border-l-4 border-yellow-500 p-4 rounded">
                      <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide">⚠️ Rappels importants</h4>
                      <ul className="text-text-secondary text-sm space-y-1">
                        <li>❌ Pas de prix fixe - utilisez des fourchettes indicatives</li>
                        <li>❌ Pas de promesses ou garanties</li>
                        <li>❌ Pas de négociation</li>
                        <li>✅ Objectif unique : obtenir un RDV</li>
                      </ul>
                    </div>
                  </div>

                  {/* Answer Textarea */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-text-secondary mb-2 tracking-widest">
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
              <div className="card border-gold/30">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-primary uppercase tracking-wide">Rapport d&apos;Évaluation</h2>
                  <div className="flex items-center space-x-2">
                    {evaluation.rdv_obtained ? (
                      <span className="flex items-center px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium tracking-widest">
                        <CheckCircle className="mr-1" size={16} />
                        RDV Obtenu
                      </span>
                    ) : (
                      <span className="flex items-center px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium tracking-widest">
                        <XCircle className="mr-1" size={16} />
                        RDV Non Obtenu
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-5xl font-black text-gold mb-2">
                  {evaluation.score.toFixed(1)}/10
                </div>
                <p className="text-text-secondary">Note globale</p>
              </div>

              {/* Strengths */}
              <div className="card border-green-500/30">
                <h3 className="text-xl font-bold mb-4 flex items-center text-text-primary uppercase tracking-wide">
                  <CheckCircle className="mr-2 text-green-500" size={24} />
                  Points Forts
                </h3>
                <ul className="space-y-2">
                  {evaluation.strengths.map((strength, idx) => (
                    <li key={idx} className="text-text-secondary">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="card border-yellow-500/30">
                <h3 className="text-xl font-bold mb-4 flex items-center text-text-primary uppercase tracking-wide">
                  <AlertCircle className="mr-2 text-yellow-500" size={24} />
                  Axes d&apos;Amélioration
                </h3>
                <ul className="space-y-2">
                  {evaluation.improvements.map((improvement, idx) => (
                    <li key={idx} className="text-text-secondary">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal Answer */}
              <div className="card border-blue-500/30">
                <h3 className="text-xl font-bold mb-4 text-text-primary uppercase tracking-wide">Réponse Idéale</h3>
                <div className="bg-background-primary rounded-lg p-4 border border-border-subtle">
                  <p className="text-text-secondary whitespace-pre-line">{evaluation.ideal_answer}</p>
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
