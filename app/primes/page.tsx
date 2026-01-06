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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1" size={12} />
            Active
          </span>
        );
      case "upcoming":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="mr-1" size={12} />
            À venir
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Terminée
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Primes & Challenges</h1>
        <Trophy className="text-primary-600" size={40} />
      </div>

      {/* Active Primes */}
      {activePrimes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="text-green-600 mr-2" size={24} />
            Primes Actives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePrimes.map((prime) => (
              <div key={prime.id} className="card border-2 border-green-200 bg-green-50">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{prime.title}</h3>
                  {getStatusBadge(prime.status)}
                </div>
                <p className="text-gray-700 mb-4">{prime.description}</p>
                <div className="bg-white rounded p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="text-primary-600 mr-2" size={20} />
                    <span className="font-semibold text-lg text-gray-900">Montant : {prime.amount}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Conditions :</p>
                    <p className="text-sm text-gray-600">{prime.conditions}</p>
                  </div>
                  {prime.startDate && prime.endDate && (
                    <div className="mt-3 flex items-center text-sm text-gray-600">
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Clock className="text-blue-600 mr-2" size={24} />
            Primes à Venir
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingPrimes.map((prime) => (
              <div key={prime.id} className="card border-2 border-blue-200 bg-blue-50">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{prime.title}</h3>
                  {getStatusBadge(prime.status)}
                </div>
                <p className="text-gray-700 mb-4">{prime.description}</p>
                <div className="bg-white rounded p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="text-primary-600 mr-2" size={20} />
                    <span className="font-semibold text-lg text-gray-900">Montant : {prime.amount}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Conditions :</p>
                    <p className="text-sm text-gray-600">{prime.conditions}</p>
                  </div>
                  {prime.startDate && prime.endDate && (
                    <div className="mt-3 flex items-center text-sm text-gray-600">
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Primes Terminées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedPrimes.map((prime) => (
              <div key={prime.id} className="card opacity-75">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{prime.title}</h3>
                  {getStatusBadge(prime.status)}
                </div>
                <p className="text-gray-700">{prime.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info Commission */}
      <div className="mt-12 card bg-primary-50 border-primary-200">
        <div className="flex items-start">
          <DollarSign className="text-primary-600 mr-3 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Rappel Commission de Base</h3>
            <p className="text-gray-700">
              Commission de <strong>15% après encaissement</strong> du client. Les primes sont
              des bonus supplémentaires qui s&apos;ajoutent à cette commission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

