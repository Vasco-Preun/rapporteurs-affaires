"use client";

import Link from "next/link";
import { ArrowRight, Target, Trophy, DollarSign, Calendar, CheckCircle, Clock, Bot, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import type { PrimeItem } from "@/types";
import PrimeBanner from "@/components/PrimeBanner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
    <div className="relative overflow-hidden">
      {/* Bannière Primes avec Chrono */}
      <PrimeBanner />
      
      {/* Background grid animé */}
      <div className="fixed inset-0 grid-pattern opacity-20 -z-10"></div>
      
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
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-20 w-full max-w-7xl mx-auto animate-scale-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 uppercase tracking-wide leading-tight animate-slide-up">
            <span className="text-text-primary">Apporteurs d&apos;affaires</span> <span className="text-gold">Nexus</span>
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
            {steps.map((step, index) => {
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
              return (
                <div 
                  key={step.number} 
                  ref={ref}
                  className="process-step-card"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold text-background-primary flex items-center justify-center font-black text-lg animate-glow-pulse">
                      {step.number}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 uppercase tracking-wide text-text-primary">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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

        {/* Section IA Assistant */}
        <div className="mb-12">
          <div className="card border-l-4 border-l-gold">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Bot className="text-gold" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-3 uppercase tracking-wide">Assistant IA — Entraînez-vous et posez vos questions</h2>
                <p className="text-text-secondary mb-3 leading-relaxed">
                  Utilisez notre <strong className="text-text-primary">assistant IA gratuit</strong> disponible en bas à droite de votre écran pour :
                </p>
                <ul className="space-y-2 text-text-secondary mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={18} />
                    <span><strong className="text-text-primary">Poser des questions</strong> sur Nexus Circle, nos services, nos cibles, le processus de vente</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={18} />
                    <span><strong className="text-text-primary">S&apos;entraîner aux cold calls</strong> : simulez des conversations, obtenez des réponses types aux objections fréquentes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-2 flex-shrink-0 mt-0.5" size={18} />
                    <span><strong className="text-text-primary">Analyser des sites web</strong> : donnez une URL d&apos;entreprise et obtenez des recommandations adaptées</span>
                  </li>
                </ul>
                <p className="text-text-secondary text-sm italic">
                  L&apos;assistant IA est disponible 24/7 et connaît tout sur Nexus Circle, nos 4 cibles (avocats, architectes, médical, instituts de formation) et les meilleures pratiques pour décrocher des rendez-vous.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Contact */}
        <div className="mb-12">
          <div className="card border-l-4 border-l-gold">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Phone className="text-gold" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-3 uppercase tracking-wide">Besoin d&apos;aide ? Appelez-nous</h2>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  Vous avez une question urgente ? Vous voulez clarifier un point sur un prospect ? <strong className="text-text-primary">Nous sommes disponibles quand vous avez besoin.</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-background-primary rounded-lg p-4 border border-border-subtle">
                    <div className="flex items-center mb-2">
                      <Phone className="text-gold mr-2" size={18} />
                      <span className="text-text-primary font-medium">Pierre</span>
                    </div>
                    <a 
                      href="tel:+33767636173" 
                      className="text-gold hover:text-gold-hover transition-colors text-lg font-medium"
                    >
                      07 67 63 61 73
                    </a>
                  </div>
                  <div className="bg-background-primary rounded-lg p-4 border border-border-subtle">
                    <div className="flex items-center mb-2">
                      <Phone className="text-gold mr-2" size={18} />
                      <span className="text-text-primary font-medium">Vasco</span>
                    </div>
                    <a 
                      href="tel:+33626452165" 
                      className="text-gold hover:text-gold-hover transition-colors text-lg font-medium"
                    >
                      06 26 45 21 65
                    </a>
                  </div>
                </div>
                <p className="text-text-secondary text-sm">
                  Cliquez sur le bouton téléphone en bas à gauche de votre écran pour accéder rapidement à nos numéros, ou utilisez les liens ci-dessus pour appeler directement.
                </p>
              </div>
            </div>
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
