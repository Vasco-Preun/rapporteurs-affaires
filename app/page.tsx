"use client";

import Link from "next/link";
import { ArrowRight, Target, Trophy, DollarSign, Calendar, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import type { PrimeItem } from "@/types";

export default function HomePage() {
  const [activePrimes, setActivePrimes] = useState<PrimeItem[]>([]);
  const [primesLoaded, setPrimesLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/primes")
      .then((res) => res.json())
      .then((data) => {
        if (data.primes) {
          const active = data.primes.filter((p: PrimeItem) => p.status === "active");
          setActivePrimes(active);
          setPrimesLoaded(true);
        }
      })
      .catch((error) => {
        console.error("Error loading primes:", error);
        setPrimesLoaded(true);
      });
  }, []);

  const getStatusBadge = (status: PrimeItem["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 tracking-widest">
            <CheckCircle className="mr-1" size={12} />
            Active
          </span>
        );
      case "upcoming":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 tracking-widest">
            <Clock className="mr-1" size={12} />
            À venir
          </span>
        );
      default:
        return null;
    }
  };

  const steps = [
    {
      number: 1,
      title: "Prospection",
      description: "Vous identifiez et contactez des cabinets (avocats, architectes, médical) et instituts de formation professionnelle intéressés par un site web premium.",
    },
    {
      number: 2,
      title: "Rendez-vous",
      description: "Vous décrochez un RDV avec le cabinet. C'est votre objectif principal !",
    },
    {
      number: 3,
      title: "Transmission",
      description: "Vous transmettez les coordonnées du cabinet à Nexus Circle.",
    },
    {
      number: 4,
      title: "Nexus Circle prend le relais",
      description: "Notre équipe gère le devis, la négociation et la signature du contrat.",
    },
    {
      number: 5,
      title: "Commission",
      description: "Vous touchez 15% de commission après encaissement du client.",
    },
  ];

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-6 uppercase tracking-wide leading-tight">
            Apporteurs d&apos;affaires <span className="text-gold">Nexus</span>
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
            Spécialisés pour : avocats, architectes, médical, instituts de formation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/processus-vente" className="btn-primary inline-flex items-center justify-center px-8 py-3">
              Commencer
              <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link href="/nexus-circle" className="btn-secondary inline-flex items-center justify-center text-lg px-10 py-5">
              Pour qui tu travailles ?
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Reste du contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Objectif Section */}
        <div className="bg-background-secondary border border-border-subtle rounded-lg p-8 mb-12">
          <div className="flex items-start space-x-4">
            <Target className="text-gold flex-shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2 uppercase tracking-wide">Votre Objectif</h2>
              <p className="text-text-secondary text-lg">
                <strong>Décrocher un RDV</strong> avec un cabinet ou un institut de formation intéressé par un site web premium qui renforce sa crédibilité, qualifie ses demandes et génère de nouveaux contacts (ou inscriptions). 
                Une fois le rendez-vous obtenu, <strong>Nexus Circle prend le relais</strong> : devis, négociation et signature.
                Vous touchez votre commission après encaissement.
              </p>
            </div>
          </div>
        </div>

        {/* Le Processus Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center uppercase tracking-wide">Le Processus</h2>
          
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start space-x-4 card">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold text-background-primary flex items-center justify-center font-black text-lg">
                  {step.number}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-wide text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">Prêt à commencer ?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Découvrez comment décrocher des rendez-vous avec des cabinets premium et instituts de formation, et comment présenter Nexus Circle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/processus-vente" className="btn-primary inline-flex items-center justify-center text-lg px-10 py-5">
              Comment vendre
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link href="/nexus-circle" className="btn-secondary inline-flex items-center justify-center text-lg px-10 py-5">
              Qui est Nexus Circle ?
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>

        {/* Primes Section */}
        {activePrimes.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-text-primary uppercase tracking-wide">Primes Actives</h2>
              <Trophy className="text-gold" size={32} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activePrimes.map((prime) => (
                <div key={prime.id} className="card border-2 border-green-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-text-primary">{prime.title}</h3>
                    {getStatusBadge(prime.status)}
                  </div>
                  <p className="text-text-secondary mb-4">{prime.description}</p>
                  <div className="bg-background-primary rounded p-4 mb-4 border border-border-subtle">
                    <div className="flex items-center mb-2">
                      <DollarSign className="text-gold mr-2" size={20} />
                      <span className="font-medium text-lg text-text-primary tracking-widest">Montant :</span>
                      <span className="font-black text-lg text-gold ml-2">{prime.amount}</span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium text-text-secondary mb-1">Conditions :</p>
                      <p className="text-sm text-text-secondary">{prime.conditions}</p>
                    </div>
                    {prime.startDate && prime.endDate && (
                      <div className="mt-3 flex items-center text-sm text-text-secondary">
                        <Calendar className="mr-2" size={16} />
                        Du {new Date(prime.startDate).toLocaleDateString("fr-FR")} au{" "}
                        {new Date(prime.endDate).toLocaleDateString("fr-FR")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
