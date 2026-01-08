"use client";

import Link from "next/link";
import { ArrowRight, Target, Handshake, TrendingUp, CheckCircle, XCircle, AlertCircle, DollarSign } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  // Étape active (0-4) basée sur IntersectionObserver
  const [activeStep, setActiveStep] = useState(0);
  const processSectionRef = useRef<HTMLDivElement>(null);
  // Refs pour chaque étape
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!processSectionRef.current) return;

      const section = processSectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculer la progression basée uniquement sur la visibilité de la section
      // rect.top = distance entre le haut de la section et le haut du viewport
      // rect.height = hauteur totale de la section
      
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      let progress = 0;
      
      // Si la section est visible dans le viewport
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        // La progression commence quand le haut de la section entre dans le viewport
        // et se termine quand le bas de la section sort du viewport
        
        // Point de départ : quand le haut de la section atteint le haut du viewport (sectionTop = 0)
        // Point d'arrivée : quand le bas de la section atteint le bas du viewport (sectionTop + sectionHeight = windowHeight)
        
        // Distance totale à parcourir pour que toute la section défile
        const totalScrollDistance = sectionHeight + windowHeight;
        
        // Distance déjà parcourée depuis que la section est entrée dans le viewport
        // Quand sectionTop = windowHeight, on n'a rien défilé (progress = 0)
        // Quand sectionTop = -sectionHeight, on a tout défilé (progress = 100)
        const scrollDistance = windowHeight - sectionTop;
        
        // Calculer le pourcentage
        progress = (scrollDistance / totalScrollDistance) * 100;
        
        // Limiter entre 0 et 100
        progress = Math.max(0, Math.min(100, progress));
      } else if (sectionTop + sectionHeight <= 0) {
        // Section complètement passée (au-dessus du viewport)
        progress = 100;
      } else if (sectionTop >= windowHeight) {
        // Section pas encore visible (en-dessous du viewport)
        progress = 0;
      }
      
      // Ancien code supprimé - utilise maintenant activeStep
    };

    // Utiliser requestAnimationFrame pour des animations fluides
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Appel initial

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver pour la timeline
  useEffect(() => {
    // Vérifier si IntersectionObserver est disponible
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback : utiliser scroll avec throttle
      const handleScroll = () => {
        if (!processSectionRef.current) return;
        
        const section = processSectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Si la section n'est pas visible, ne rien faire
        if (rect.bottom < 0 || rect.top > windowHeight) {
          setActiveStep(0);
          return;
        }
        
        // Calculer quelle étape devrait être active basée sur la position de scroll
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (sectionHeight + windowHeight)));
        const calculatedStep = Math.floor(scrollProgress * 4); // 0-4
        
        setActiveStep(calculatedStep);
      };
      
      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
      
      window.addEventListener("scroll", onScroll, { passive: true });
      handleScroll();
      
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Utiliser IntersectionObserver (méthode principale)
    const observers: IntersectionObserver[] = [];
    
    // Observer chaque étape avec threshold 0.6 et rootMargin pour déclencher un peu avant
    stepRefs.current.forEach((stepRef, index) => {
      if (!stepRef) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
              // Cette étape est visible, mettre à jour activeStep si c'est la plus haute
              setActiveStep((current) => Math.max(current, index));
            }
          });
        },
        {
          threshold: [0, 0.3, 0.6, 1],
          rootMargin: '-20% 0px -20% 0px', // Déclenche quand l'élément est dans les 60% centraux du viewport
        }
      );
      
      observer.observe(stepRef);
      observers.push(observer);
    });
    
    // Observer aussi la section complète pour réinitialiser si on sort
    if (processSectionRef.current) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              // Si la section sort complètement du viewport, réinitialiser
              const rect = entry.boundingClientRect;
              if (rect.bottom < 0) {
                // Section passée (au-dessus)
                setActiveStep(4); // Toutes les étapes sont complètes
              } else if (rect.top > window.innerHeight) {
                // Section pas encore visible (en-dessous)
                setActiveStep(0);
              }
            }
          });
        },
        {
          threshold: 0,
        }
      );
      
      sectionObserver.observe(processSectionRef.current);
      observers.push(sectionObserver);
    }
    
    // Cleanup : disconnect tous les observers
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
  const steps = [
    {
      number: 1,
      title: "Prospection",
      description: "Vous identifiez et contactez des prospects qualifiés en utilisant nos scripts et arguments.",
    },
    {
      number: 2,
      title: "Rendez-vous",
      description: "Vous décrochez un RDV avec le prospect. C'est votre objectif principal !",
    },
    {
      number: 3,
      title: "Transmission",
      description: "Vous transmettez les coordonnées du prospect à Nexus Circle.",
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

  const canDo = [
    "Utiliser les fourchettes de prix indicatives pour décrocher un RDV",
    "Présenter nos services de manière générale",
    "Expliquer le processus de collaboration",
    "Transmettre les coordonnées des prospects intéressés",
  ];

  const cannotDo = [
    "Négocier les prix ou conditions",
    "Communiquer des prix fermes et définitifs",
    "Prendre des engagements au nom de Nexus Circle",
    "Signer des contrats ou devis",
    "Promettre des délais spécifiques sans validation",
  ];

  return (
    <div>
      {/* Hero Section - Full Page */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fond moderne avec gradient et effets */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-secondary via-background-primary to-background-secondary">
          {/* Formes floues dorées animées */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Forme floue dorée 1 - Top Left */}
            <div 
              className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(199, 179, 138, 0.15) 0%, transparent 70%)',
              }}
            ></div>
            
            {/* Forme floue dorée 2 - Bottom Right */}
            <div 
              className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-[150px] animate-float-reverse"
              style={{
                background: 'radial-gradient(circle, rgba(199, 179, 138, 0.12) 0%, transparent 70%)',
              }}
            ></div>
            
            {/* Forme floue dorée 3 - Center */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(199, 179, 138, 0.1) 0%, transparent 70%)',
              }}
            ></div>
            
            {/* Forme floue dorée 4 - Top Right */}
            <div 
              className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(199, 179, 138, 0.08) 0%, transparent 70%)',
                animation: 'float-gold 25s ease-in-out infinite',
                animationDelay: '2s',
              }}
            ></div>
            
            {/* Forme floue dorée 5 - Bottom Left */}
            <div 
              className="absolute bottom-1/4 left-1/4 w-[550px] h-[550px] rounded-full blur-[130px] animate-float-reverse"
              style={{
                background: 'radial-gradient(circle, rgba(199, 179, 138, 0.09) 0%, transparent 70%)',
                animation: 'float-gold-2 30s ease-in-out infinite',
                animationDelay: '3s',
              }}
            ></div>
            
            {/* Forme floue dorée 6 - Extra mouvement */}
            <div 
              className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full blur-[110px]"
              style={{
                background: 'radial-gradient(circle, rgba(199, 179, 138, 0.07) 0%, transparent 70%)',
                animation: 'drift 35s ease-in-out infinite',
                animationDelay: '1s',
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
            Portail Partenaires <span className="text-gold">Nexus Circle</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
            Votre espace dédié pour décrocher des rendez-vous et développer votre activité
            avec Nexus Circle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/training" className="btn-primary inline-flex items-center justify-center text-lg px-10 py-5">
              Accéder aux ressources
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
              <strong>Décrocher un RDV</strong> avec un prospect qualifié. Une fois le rendez-vous
              obtenu, <strong>Nexus Circle prend le relais</strong> : devis, négociation et signature.
              Vous touchez votre commission après encaissement.
            </p>
          </div>
        </div>
      </div>

      {/* Le Processus Section */}
      <div ref={processSectionRef} className="mb-12 relative">
        <h2 className="text-3xl font-bold text-text-primary mb-8 text-center uppercase tracking-wide">Le Processus</h2>
        
        <div className="relative">
          {/* Ligne de progression verticale */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 z-0">
            {/* Ligne de fond */}
            <div className="absolute inset-0 bg-border-subtle"></div>
            {/* Ligne de progression dorée - basée sur activeStep */}
            <div 
              className="absolute top-0 left-0 w-full bg-gold transition-all duration-500 ease-out"
              style={{
                height: `${(activeStep / (steps.length - 1)) * 100}%`,
              }}
            ></div>
            {/* Points de progression pour chaque étape */}
            {steps.map((step, index) => {
              const stepPosition = (index / (steps.length - 1)) * 100;
              const isActive = index <= activeStep;
              
              return (
                <div
                  key={step.number}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-10"
                  style={{
                    top: `${stepPosition}%`,
                  }}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                      isActive
                        ? "bg-gold border-gold scale-125"
                        : "bg-background-primary border-border-subtle scale-100"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
          
          {/* Steps */}
          <div className="space-y-6 mb-12 md:pl-20 relative z-10">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrentStep = index === activeStep;
              
              return (
                <div 
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="flex items-start space-x-4 transition-all duration-500 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0.4,
                    transform: isActive ? "translateX(0)" : "translateX(10px)",
                  }}
                >
                  <div 
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 ${
                      isActive
                        ? "bg-gold text-background-primary scale-110" 
                        : "bg-background-secondary border-2 border-border-subtle text-text-secondary scale-100"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="flex-grow">
                    <h3 className={`text-xl font-bold mb-2 uppercase tracking-wide transition-colors duration-500 ${
                      isActive ? "text-text-primary" : "text-text-secondary"
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-text-secondary">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What you can/cannot do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card border-green-500/30">
            <div className="flex items-center mb-4">
              <CheckCircle className="text-green-500 mr-2" size={24} />
              <h3 className="text-xl font-bold text-text-primary uppercase tracking-wide">Ce que vous pouvez faire</h3>
            </div>
            <ul className="space-y-2">
              {canDo.map((item, idx) => (
                <li key={idx} className="flex items-start text-text-secondary">
                  <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card border-red-500/30">
            <div className="flex items-center mb-4">
              <XCircle className="text-red-500 mr-2" size={24} />
              <h3 className="text-xl font-bold text-text-primary uppercase tracking-wide">Ce que vous ne pouvez pas faire</h3>
            </div>
            <ul className="space-y-2">
              {cannotDo.map((item, idx) => (
                <li key={idx} className="flex items-start text-text-secondary">
                  <XCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Notice */}
        <div className="card border-yellow-500/30 mb-8">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-500 mr-3 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-text-primary mb-2 uppercase tracking-wide">Avertissement Important</h3>
              <p className="text-text-secondary mb-2">
                Les partenaires ne négocient pas, ne communiquent pas de prix fermes, ne prennent
                aucun engagement au nom de Nexus Circle.
              </p>
              <p className="text-text-secondary">
                Les fourchettes de prix sont indicatives et servent uniquement à décrocher un RDV.
                Les prix définitifs seront établis lors du devis personnalisé.
              </p>
            </div>
          </div>
        </div>

        {/* Commission Info */}
        <div className="card border-gold/30">
          <div className="flex items-start">
            <DollarSign className="text-gold mr-3 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-text-primary mb-2 uppercase tracking-wide">Rappel Commissions</h3>
              <p className="text-text-secondary">
                Commission de <strong>15% après encaissement</strong> du client. Le paiement est
                effectué une fois que Nexus Circle a reçu le paiement du client final.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card">
          <Handshake className="text-gold mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2 text-text-primary uppercase tracking-wide">Services & Tarifs</h3>
          <p className="text-text-secondary">
            Découvrez notre gamme de services pour entreprises et influenceurs avec les tranches de prix indicatives.
          </p>
          <Link href="/services" className="text-gold hover:text-gold-hover font-medium mt-4 inline-block">
            Voir les services →
          </Link>
        </div>

        <div className="card">
          <Target className="text-gold mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2 text-text-primary uppercase tracking-wide">Vidéos & Entraînement</h3>
          <p className="text-text-secondary">
            Ressources vidéo de prospection et entraînement avec IA pour améliorer vos compétences.
          </p>
          <Link href="/training" className="text-gold hover:text-gold-hover font-medium mt-4 inline-block">
            Accéder aux ressources →
          </Link>
        </div>

        <div className="card">
          <TrendingUp className="text-gold mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2 text-text-primary uppercase tracking-wide">Primes & Challenges</h3>
          <p className="text-text-secondary">
            Suivez les primes actives et les challenges du mois pour maximiser vos revenus.
          </p>
          <Link href="/primes" className="text-gold hover:text-gold-hover font-medium mt-4 inline-block">
            Voir les primes →
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
}
