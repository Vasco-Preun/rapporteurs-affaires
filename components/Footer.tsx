import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-secondary text-text-secondary border-t border-border-subtle mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <img
            src="/logo-detoure-blanc-copie.png"
            alt="Nexus Circle"
            className="h-12 w-auto object-contain opacity-80"
          />
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Nexus Circle. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

