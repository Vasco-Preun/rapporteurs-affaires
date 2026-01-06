import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Nexus Circle</h3>
            <p className="text-sm">
              Portail dédié aux apporteurs d&apos;affaires. Votre objectif : décrocher un RDV.
              Nexus Circle gère le reste.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Rappel Important</h3>
            <p className="text-sm">
              Les partenaires ne négocient pas, ne communiquent pas de prix fermes,
              ne prennent aucun engagement. Les fourchettes de prix sont indicatives
              et servent uniquement à décrocher un RDV.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Commissions</h3>
            <p className="text-sm">
              Commission de 15% après encaissement du client.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Nexus Circle. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

