"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { 
  Phone, MessageSquare, Mail, Download, Video, PlayCircle, 
  Search, CheckCircle, XCircle, AlertCircle, RotateCcw,
  FileText, Youtube, MapPin, ExternalLink, List, Target, BookOpen
} from "lucide-react";
import Link from "next/link";
import type { TrainingScenario, TrainingEvaluation, ScenarioChannel, ScenarioDifficulty } from "@/types/training";
import { filterScenarios } from "@/lib/training/scenarios";
import { evaluateAnswer } from "@/lib/training/evaluator";
import type { VideoItem } from "@/types";

export default function ProcessusVentePage() {
  // Training state
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<TrainingEvaluation | null>(null);
  const scenarioSectionRef = useRef<HTMLDivElement>(null);
  
  // Filters
  const [channelFilter, setChannelFilter] = useState<ScenarioChannel | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<ScenarioDifficulty | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Videos state
  const [allVideos, setAllVideos] = useState<VideoItem[]>([]);
  const [videosLoaded, setVideosLoaded] = useState(false);

  // Load scenarios
  const [allScenarios, setAllScenarios] = useState<TrainingScenario[]>([]);
  const [scenariosLoaded, setScenariosLoaded] = useState(false);

  useEffect(() => {
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
    fetch("/api/training/videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.videos) {
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
    if (channelFilter !== "all" || difficultyFilter !== "all") {
      filtered = filterScenarios(allScenarios, {
        channel: channelFilter !== "all" ? channelFilter : undefined,
        difficulty: difficultyFilter !== "all" ? difficultyFilter : undefined,
      });
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.objection.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [allScenarios, channelFilter, difficultyFilter, searchQuery]);

  const selectedScenario = allScenarios.find((s) => s.id === selectedScenarioId);

  useEffect(() => {
    if (selectedScenario && scenarioSectionRef.current) {
      setTimeout(() => {
        scenarioSectionRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }, 100);
    }
  }, [selectedScenarioId, selectedScenario]);

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
    <div>
      {/* Hero Section - Full Page */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fond moderne avec gradient et effets */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-secondary via-background-primary to-background-secondary">
          {/* Formes floues dorées animées */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(199, 179, 138, 0.15) 0%, transparent 70%)',
              }}
            ></div>
            <div 
              className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-[150px] animate-float-reverse"
              style={{
                background: 'radial-gradient(circle, rgba(199, 179, 138, 0.12) 0%, transparent 70%)',
              }}
            ></div>
          </div>
          
          {/* Lignes décoratives */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
        </div>
        
        {/* Contenu */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-20 w-full max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-text-primary mb-8 uppercase tracking-wide leading-tight">
            Comment <span className="text-gold">vendre</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
            Tout ce dont tu as besoin pour décrocher des rendez-vous avec des auto-écoles : processus, scripts, vidéos et entraînement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/guide-cold-call-auto-ecoles.pdf" download className="btn-primary inline-flex items-center justify-center text-lg px-10 py-5">
              <Download className="mr-2" size={20} />
              Télécharger le guide
            </a>
          </div>
        </div>
      </div>

      {/* Reste du contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section 1 : Ce que tu vends */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-3 uppercase tracking-wide">Ce que tu vends</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Site vitrine moderne spécialement conçu pour les auto-écoles
            </p>
          </div>

          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-sm font-bold text-gold mb-3 uppercase tracking-widest">Contenu inclus</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <span>Présentation des agences et moniteurs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <span>Tarifs et forfaits visibles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <span>Informations pratiques (horaires, localisation)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <span>Galerie photos et vidéos</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gold mb-3 uppercase tracking-widest">Fonctionnalités</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <span>Formulaire de pré-inscription en ligne</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <span>Référencement local Google optimisé</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <span>Design responsive (mobile, tablette, desktop)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <span>Intégration réseaux sociaux</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border-subtle pt-6">
              <p className="text-sm text-text-secondary text-center">
                <strong className="text-gold">Fourchette indicative :</strong> À partir de 1 500€. 
                Devis personnalisé lors du rendez-vous.
              </p>
            </div>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Target className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Section 2 : Trouver des clients */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-3 uppercase tracking-wide">Trouver des clients</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Comment cibler des auto-écoles avec le scraping
            </p>
          </div>

          <div className="space-y-6">
            <div className="card border-l-4 border-l-gold">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-black text-lg">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2 uppercase tracking-wide">Utiliser MapsScraper</h3>
                  <p className="text-text-secondary mb-3">
                    Rendez-vous sur <a href="https://mapsscraper.net/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-hover underline inline-flex items-center">
                      mapsscraper.net <ExternalLink className="ml-1" size={14} />
                    </a>
                  </p>
                  <p className="text-sm text-text-secondary">
                    Outil qui extrait automatiquement les données des résultats Google Maps.
                  </p>
                </div>
              </div>
            </div>

            <div className="card border-l-4 border-l-gold">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-black text-lg">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2 uppercase tracking-wide">Rechercher sur Google Maps</h3>
                  <p className="text-text-secondary mb-3">
                    Tapez <strong>&quot;auto-école [ville]&quot;</strong> dans Google Maps
                  </p>
                  <div className="bg-background-secondary rounded p-4 border border-border-subtle">
                    <p className="text-xs font-medium text-gold mb-2 uppercase tracking-widest">Conseils</p>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Commencez par votre ville ou département</li>
                      <li>• Explorez les villes voisines</li>
                      <li>• Notez les auto-écoles avec plusieurs agences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-l-4 border-l-gold">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-black text-lg">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2 uppercase tracking-wide">Extraire les données</h3>
                  <p className="text-text-secondary mb-3">
                    Utilisez l&apos;extension MapsScraper pour récupérer les coordonnées.
                  </p>
                  <div className="bg-background-secondary rounded p-4 border border-border-subtle">
                    <p className="text-xs font-medium text-gold mb-2 uppercase tracking-widest">Données récupérées</p>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Nom, adresse, téléphone</li>
                      <li>• Site web, note Google, nombre d&apos;avis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-l-4 border-l-gold">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-black text-lg">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2 uppercase tracking-wide">Organiser dans un tableau</h3>
                  <p className="text-text-secondary mb-3">
                    Exportez en CSV/Excel et créez vos colonnes de suivi.
                  </p>
                  <div className="bg-background-secondary rounded p-4 border border-border-subtle">
                    <p className="text-xs font-medium text-gold mb-2 uppercase tracking-widest">Colonnes essentielles</p>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Nom, Ville, Téléphone, Email, Site web</li>
                      <li>• Date de contact, Réponse, RDV fixé, Notes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-l-4 border-l-gold">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-black text-lg">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary mb-2 uppercase tracking-wide">Prioriser vos appels</h3>
                  <p className="text-text-secondary mb-3">
                    Ciblez en priorité les auto-écoles avec le plus de potentiel.
                  </p>
                  <div className="bg-background-secondary rounded p-4 border border-border-subtle">
                    <p className="text-xs font-medium text-gold mb-2 uppercase tracking-widest">Critères de priorité</p>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>• Sans site web → Priorité maximale</li>
                      <li>• Site obsolète → Priorité haute</li>
                      <li>• Plusieurs agences → Gros client potentiel</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-text-secondary">
              <strong className="text-yellow-400">💡 Astuce :</strong> Scrapez 20-30 auto-écoles d&apos;un coup, 
              organisez-les dans votre tableau, puis consacrez une demi-journée à les appeler toutes. Plus efficace !
            </p>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Phone className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Section 3 : Conclure un cold call */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-3 uppercase tracking-wide">Conclure un cold call</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Guide complet pour décrocher le rendez-vous
            </p>
          </div>

          <div className="card border-2 border-gold/50">
            <div className="flex items-start gap-4 mb-6">
              <FileText className="text-gold flex-shrink-0" size={40} />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-text-primary mb-2 uppercase tracking-wide">Guide PDF</h3>
                <p className="text-text-secondary mb-4">
                  Guide détaillé qui explique pas à pas comment conclure efficacement un appel prospection avec une auto-école.
                  Tous les scripts, phrases à utiliser, et techniques pour décrocher le rendez-vous.
                </p>
                <a href="/guide-cold-call-auto-ecoles.pdf" download className="btn-primary inline-flex items-center justify-center">
                  <Download className="mr-2" size={20} />
                  Télécharger notre guide
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Video className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Section 4 : Vidéos */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-3 uppercase tracking-wide">Vidéos</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Formations vidéo pour améliorer tes compétences
            </p>
          </div>

          <div className="space-y-8">
            {allVideos.map((video) => {
              const isGuideComplet = video.id === "guide-cold-call";
              return (
                <div key={video.id} className={`card ${isGuideComplet ? "border-2 border-gold/50" : ""}`}>
                  {isGuideComplet && (
                    <div className="mb-6 pb-6 border-b border-gold/30">
                      <span className="inline-block bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-2">
                        Guide Complet
                      </span>
                    </div>
                  )}
                  <div className="flex items-start gap-4 mb-6">
                    <PlayCircle className="text-gold flex-shrink-0 mt-1" size={28} />
                    <div className="flex-1">
                      <h3 className={`font-bold text-text-primary uppercase tracking-wide mb-2 ${isGuideComplet ? "text-2xl" : "text-xl"}`}>
                        {video.title}
                      </h3>
                      <p className="text-text-secondary">{video.description}</p>
                    </div>
                  </div>

                  {video.youtubeId && (
                    <div className="mb-6">
                      <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                        <iframe
                          src={getYouTubeEmbedUrl(video.youtubeId)}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  {video.content && (
                    <div className="bg-background-secondary border-l-4 border-gold rounded-lg p-6">
                      <h4 className="font-bold text-text-primary mb-3 uppercase tracking-wide text-sm flex items-center">
                        <span className="bg-gold text-background-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">i</span>
                        À propos
                      </h4>
                      <div className="text-sm leading-relaxed space-y-2 text-text-secondary">
                        {video.content.split('\n').map((line, idx) => {
                          const trimmed = line.trim();
                          if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                            const text = trimmed.replace(/\*\*/g, '');
                            return <p key={idx} className="font-bold text-text-primary mt-3 first:mt-0">{text}</p>;
                          }
                          if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                            return <p key={idx} className="ml-3">{trimmed}</p>;
                          }
                          if (trimmed === '') {
                            return null;
                          }
                          return <p key={idx}>{trimmed}</p>;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {allVideos.length === 0 && videosLoaded && (
            <div className="text-center py-12 text-text-muted">
              <Video className="mx-auto mb-4 text-text-muted" size={48} />
              <p>Aucune vidéo disponible pour le moment.</p>
            </div>
          )}
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Target className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Section 5 : Entraînement */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-3 uppercase tracking-wide">Entraînement</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Entraîne-toi avec des scénarios réalistes d&apos;auto-écoles
            </p>
          </div>
        
          {!evaluation ? (
            <>
              <div className="card mb-8">
                <h3 className="text-xl font-bold mb-6 text-text-primary uppercase tracking-wide">Choisis un scénario</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-2 tracking-widest uppercase">Recherche</label>
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
                    <label className="block text-xs font-medium text-text-secondary mb-2 tracking-widest uppercase">Canal</label>
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
                    <label className="block text-xs font-medium text-text-secondary mb-2 tracking-widest uppercase">Difficulté</label>
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

                <div className="space-y-3 max-h-96 overflow-y-auto">
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
                              <h4 className="font-bold text-text-primary uppercase tracking-wide">{scenario.title}</h4>
                              <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(scenario.difficulty)}`}>
                                {scenario.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary mb-2">{scenario.context}</p>
                            <div className="flex items-center gap-3 text-xs text-text-muted">
                              <span>{getChannelIcon(scenario.channel)} {scenario.channel}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {selectedScenario && (
                <div ref={scenarioSectionRef} className="card">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">{selectedScenario.title}</h3>
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(selectedScenario.difficulty)}`}>
                        {selectedScenario.difficulty}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {getChannelIcon(selectedScenario.channel)} {selectedScenario.channel}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-background-secondary border-l-4 border-blue-500 p-4 rounded">
                      <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide text-sm">📋 Contexte</h4>
                      <p className="text-text-secondary text-sm">{selectedScenario.context}</p>
                    </div>

                    <div className="bg-background-secondary border-l-4 border-red-500 p-4 rounded">
                      <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide text-sm">❓ Objection</h4>
                      <p className="text-text-secondary text-sm italic">&quot;{selectedScenario.objection}&quot;</p>
                    </div>

                    <div className="bg-background-secondary border-l-4 border-green-500 p-4 rounded">
                      <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide text-sm">🎯 Objectif</h4>
                      <p className="text-text-secondary text-sm">{selectedScenario.goal}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-secondary mb-2 tracking-widest uppercase">
                      Ta réponse (comme si tu parlais au prospect) :
                    </label>
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Rédige ta réponse..."
                      rows={8}
                      className="input-field"
                    />
                  </div>

                  <div className="flex justify-end">
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
            <div className="space-y-6">
              <div className="card border-gold/30">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-primary uppercase tracking-wide">Rapport d&apos;Évaluation</h2>
                  <div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card border-green-500/30">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-text-primary uppercase tracking-wide">
                    <CheckCircle className="mr-2 text-green-500" size={24} />
                    Points Forts
                  </h3>
                  <ul className="space-y-2">
                    {evaluation.strengths.map((strength, idx) => (
                      <li key={idx} className="text-text-secondary flex items-start">
                        <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card border-yellow-500/30">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-text-primary uppercase tracking-wide">
                    <AlertCircle className="mr-2 text-yellow-500" size={24} />
                    Axes d&apos;Amélioration
                  </h3>
                  <ul className="space-y-2">
                    {evaluation.improvements.map((improvement, idx) => (
                      <li key={idx} className="text-text-secondary flex items-start">
                        <AlertCircle className="text-yellow-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card border-blue-500/30">
                <h3 className="text-xl font-bold mb-4 text-text-primary uppercase tracking-wide">Réponse Idéale</h3>
                <div className="bg-background-primary rounded-lg p-4 border border-border-subtle">
                  <p className="text-text-secondary whitespace-pre-line">{evaluation.ideal_answer}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <button onClick={resetTraining} className="btn-primary flex items-center">
                  <RotateCcw className="mr-2" size={16} />
                  Nouveau scénario
                </button>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
