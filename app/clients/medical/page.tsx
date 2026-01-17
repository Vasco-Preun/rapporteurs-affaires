"use client";

import { Heart, CheckCircle, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ClientsMedicalPage() {
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
          <Heart className="mx-auto mb-8 text-gold" size={64} />
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-text-primary mb-8 uppercase tracking-wide leading-tight">
            Comment vendre aux <span className="text-gold">Cabinets Médicaux</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
            Tout ce dont tu as besoin pour présenter Nexus Circle aux cabinets médicaux
          </p>
        </div>
      </div>

      {/* Reste du contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Bénéfices pour les cabinets médicaux */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center uppercase tracking-wide">Ce que le cabinet médical gagne</h2>
          <p className="text-lg text-text-secondary mb-8 text-center max-w-3xl mx-auto">
            Présente ces bénéfices aux cabinets médicaux pour montrer la valeur d&apos;un site premium
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="text-gold" size={32} />,
                title: "Crédibilité professionnelle",
                description: "Un site structurant qui reflète la qualité de votre expertise médicale et inspire confiance aux patients avant même qu'ils vous contactent."
              },
              {
                icon: <CheckCircle className="text-gold" size={32} />,
                title: "Qualification des demandes",
                description: "Présentez clairement vos spécialités et votre parcours patient pour mieux informer les visiteurs et réduire les sollicitations non pertinentes."
              },
              {
                icon: <TrendingUp className="text-gold" size={32} />,
                title: "Acquisition qualifiée",
                description: "Visibilité locale sur Google, parcours patient clair (spécialités → process → prise de contact), génération de contacts pertinents."
              }
            ].map((benefit, idx) => (
              <div key={idx} className="card">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-3 uppercase tracking-wide">{benefit.title}</h3>
                  <p className="text-text-secondary">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Caractéristiques spécifiques */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center uppercase tracking-wide">Ce que comprend le site pour cabinets médicaux</h2>
          <p className="text-lg text-text-secondary mb-8 text-center max-w-3xl mx-auto">
            Les fonctionnalités clés à mentionner quand tu présentes notre offre
          </p>
          <div className="card">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Présentation claire des spécialités médicales",
                "Parcours patient structurant : spécialités → process → prise de contact",
                "Conformité RGPD et mentions légales essentielles",
                "Design premium et professionnel rassurant",
                "Référencement local optimisé (quand pertinent)",
                "Formulaire de contact qualifié",
                "Chatbot intelligent pour qualification",
                "Responsive (mobile, tablette, desktop)"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 text-center">
          <div className="card border-gold/30">
            <h3 className="text-2xl font-bold mb-4 text-text-primary uppercase tracking-wide">Prêt à décrocher des rendez-vous ?</h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Maintenant que tu connais les arguments pour les cabinets médicaux, découvre comment présenter Nexus Circle et décrocher des rendez-vous.
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
