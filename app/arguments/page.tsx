"use client";

import { useState, useMemo } from "react";
import { Search, Target, Lightbulb, MessageCircle, CheckCircle } from "lucide-react";
import type { ArgumentItem } from "@/types";

export default function ArgumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<string>("all");

  const argumentItems = useMemo<ArgumentItem[]>(() => [
    {
      id: "1",
      service: "Site Vitrine",
      problem: "Votre site web est obsolète ou inexistant, vous perdez des clients potentiels",
      benefit: "Un site moderne augmente votre crédibilité et attire de nouveaux clients 24/7",
      example: "Un restaurant a vu ses réservations en ligne augmenter de 40% après la création de son nouveau site",
      closingQuestion: "Quand souhaiteriez-vous rencontrer notre équipe pour discuter de votre projet ?",
      tags: ["entreprise", "web"],
    },
    {
      id: "2",
      service: "E-commerce",
      problem: "Vous vendez uniquement en physique, vous limitez votre potentiel de vente",
      benefit: "Une boutique en ligne vous permet de vendre 24/7 et d'atteindre de nouveaux marchés",
      example: "Un artisan a doublé son chiffre d'affaires en 6 mois grâce à sa boutique en ligne",
      closingQuestion: "Seriez-vous disponible cette semaine pour un échange sur votre projet e-commerce ?",
      tags: ["entreprise", "vente"],
    },
    {
      id: "3",
      service: "Branding",
      problem: "Votre identité visuelle n'est pas cohérente, vous perdez en crédibilité",
      benefit: "Une identité de marque forte vous différencie et renforce la confiance de vos clients",
      example: "Une auto-école a vu ses inscriptions augmenter de 30% après un rebranding complet",
      closingQuestion: "Aimeriez-vous découvrir comment nous pourrions moderniser votre image ?",
      tags: ["entreprise", "image"],
    },
    {
      id: "4",
      service: "Production de Contenu",
      problem: "Vous n'avez pas le temps de créer du contenu pour vos réseaux sociaux",
      benefit: "Du contenu régulier et de qualité augmente votre visibilité et votre engagement",
      example: "Un salon de coiffure a multiplié ses followers par 5 en 3 mois grâce à un contenu régulier",
      closingQuestion: "Quand pourrions-nous discuter de votre stratégie de contenu ?",
      tags: ["entreprise", "réseaux sociaux"],
    },
    {
      id: "5",
      service: "Outils Internes",
      problem: "Vos processus sont manuels et chronophages, vous perdez en productivité",
      benefit: "Des outils sur-mesure automatisent vos tâches et libèrent du temps pour l'essentiel",
      example: "Une entreprise a réduit son temps de traitement des commandes de 4h à 30 minutes",
      closingQuestion: "Quel processus vous fait perdre le plus de temps actuellement ?",
      tags: ["entreprise", "productivité"],
    },
    {
      id: "6",
      service: "E-book / Masterclass",
      problem: "Vous avez du savoir-faire mais vous ne le monétisez pas",
      benefit: "Un e-book ou une masterclass vous permet de générer des revenus passifs et d'établir votre expertise",
      example: "Un coach a généré 50 000€ de revenus en 6 mois avec son premier e-book",
      closingQuestion: "Avez-vous déjà pensé à transformer votre expertise en produit digital ?",
      tags: ["influenceur", "monétisation"],
    },
    {
      id: "7",
      service: "Application Mobile",
      problem: "Votre communauté grandit mais vous n'avez pas d'espace dédié pour l'engager",
      benefit: "Une app mobile crée un espace exclusif pour votre communauté et génère des abonnements récurrents",
      example: "Un influenceur fitness a généré 10 000€/mois d'abonnements avec son app dédiée",
      closingQuestion: "Seriez-vous intéressé par une application pour votre communauté ?",
      tags: ["influenceur", "app"],
    },
  ], []);

  const services = useMemo(() => Array.from(new Set(argumentItems.map((arg) => arg.service))), [argumentItems]);

  const filteredArguments = useMemo(() => {
    return argumentItems.filter((arg) => {
      const matchesSearch =
        arg.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        arg.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        arg.benefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        arg.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesService = selectedService === "all" || arg.service === selectedService;

      return matchesSearch && matchesService;
    });
  }, [searchQuery, selectedService, argumentItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Arguments de Vente</h1>
      <p className="text-gray-600 mb-8">
        Utilisez ces arguments structurés pour chaque service. Chaque argument suit la logique :
        Problème → Bénéfice → Exemple → Question de closing.
      </p>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un argument..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedService("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedService === "all"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Tous les services
          </button>
          {services.map((service) => (
            <button
              key={service}
              onClick={() => setSelectedService(service)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedService === service
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Arguments Grid */}
      <div className="space-y-6">
        {filteredArguments.map((arg) => (
          <div key={arg.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-primary-600">{arg.service}</h3>
              {arg.tags && (
                <div className="flex flex-wrap gap-2">
                  {arg.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-start">
                  <Target className="text-red-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Le Problème</h4>
                    <p className="text-gray-700">{arg.problem}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <div className="flex items-start">
                  <Lightbulb className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Le Bénéfice</h4>
                    <p className="text-gray-700">{arg.benefit}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex items-start">
                  <MessageCircle className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Exemple Concret</h4>
                    <p className="text-gray-700">{arg.example}</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
                <div className="flex items-start">
                  <CheckCircle className="text-primary-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Question de Closing</h4>
                    <p className="text-gray-700 font-medium">{arg.closingQuestion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArguments.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucun argument trouvé pour cette recherche.
        </div>
      )}
    </div>
  );
}

