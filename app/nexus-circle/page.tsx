"use client";

import { Building2, CheckCircle, Users, Award, TrendingUp, Target, Clock, MessageSquare, Zap } from "lucide-react";

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
            Nexus <span className="text-gold">Circle</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
            Agence de communication spécialisée qui aide des entreprises à structurer leur image, leur acquisition et leur business
          </p>
        </div>
      </div>

      {/* Reste du contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Qui nous sommes */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">Qui nous sommes</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Nexus Circle est une agence de communication au sens large, fondée par <strong className="text-text-primary">Vasco Preun et Pierre O&apos;Neill</strong>, basée à <strong className="text-text-primary">Lille</strong>.
            </p>
          </div>
          <div className="card">
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              Nous accompagnons deux types de clients complémentaires :
            </p>
            <ul className="space-y-3 text-text-secondary mb-4">
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span><strong className="text-text-primary">Les entreprises</strong> qui ont besoin de structurer leur image, leur discours et leur acquisition digitale.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span><strong className="text-text-primary">Les créateurs de contenu / influenceurs</strong> qui souhaitent professionnaliser et monétiser leur activité via des collaborations et un accompagnement global.</span>
              </li>
            </ul>
            <p className="text-lg text-text-secondary leading-relaxed">
              Notre force est de <strong className="text-text-primary">connecter communication, digital et influence</strong> dans une approche cohérente, concrète et orientée résultats.
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
              <Target className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Notre positionnement */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">Notre Positionnement</h2>
          </div>
          <div className="card">
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              Nous ne sommes pas une agence généraliste &quot;qui fait de tout sans spécialisation&quot;.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              <strong className="text-text-primary">Nexus Circle est une agence :</strong>
            </p>
            <ul className="space-y-2 text-text-secondary mb-4">
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span><strong className="text-text-primary">Spécialisée</strong></span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span><strong className="text-text-primary">Orientée business</strong></span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span><strong className="text-text-primary">Axée sur la crédibilité, la structuration et l&apos;efficacité</strong></span>
              </li>
            </ul>
            <p className="text-lg text-text-secondary leading-relaxed">
              Nous concevons des dispositifs de communication <strong className="text-text-primary">utiles, pas du cosmétique</strong>.
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

        {/* Ce que nous faisons pour les entreprises */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">Ce que nous faisons pour les entreprises</h2>
          </div>
          <div className="card">
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              Pour les entreprises, nous intervenons principalement sur :
            </p>
            <ul className="space-y-2 text-text-secondary mb-6">
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>Création et refonte de sites web professionnels</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>Structuration du discours et de l&apos;offre</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>Image de marque et crédibilité</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>Parcours de conversion et qualification des demandes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>Communication digitale au sens large, selon les besoins</span>
              </li>
            </ul>
            <div className="bg-background-secondary border-l-4 border-l-gold rounded-lg p-4">
              <p className="text-lg text-text-secondary leading-relaxed mb-2">
                <strong className="text-text-primary">Nos sites web ne sont pas de simples vitrines.</strong>
              </p>
              <p className="text-lg text-text-secondary leading-relaxed mb-2">
                Ce sont des outils de travail qui servent à :
              </p>
              <ul className="space-y-1 text-text-secondary ml-4">
                <li>• Rassurer immédiatement</li>
                <li>• Cadrer les demandes</li>
                <li>• Filtrer les prospects non pertinents</li>
                <li>• Générer des contacts de meilleure qualité</li>
              </ul>
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
              <Users className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Nos cibles entreprises prioritaires */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">Nos Cibles Entreprises Prioritaires</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-4">
              Nous travaillons avec des structures qui ont des enjeux de crédibilité, du budget et un besoin réel de structuration
            </p>
            <p className="text-base text-text-secondary max-w-2xl mx-auto italic">
              <strong className="text-text-primary">Nous ne sommes pas fermés au marché français uniquement.</strong> Si vous identifiez des opportunités avec des clients étrangers (Suisse, Belgique, Luxembourg, etc.), nous les prenons également.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Cabinets d'avocats", desc: "Sites structurants qui renforcent la crédibilité et qualifient les demandes" },
              { title: "Cabinets d'architectes", desc: "Présentation claire des projets et expertises, génération de contacts qualifiés" },
              { title: "Cabinets médicaux / Cliniques privées", desc: "Crédibilité professionnelle, parcours patient clair, conformité RGPD" },
              { title: "Instituts de formation professionnelle", desc: "Sites business optimisés conversion : inscription, crédibilité, qualification, rentabilité du trafic" },
            ].map((sector, idx) => (
              <div key={idx} className="card border-l-4 border-l-gold">
                <h3 className="text-lg font-bold text-text-primary mb-2 uppercase tracking-wide">{sector.title}</h3>
                <p className="text-text-secondary">{sector.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Séparateur moderne */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background-primary px-6">
              <Award className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Nos forces principales */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">Nos Forces Principales</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Ce qui fait la différence de Nexus Circle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <MessageSquare className="text-gold" size={32} />,
                title: "Disponibilité & proximité",
                description: "Nous sommes très accessibles et réactifs, aussi bien pour nos clients que pour nos partenaires."
              },
              {
                icon: <Zap className="text-gold" size={32} />,
                title: "Rapidité d'exécution",
                description: "Sur des projets comme les sites vitrines, nous sommes capables de livrer entre 3 et 7 jours, sans sacrifier la qualité."
              },
              {
                icon: <Award className="text-gold" size={32} />,
                title: "Expérience concrète",
                description: "Nous avons déjà réalisé plusieurs projets pour des structures comme Elm Formations, H-Coaching, Perma-Coach. Nous parlons d'expérience réelle, pas de théorie."
              },
              {
                icon: <TrendingUp className="text-gold" size={32} />,
                title: "Offres qui répondent à un vrai besoin",
                description: "Nos projets se vendent bien parce qu'ils répondent à un problème concret (image, temps perdu, mauvais leads) et ont un impact direct sur le fonctionnement du client."
              }
            ].map((strength, idx) => (
              <div key={idx} className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{strength.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-2 uppercase tracking-wide">{strength.title}</h3>
                    <p className="text-text-secondary">{strength.description}</p>
                  </div>
                </div>
              </div>
            ))}
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

        {/* Pourquoi nos projets se signent facilement */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">Pourquoi nos projets se signent facilement</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6">
              Pour un apporteur, c&apos;est essentiel
            </p>
          </div>
          <div className="card border-l-4 border-l-gold">
            <ul className="space-y-3 text-text-secondary mb-4">
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>Nos clients comprennent vite la valeur</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>Le besoin est réel et souvent déjà identifié</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>Le projet fait sens pour eux</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>Nous savons cadrer, rassurer et structurer dès les premiers échanges</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-background-secondary border border-gold/30 rounded-lg">
              <p className="text-lg text-text-secondary leading-relaxed">
                <strong className="text-text-primary">L&apos;apporteur n&apos;a pas à vendre :</strong> il met en relation, nous faisons le reste.
              </p>
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
              <Users className="text-gold/30" size={32} />
            </div>
          </div>
        </div>

        {/* Le rôle de l'apporteur d'affaires */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">Le Rôle de l&apos;Apporteur d&apos;Affaires</h2>
          </div>
          <div className="card">
            <p className="text-lg text-text-secondary leading-relaxed mb-4">
              Un apporteur chez Nexus Circle :
            </p>
            <ul className="space-y-3 text-text-secondary mb-6">
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>nous met en relation avec un prospect pertinent</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>facilite l&apos;introduction</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-gold mr-3 flex-shrink-0 mt-0.5" size={20} />
                <span>n&apos;intervient ni dans la négociation, ni dans le closing</span>
              </li>
            </ul>
            <div className="bg-background-secondary border-l-4 border-l-gold rounded-lg p-4">
              <p className="text-lg text-text-secondary leading-relaxed mb-2">
                <strong className="text-text-primary">Nous prenons en charge :</strong>
              </p>
              <ul className="space-y-1 text-text-secondary ml-4">
                <li>• Le diagnostic</li>
                <li>• La proposition</li>
                <li>• La vente</li>
                <li>• L&apos;exécution</li>
              </ul>
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

        {/* En une phrase */}
        <section className="mb-16">
          <div className="card border-2 border-gold/50 text-center">
            <h3 className="text-2xl font-bold mb-4 text-text-primary uppercase tracking-wide">En une phrase</h3>
            <p className="text-xl text-text-secondary leading-relaxed max-w-4xl mx-auto">
              Nexus Circle est une agence de communication spécialisée qui aide des entreprises et des créateurs à structurer leur image, leur acquisition et leur business, avec des projets utiles, rapides à exécuter et faciles à vendre.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
