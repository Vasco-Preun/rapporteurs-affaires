"use client";

import { Building2, CheckCircle, Users, Award, TrendingUp, Target, Clock, Search, Palette, MessageSquare, Bot } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NexusCirclePage() {
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
            Pour qui tu <span className="text-gold">travailles</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
            Nexus Circle — Agence web spécialisée auto-écoles
          </p>
        </div>
      </div>

      {/* Reste du contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Introduction */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Nexus Circle est une agence web spécialisée dans la création de sites vitrines pour les auto-écoles.
              <br />
              Nous accompagnons des structures de la formation routière qui souhaitent moderniser leur image, améliorer leur visibilité en ligne et générer plus de contacts.
            </p>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Building2 className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Création de sites vitrines */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <Building2 className="text-gold" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Création de sites vitrines pour auto-écoles</h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  Nous concevons des sites web professionnels, modernes et performants, pensés spécifiquement pour les besoins des auto-écoles.
                  Chaque site est optimisé pour être clair, crédible et efficace, aussi bien sur ordinateur que sur mobile.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Chaque site inclut un <strong className="text-text-primary">chatbot dédié à l&apos;autoformation</strong>, permettant aux futurs élèves de se renseigner et de s&apos;informer en autonomie, 24h/24 et 7j/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Bot className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Chatbot pour autoformation */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <Bot className="text-gold" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Chatbot pour l&apos;autoformation</h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Tous nos sites vitrines incluent un chatbot intelligent permettant aux visiteurs de se renseigner et de s&apos;autoformer directement sur le site.
                  Cette fonctionnalité répond automatiquement aux questions fréquentes, guide les futurs élèves dans leur parcours, et permet de générer des contacts qualifiés, tout en étant disponible 24h/24 et 7j/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Clock className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Délais de livraison */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <Clock className="text-gold" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Délais de livraison rapides</h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Les sites sont livrés en moins d&apos;une semaine après la signature du contrat.
                  Notre organisation nous permet de travailler rapidement, sans compromis sur la qualité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Search className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Expertise SEO */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <Search className="text-gold" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Expertise en référencement (SEO)</h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Les sites que nous réalisons sont optimisés pour le référencement local sur Google, notamment sur les recherches liées aux auto-écoles et à leur zone géographique.
                  L&apos;objectif est d&apos;améliorer la visibilité en ligne et la crédibilité de l&apos;établissement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Palette className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Design moderne */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <Palette className="text-gold" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Design moderne et professionnel</h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Nous proposons des designs actuels, propres et professionnels, adaptés aux codes du secteur de la formation routière.
                  Le design joue un rôle clé dans la confiance accordée par les futurs élèves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Target className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Connaissance du secteur */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <Target className="text-gold" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Connaissance du secteur auto-école</h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  Nous connaissons les enjeux spécifiques des auto-écoles et de la formation routière.
                </p>
                <div className="bg-background-secondary rounded-lg p-4 border border-border-subtle">
                  <p className="text-text-secondary">
                    Nous avons notamment déjà réalisé le site de <strong className="text-text-primary">ELM Formations</strong>, acteur du secteur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <MessageSquare className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Communication simple */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <MessageSquare className="text-gold" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Communication simple et directe</h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Discussion directe par message, appel si besoin.
                  <br />
                  Disponibles 7j/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <CheckCircle className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Suivi après livraison */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                  <CheckCircle className="text-gold" size={32} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Suivi après la livraison</h2>
                <p className="text-lg text-text-secondary mb-4 leading-relaxed">
                  Une fois le site livré :
                </p>
                <ul className="space-y-3 text-text-secondary">
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>nous assurons le bon fonctionnement du site</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>un suivi est mis en place</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                    <span>une maintenance est assurée si nécessaire</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-12">
          <div className="card border-gold/30 text-center">
            <h3 className="text-2xl font-bold mb-4 text-text-primary uppercase tracking-wide">Prêt à décrocher des rendez-vous ?</h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Maintenant que tu connais Nexus Circle, découvre comment présenter nos services et décrocher des rendez-vous avec des auto-écoles.
            </p>
            <Link href="/processus-vente" className="btn-primary inline-flex items-center justify-center text-lg px-10 py-5">
              Comment vendre
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
