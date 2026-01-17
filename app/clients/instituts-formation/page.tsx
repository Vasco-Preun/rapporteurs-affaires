"use client";

import { GraduationCap, CheckCircle, Target, TrendingUp, Users, Award, Zap } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ClientsInstitutsFormationPage() {
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
          <GraduationCap className="mx-auto mb-8 text-gold" size={64} />
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-text-primary mb-8 uppercase tracking-wide leading-tight">
            Comment vendre aux <span className="text-gold">Instituts de Formation</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
            Tout ce dont tu as besoin pour présenter Nexus Circle aux organismes de formation professionnelle
          </p>
        </div>
      </div>

      {/* Reste du contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Bénéfices pour les instituts de formation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center uppercase tracking-wide">Ce que l&apos;institut de formation gagne</h2>
          <p className="text-lg text-text-secondary mb-8 text-center max-w-3xl mx-auto">
            Présente ces bénéfices aux organismes de formation pour montrer la valeur d&apos;un site business
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: <Target className="text-gold" size={32} />,
                title: "Principal outil d&apos;inscription",
                description: "Le site est votre premier canal de conversion. Un site optimisé transforme vos visiteurs en inscriptions, que ce soit via SEO, publicités ou CPF."
              },
              {
                icon: <Award className="text-gold" size={32} />,
                title: "Crédibilité et réassurance",
                description: "Valorisation de la certification Qualiopi, sérieux, pédagogie et modalités de financement. Un site qui inspire confiance aux candidats avant même qu'ils s'inscrivent."
              },
              {
                icon: <CheckCircle className="text-gold" size={32} />,
                title: "Qualification des demandes",
                description: "Structuration claire des prérequis, formats, financements et profils. Moins de demandes non qualifiées, plus d'inscriptions pertinentes."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <TrendingUp className="text-gold" size={32} />,
                title: "Meilleure rentabilité du trafic",
                description: "Optimisation pour convertir le trafic SEO, publicitaire et CPF. Un site pensé pour la performance commerciale et le ROI."
              },
              {
                icon: <Zap className="text-gold" size={32} />,
                title: "Différenciation concurrentielle",
                description: "Dans un marché très concurrentiel, un site structurant qui présente clairement vos formations, parcours et certifications vous distingue."
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
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center uppercase tracking-wide">Ce que comprend le site pour instituts de formation</h2>
          <p className="text-lg text-text-secondary mb-8 text-center max-w-3xl mx-auto">
            Les fonctionnalités clés à mentionner quand tu présentes notre offre
          </p>
          <div className="card">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Structuration claire de l'offre de formation",
                "Parcours candidat optimisé : informations → prérequis → inscription",
                "Valorisation des certifications (Qualiopi, formations métiers)",
                "Informations sur les modalités de financement (CPF, OPCO, B2B, B2C)",
                "Filtres et qualification des demandes (prérequis, formats, profils)",
                "Optimisation conversion : formulaire d'inscription qualifié",
                "Référencement SEO optimisé pour les recherches formations",
                "Design professionnel qui inspire confiance et crédibilité",
                "Chatbot intelligent pour qualification et informations",
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

        {/* Arguments à utiliser */}
        <section className="mb-16">
          <div className="card border-l-4 border-l-gold">
            <div className="flex items-start gap-4">
              <TrendingUp className="text-gold flex-shrink-0 mt-1" size={40} />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-text-primary mb-4 uppercase tracking-wide">Arguments clés à utiliser</h3>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  Pour un organisme de formation, le site web n&apos;est pas une simple vitrine. <strong className="text-text-primary">C&apos;est leur principal outil d&apos;acquisition et de conversion.</strong>
                </p>
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  Un site structurant qui présente clairement les formations, valorise les certifications (Qualiopi) et facilite l&apos;inscription transforme le trafic en inscriptions qualifiées.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  <strong className="text-text-primary">Moins de demandes non qualifiées, plus d'inscriptions pertinentes.</strong> Un site qui travaille pour leur rentabilité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-12 text-center">
          <div className="card border-gold/30">
            <h3 className="text-2xl font-bold mb-4 text-text-primary uppercase tracking-wide">Prêt à décrocher des rendez-vous ?</h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Maintenant que tu connais les arguments pour les instituts de formation, découvre comment présenter Nexus Circle et décrocher des rendez-vous.
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
