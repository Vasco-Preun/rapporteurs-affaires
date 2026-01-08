"use client";

import { useState, useMemo } from "react";
import { Search, Building2, MessageSquare, Target } from "lucide-react";
import type { ExampleItem } from "@/types";

export default function ExemplesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const examples = useMemo<ExampleItem[]>(() => [
    {
      id: "1",
      businessType: "Auto-école",
      context: "Auto-école familiale avec 2 agences, cherche à moderniser sa communication et augmenter ses inscriptions en ligne.",
      message: `Bonjour [Prénom],

J'ai remarqué que [Nom Auto-école] est une référence dans votre secteur. Avez-vous déjà pensé à moderniser votre présence digitale pour attirer plus de candidats ?

Beaucoup d'auto-écoles voient leurs inscriptions en ligne augmenter de 30-40% avec un site moderne et une meilleure visibilité sur Google.

Seriez-vous disponible pour un échange de 15 minutes cette semaine ?`,
      objective: "Décrocher un RDV pour présenter : site vitrine moderne + référencement local + formulaire de pré-inscription en ligne",
      tags: ["auto-école", "site vitrine", "référencement"],
    },
    {
      id: "2",
      businessType: "Restaurant",
      context: "Restaurant traditionnel qui souhaite développer la vente à emporter et améliorer sa visibilité.",
      message: `Salut [Prénom] 👋

Je passe souvent devant [Nom Restaurant] et j'ai vu que vous faites de la vente à emporter. Avez-vous déjà pensé à un site web avec commande en ligne ?

Ça pourrait vous faire gagner du temps au téléphone et augmenter vos commandes, surtout le soir et le week-end.

On peut en discuter 15 minutes si tu veux ?`,
      objective: "RDV pour présenter : site vitrine + système de commande en ligne + intégration avec vos réseaux sociaux",
      tags: ["restaurant", "e-commerce", "commande en ligne"],
    },
    {
      id: "3",
      businessType: "Salle de Sport",
      context: "Salle de sport qui veut digitaliser les inscriptions et créer une app pour ses membres.",
      message: `Bonjour [Prénom],

Je vois que [Nom Salle] a une belle communauté ! Avez-vous déjà pensé à digitaliser les inscriptions et créer une app mobile pour vos membres ?

Ça faciliterait la gestion des abonnements, les réservations de cours, et créerait un vrai lien avec vos membres.

Quand seriez-vous disponible pour un échange de 15 minutes ?`,
      objective: "RDV pour présenter : site vitrine + application mobile avec réservation de cours + gestion des abonnements en ligne",
      tags: ["salle de sport", "app mobile", "abonnements"],
    },
    {
      id: "4",
      businessType: "Artisan (Plombier)",
      context: "Plombier indépendant qui reçoit beaucoup d'appels mais veut optimiser sa gestion et sa visibilité.",
      message: `Bonjour [Prénom],

Je vois que vous êtes plombier dans [Ville]. Vous recevez probablement beaucoup d'appels pour des urgences et des devis, non ?

On pourrait vous créer un site web avec formulaire de devis en ligne, ça vous ferait gagner du temps et vous permettrait d'être mieux référencé sur Google.

Ça vous intéresse ? On peut en discuter 15 minutes.`,
      objective: "RDV pour présenter : site vitrine + formulaire de devis en ligne + référencement local Google",
      tags: ["artisan", "plombier", "devis en ligne"],
    },
    {
      id: "5",
      businessType: "E-commerce (Mode)",
      context: "Boutique de vêtements qui vend uniquement en physique et veut développer le e-commerce.",
      message: `Bonjour [Prénom],

J'ai découvert [Nom Boutique] récemment, j'adore vos créations ! Avez-vous déjà pensé à vendre en ligne ?

Une boutique en ligne vous permettrait de toucher des clients partout en France, même quand votre magasin est fermé. Beaucoup de boutiques doublent leur CA en 6 mois avec le e-commerce.

On peut en discuter ?`,
      objective: "RDV pour présenter : boutique e-commerce complète avec catalogue, paiement sécurisé, gestion des stocks",
      tags: ["e-commerce", "mode", "boutique en ligne"],
    },
    {
      id: "6",
      businessType: "Coaching / Influenceur",
      context: "Coach fitness avec une communauté Instagram de 20k followers, veut monétiser avec un e-book et une app.",
      message: `Salut [Prénom] 👋

Je vois que tu as une super communauté sur Instagram ! As-tu déjà pensé à créer un e-book ou une app mobile pour monétiser davantage ?

Beaucoup de créateurs génèrent des revenus passifs avec des e-books ou des apps avec abonnements. On peut en discuter 15 minutes si tu veux ?`,
      objective: "RDV pour présenter : création d'e-book/masterclass + application mobile avec contenu exclusif et abonnements",
      tags: ["influenceur", "e-book", "app mobile", "monétisation"],
    },
    {
      id: "7",
      businessType: "Cabinet Médical",
      context: "Cabinet de médecine générale qui veut moderniser la prise de rendez-vous et la communication.",
      message: `Bonjour [Prénom],

Je vois que [Nom Cabinet] accueille beaucoup de patients. Avez-vous déjà pensé à un site web avec prise de rendez-vous en ligne ?

Ça faciliterait la vie de vos patients et réduirait les appels téléphoniques pour la secrétaire. Beaucoup de cabinets voient leur taux de remplissage augmenter.

Seriez-vous disponible pour un échange cette semaine ?`,
      objective: "RDV pour présenter : site vitrine + système de prise de rendez-vous en ligne + intégration avec votre logiciel",
      tags: ["cabinet médical", "rdv en ligne", "site vitrine"],
    },
    {
      id: "8",
      businessType: "Agence Immobilière",
      context: "Agence immobilière qui veut améliorer son site et créer un outil interne pour gérer les visites.",
      message: `Bonjour [Prénom],

Je vois que [Nom Agence] gère beaucoup de biens. Avez-vous déjà pensé à moderniser votre site web et créer des outils internes pour optimiser la gestion des visites ?

Ça pourrait vous faire gagner beaucoup de temps et améliorer l'expérience de vos clients.

On peut en discuter ?`,
      objective: "RDV pour présenter : refonte du site + outils internes de gestion (planning visites, suivi clients, etc.)",
      tags: ["immobilier", "outils internes", "site vitrine"],
    },
  ], []);

  const filteredExamples = useMemo(() => {
    return examples.filter((example) => {
      return (
        example.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [searchQuery, examples]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-text-primary mb-8 uppercase tracking-wide">Exemples d&apos;Approche</h1>
      <p className="text-text-secondary mb-8">
        Voici des exemples concrets d&apos;approche par type de business. Adaptez-les à votre style et
        à votre prospect.
      </p>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
          <input
            type="text"
            placeholder="Rechercher un exemple (auto-école, restaurant, artisan...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Examples Grid */}
      <div className="space-y-8">
        {filteredExamples.map((example) => (
          <div key={example.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Building2 className="text-gold mr-2" size={24} />
                <h3 className="text-xl font-bold text-text-primary uppercase tracking-wide">{example.businessType}</h3>
              </div>
              {example.tags && (
                <div className="flex flex-wrap gap-2">
                  {example.tags.map((tag, idx) => (
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

            <div className="space-y-4">
              <div className="bg-background-secondary rounded p-4">
                <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide">Contexte</h4>
                <p className="text-text-secondary">{example.context}</p>
              </div>

              <div className="bg-background-secondary border-l-4 border-blue-500 rounded p-4">
                <div className="flex items-start">
                  <MessageSquare className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <div className="flex-grow">
                    <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide">Message / Phrase d&apos;Approche</h4>
                    <p className="text-text-secondary whitespace-pre-line text-sm">{example.message}</p>
                  </div>
                </div>
              </div>

              <div className="bg-background-secondary border-l-4 border-gold rounded p-4">
                <div className="flex items-start">
                  <Target className="text-gold mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-text-primary mb-2 uppercase tracking-wide">Objectif du RDV</h4>
                    <p className="text-text-secondary">{example.objective}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExamples.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          Aucun exemple trouvé pour cette recherche.
        </div>
      )}
    </div>
  );
}

