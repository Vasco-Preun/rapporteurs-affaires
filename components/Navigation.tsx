"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/nexus-circle", label: "Nexus Circle" },
  { href: "/processus-vente", label: "Comment vendre" },
];

const clientPages = [
  { href: "/clients/avocats", label: "Avocats" },
  { href: "/clients/architectes", label: "Architectes" },
  { href: "/clients/medical", label: "Médical" },
  { href: "/clients/instituts-formation", label: "Instituts de Formation" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientMenuOpen, setClientMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setClientMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setClientMenuOpen(false);
    }, 150); // Délai de 150ms avant fermeture
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-background-secondary border-b border-border-subtle sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/logo-detoure-blanc-copie.png"
              alt="Nexus Circle"
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm text-text-secondary font-medium tracking-widest hidden sm:block">Portail Partenaires</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-border-subtle text-gold"
                    : "text-text-secondary hover:bg-border-subtle hover:text-text-primary"
                }`}
                style={{ fontWeight: 500 }}
              >
                {item.label}
              </Link>
            ))}
            {/* Client Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  clientPages.some(page => pathname === page.href)
                    ? "bg-border-subtle text-gold"
                    : "text-text-secondary hover:bg-border-subtle hover:text-text-primary"
                }`}
                style={{ fontWeight: 500 }}
              >
                Clients
                <ChevronDown size={16} />
              </button>
              {clientMenuOpen && (
                <>
                  {/* Zone de transition invisible pour éviter les fermetures accidentelles */}
                  <div className="absolute top-full left-0 w-full h-2" />
                  <div
                    className="absolute top-full left-0 mt-1 w-56 bg-background-secondary border border-border-subtle rounded-lg shadow-lg py-2 z-50"
                  >
                    {clientPages.map((page) => (
                      <Link
                        key={page.href}
                        href={page.href}
                        className={`block px-4 py-2 text-sm font-medium transition-colors ${
                          pathname === page.href
                            ? "bg-border-subtle text-gold"
                            : "text-text-secondary hover:bg-border-subtle hover:text-text-primary"
                        }`}
                      >
                        {page.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-text-secondary hover:bg-border-subtle hover:text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "bg-border-subtle text-gold"
                    : "text-text-secondary hover:bg-border-subtle hover:text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2 text-base font-medium text-text-secondary">
              Clients
            </div>
            {clientPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-6 py-2 rounded-md text-base font-medium ${
                  pathname === page.href
                    ? "bg-border-subtle text-gold"
                    : "text-text-secondary hover:bg-border-subtle hover:text-text-primary"
                }`}
              >
                {page.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

