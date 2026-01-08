import { Trophy, Calendar, DollarSign, CheckCircle, Clock } from "lucide-react";
import { getPrimes } from "@/lib/content";
import type { PrimeItem } from "@/types";

export default function PrimesPage() {
  const primes = getPrimes();

  const activePrimes = primes.filter((p) => p.status === "active");
  const upcomingPrimes = primes.filter((p) => p.status === "upcoming");
  const completedPrimes = primes.filter((p) => p.status === "completed");

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
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-text-muted/20 text-text-muted tracking-widest">
            Terminée
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-text-primary uppercase tracking-wide">Primes & Challenges</h1>
        <Trophy className="text-gold" size={40} />
      </div>

      {/* Active Primes */}
      {activePrimes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center uppercase tracking-wide">
            <CheckCircle className="text-green-500 mr-2" size={24} />
            Primes Actives
          </h2>
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
        </section>
      )}

      {/* Upcoming Primes */}
      {upcomingPrimes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center uppercase tracking-wide">
            <Clock className="text-blue-500 mr-2" size={24} />
            Primes à Venir
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingPrimes.map((prime) => (
              <div key={prime.id} className="card border-2 border-blue-500/30">
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
        </section>
      )}

      {/* Completed Primes */}
      {completedPrimes.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6 uppercase tracking-wide">Primes Terminées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedPrimes.map((prime) => (
              <div key={prime.id} className="card opacity-75">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-text-primary">{prime.title}</h3>
                  {getStatusBadge(prime.status)}
                </div>
                <p className="text-text-secondary">{prime.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info Commission */}
      <div className="mt-12 card border-gold/30">
        <div className="flex items-start">
          <DollarSign className="text-gold mr-3 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-text-primary mb-2 uppercase tracking-wide">Rappel Commission de Base</h3>
            <p className="text-text-secondary">
              Commission de <strong>15% après encaissement</strong> du client. Les primes sont
              des bonus supplémentaires qui s&apos;ajoutent à cette commission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

