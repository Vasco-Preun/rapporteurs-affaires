import Link from "next/link";
import { ArrowRight, Target, Handshake, TrendingUp, CheckCircle, XCircle, AlertCircle, DollarSign } from "lucide-react";

export default function HomePage() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Portail Partenaires <span className="text-primary-600">Nexus Circle</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Votre espace dédié pour décrocher des rendez-vous et développer votre activité
          avec Nexus Circle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/training" className="btn-primary inline-flex items-center justify-center">
            Accéder aux ressources
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>

      {/* Objectif Section */}
      <div className="bg-primary-50 rounded-lg p-8 mb-12">
        <div className="flex items-start space-x-4">
          <Target className="text-primary-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Votre Objectif</h2>
            <p className="text-gray-700 text-lg">
              <strong>Décrocher un RDV</strong> avec un prospect qualifié. Une fois le rendez-vous
              obtenu, <strong>Nexus Circle prend le relais</strong> : devis, négociation et signature.
              Vous touchez votre commission après encaissement.
            </p>
          </div>
        </div>
      </div>

      {/* Le Processus Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Le Processus</h2>
        
        {/* Steps */}
        <div className="space-y-6 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* What you can/cannot do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card bg-green-50 border-green-200">
            <div className="flex items-center mb-4">
              <CheckCircle className="text-green-600 mr-2" size={24} />
              <h3 className="text-xl font-semibold text-gray-900">Ce que vous pouvez faire</h3>
            </div>
            <ul className="space-y-2">
              {canDo.map((item, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card bg-red-50 border-red-200">
            <div className="flex items-center mb-4">
              <XCircle className="text-red-600 mr-2" size={24} />
              <h3 className="text-xl font-semibold text-gray-900">Ce que vous ne pouvez pas faire</h3>
            </div>
            <ul className="space-y-2">
              {cannotDo.map((item, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <XCircle className="text-red-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Notice */}
        <div className="card bg-yellow-50 border-yellow-200 mb-8">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Avertissement Important</h3>
              <p className="text-gray-700 mb-2">
                Les partenaires ne négocient pas, ne communiquent pas de prix fermes, ne prennent
                aucun engagement au nom de Nexus Circle.
              </p>
              <p className="text-gray-700">
                Les fourchettes de prix sont indicatives et servent uniquement à décrocher un RDV.
                Les prix définitifs seront établis lors du devis personnalisé.
              </p>
            </div>
          </div>
        </div>

        {/* Commission Info */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-start">
            <DollarSign className="text-primary-600 mr-3 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Rappel Commissions</h3>
              <p className="text-gray-700">
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
          <Handshake className="text-primary-600 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">Services & Tarifs</h3>
          <p className="text-gray-600">
            Découvrez notre gamme de services pour entreprises et influenceurs avec les tranches de prix indicatives.
          </p>
          <Link href="/services" className="text-primary-600 hover:text-primary-700 font-medium mt-4 inline-block">
            Voir les services →
          </Link>
        </div>

        <div className="card">
          <Target className="text-primary-600 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">Vidéos & Entraînement</h3>
          <p className="text-gray-600">
            Ressources vidéo de prospection et entraînement avec IA pour améliorer vos compétences.
          </p>
          <Link href="/training" className="text-primary-600 hover:text-primary-700 font-medium mt-4 inline-block">
            Accéder aux ressources →
          </Link>
        </div>

        <div className="card">
          <TrendingUp className="text-primary-600 mb-4" size={32} />
          <h3 className="text-xl font-semibold mb-2">Primes & Challenges</h3>
          <p className="text-gray-600">
            Suivez les primes actives et les challenges du mois pour maximiser vos revenus.
          </p>
          <Link href="/primes" className="text-primary-600 hover:text-primary-700 font-medium mt-4 inline-block">
            Voir les primes →
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-6">Ressources Rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/training" className="text-primary-600 hover:text-primary-700 font-medium">
            Vidéos & Entraînement →
          </Link>
          <Link href="/training" className="text-primary-600 hover:text-primary-700 font-medium">
            Entraînement →
          </Link>
          <Link href="/services" className="text-primary-600 hover:text-primary-700 font-medium">
            Services & Prix →
          </Link>
          <Link href="/primes" className="text-primary-600 hover:text-primary-700 font-medium">
            Primes →
          </Link>
        </div>
      </div>
    </div>
  );
}
