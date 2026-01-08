"use client";

import { useState, useMemo } from "react";
import { Search, Phone, MessageSquare, Mail, MessageCircle, AlertTriangle } from "lucide-react";
import type { ScriptItem, ScriptType } from "@/types";

export default function ScriptsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ScriptType | "all">("all");

  const scripts = useMemo<ScriptItem[]>(() => [
    {
      id: "1",
      title: "Script Appel - 30 secondes",
      type: "appel",
      content: `Bonjour [Prénom], je suis [Votre nom], partenaire de Nexus Circle. Nous accompagnons les entreprises comme la vôtre dans leur transformation digitale. Avez-vous 15 minutes cette semaine pour un échange rapide sur vos besoins ?`,
      duration: "30 sec",
      tags: ["appel", "prospection"],
    },
    {
      id: "2",
      title: "Script DM LinkedIn - Entreprise",
      type: "dm",
      content: `Bonjour [Prénom],

J'ai remarqué que [Entreprise] est en pleine croissance. Avez-vous déjà pensé à moderniser votre présence digitale ?

Nexus Circle accompagne les entreprises comme la vôtre avec des solutions sur-mesure : sites vitrines, e-commerce, outils internes, branding.

Seriez-vous disponible pour un échange de 15 minutes cette semaine ?

Cordialement,
[Votre nom]`,
      tags: ["linkedin", "entreprise"],
    },
    {
      id: "3",
      title: "Script DM LinkedIn - Influenceur",
      type: "dm",
      content: `Salut [Prénom] 👋

Je vois que tu développes une belle communauté ! As-tu déjà pensé à créer ton propre e-book ou application mobile pour monétiser davantage ?

Nexus Circle accompagne les créateurs comme toi dans leurs projets digitaux. On peut en discuter 15 minutes si tu veux ?

À bientôt,
[Votre nom]`,
      tags: ["linkedin", "influenceur"],
    },
    {
      id: "4",
      title: "Script SMS/WhatsApp",
      type: "sms",
      content: `Bonjour [Prénom], 

Nexus Circle accompagne les entreprises dans leur digitalisation (sites web, e-commerce, apps). 

Disponible pour un échange de 15 min cette semaine ? 

[Votre nom]`,
      tags: ["sms", "whatsapp"],
    },
    {
      id: "5",
      title: "Script Email - Présentation",
      type: "email",
      content: `Objet : Accompagnement digital pour [Entreprise]

Bonjour [Prénom],

Je me permets de vous contacter car j'ai remarqué que [Entreprise] est en pleine expansion.

Nexus Circle accompagne les entreprises comme la vôtre dans leur transformation digitale avec des solutions sur-mesure : sites vitrines, e-commerce, applications, branding.

Seriez-vous disponible pour un échange de 15 minutes cette semaine pour discuter de vos besoins ?

Je reste à votre disposition.

Cordialement,
[Votre nom]
Partenaire Nexus Circle`,
      tags: ["email", "entreprise"],
    },
    {
      id: "6",
      title: "Objection : Prix trop élevé",
      type: "objection",
      content: `Je comprends votre préoccupation. Les prix que j'ai mentionnés sont des fourchettes indicatives. Chaque projet est unique et nécessite un devis personnalisé.

L'avantage de prendre un RDV avec Nexus Circle, c'est que vous obtiendrez un devis adapté à vos besoins réels et votre budget. Sans engagement de votre part.

Quand seriez-vous disponible pour cet échange ?`,
      tags: ["objection", "prix"],
    },
    {
      id: "7",
      title: "Objection : Pas le temps",
      type: "objection",
      content: `Je comprends que votre temps est précieux. C'est justement pour ça que je propose un échange de 15 minutes seulement.

L'objectif est simple : comprendre vos besoins et voir si Nexus Circle peut vous aider. Si ce n'est pas le cas, pas de problème, vous aurez juste perdu 15 minutes.

Si c'est le cas, vous pourriez gagner beaucoup de temps et d'argent sur le long terme.

Ça vaut le coup, non ?`,
      tags: ["objection", "temps"],
    },
    {
      id: "8",
      title: "Objection : Déjà un prestataire",
      type: "objection",
      content: `C'est une bonne chose d'avoir déjà un prestataire ! L'idée n'est pas de le remplacer, mais peut-être de compléter son offre ou d'avoir une deuxième opinion.

Nexus Circle peut intervenir sur des projets spécifiques ou vous proposer des solutions que votre prestataire actuel ne couvre peut-être pas.

Un échange de 15 minutes ne vous engage à rien et pourrait vous apporter des idées intéressantes. Qu'en pensez-vous ?`,
      tags: ["objection", "prestataire"],
    },
  ], []);

  const filteredScripts = useMemo(() => {
    return scripts.filter((script) => {
      const matchesSearch =
        script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === "all" || script.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType, scripts]);

  const types: { value: ScriptType | "all"; label: string; icon: any }[] = [
    { value: "all", label: "Tous", icon: null },
    { value: "appel", label: "Appels", icon: Phone },
    { value: "dm", label: "DM", icon: MessageSquare },
    { value: "sms", label: "SMS/WhatsApp", icon: MessageCircle },
    { value: "email", label: "Email", icon: Mail },
    { value: "objection", label: "Objections", icon: AlertTriangle },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-text-primary mb-8 uppercase tracking-wide">Scripts & Objections</h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
          <input
            type="text"
            placeholder="Rechercher un script..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type.value
                    ? "bg-gold text-background-primary"
                    : "bg-background-secondary text-text-secondary hover:bg-border-subtle"
                }`}
              >
                {Icon && <Icon className="inline mr-2" size={16} />}
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScripts.map((script) => (
          <div key={script.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide">{script.title}</h3>
              {script.duration && (
                <span className="text-xs bg-border-subtle text-gold px-2 py-1 rounded">
                  {script.duration}
                </span>
              )}
            </div>
            <div className="bg-background-primary rounded p-4 mb-4 border border-border-subtle">
              <p className="text-sm text-text-secondary whitespace-pre-line">{script.content}</p>
            </div>
            {script.tags && script.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {script.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-border-subtle text-text-secondary px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredScripts.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          Aucun script trouvé pour cette recherche.
        </div>
      )}
    </div>
  );
}

