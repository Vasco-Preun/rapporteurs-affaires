"use client";

import { useState } from "react";
import { getServicesByCategory } from "@/lib/content";
import type { ServiceItem } from "@/types";
import { Building2, Users, Check } from "lucide-react";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<"entreprise" | "influenceur">("entreprise");
  const [services] = useState<ServiceItem[]>(() => {
    if (typeof window === "undefined") return [];
    // Cette page sera rendue côté client, donc on charge les données côté serveur
    return [];
  });

  // Pour le rendu côté serveur, on utilisera une approche différente
  const entrepriseServices: ServiceItem[] = [
    {
      id: "1",
      title: "Sites Vitrines",
      description: "Site web professionnel pour présenter votre entreprise et vos services.",
      category: "entreprise",
      features: ["Design sur-mesure", "Responsive", "SEO optimisé", "Formulaire de contact"],
      priceRange: "À partir de 2 500€",
    },
    {
      id: "2",
      title: "E-commerce",
      description: "Boutique en ligne complète avec gestion des commandes et paiements.",
      category: "entreprise",
      features: ["Catalogue produits", "Paiement sécurisé", "Gestion des stocks", "Suivi commandes"],
      priceRange: "À partir de 5 000€",
    },
    {
      id: "3",
      title: "Logiciels & Outils Internes",
      description: "Solutions sur-mesure pour optimiser vos processus internes.",
      category: "entreprise",
      features: ["Développement sur-mesure", "Intégration API", "Tableaux de bord", "Automatisation"],
      priceRange: "Sur devis",
    },
    {
      id: "4",
      title: "Applications Mobiles",
      description: "Applications iOS et Android pour votre entreprise.",
      category: "entreprise",
      features: ["iOS & Android", "Design natif", "Notifications push", "Synchronisation cloud"],
      priceRange: "À partir de 10 000€",
    },
    {
      id: "5",
      title: "Branding & Identité Visuelle",
      description: "Création de votre identité de marque complète.",
      category: "entreprise",
      features: ["Logo", "Charte graphique", "Supports print", "Guidelines"],
      priceRange: "À partir de 3 500€",
    },
    {
      id: "6",
      title: "Production de Contenu",
      description: "Création de contenu pour vos réseaux sociaux et votre communication.",
      category: "entreprise",
      features: ["Photos", "Vidéos", "Graphismes", "Stratégie de contenu"],
      priceRange: "À partir de 1 500€/mois",
    },
  ];

  const influenceurServices: ServiceItem[] = [
    {
      id: "7",
      title: "E-books & Masterclass",
      description: "Création et mise en page de vos contenus digitaux premium.",
      category: "influenceur",
      features: ["Design professionnel", "Mise en page", "Illustrations", "Distribution"],
      priceRange: "À partir de 2 000€",
    },
    {
      id: "8",
      title: "Applications Mobiles",
      description: "Application dédiée pour votre communauté.",
      category: "influenceur",
      features: ["iOS & Android", "Contenu exclusif", "Abonnements", "Notifications"],
      priceRange: "À partir de 8 000€",
    },
    {
      id: "9",
      title: "Sites Vitrines & E-commerce",
      description: "Site web pour présenter votre marque et vendre vos produits.",
      category: "influenceur",
      features: ["Design personnalisé", "Boutique en ligne", "Intégration réseaux sociaux", "Blog"],
      priceRange: "À partir de 3 000€",
    },
  ];

  const currentServices = activeTab === "entreprise" ? entrepriseServices : influenceurServices;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Nos Services</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("entreprise")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "entreprise"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Building2 className="inline mr-2" size={20} />
            Entreprises
          </button>
          <button
            onClick={() => setActiveTab("influenceur")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "influenceur"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Users className="inline mr-2" size={20} />
            Influenceurs & Créateurs
          </button>
        </nav>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentServices.map((service) => (
          <div key={service.id} className="card hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            {service.features && (
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <Check className="text-primary-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            {service.priceRange && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Tranche de prix :</p>
                <p className="text-primary-600 font-bold text-lg">{service.priceRange}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note importante :</strong> Les fourchettes de prix sont indicatives et servent
          uniquement à décrocher un RDV. Les prix définitifs seront établis lors du devis.
        </p>
      </div>
    </div>
  );
}

