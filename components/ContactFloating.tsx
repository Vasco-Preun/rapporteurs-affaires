"use client";

import { useState } from "react";
import { Phone, X, ChevronUp } from "lucide-react";

export default function ContactFloating() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: "Pierre",
      phone: "07 67 63 61 73",
      tel: "+33767636173",
    },
    {
      name: "Vasco",
      phone: "06 26 45 21 65",
      tel: "+33626452165",
    },
  ];

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-gold hover:bg-gold/90 text-background-primary rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 animate-glow-pulse"
          aria-label="Contacter Nexus Circle"
        >
          <Phone size={24} />
        </button>
      )}

      {/* Fenêtre de contact */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-72 bg-background-secondary border border-border-subtle rounded-lg shadow-2xl flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-background-primary border-b border-border-subtle p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="text-gold" size={20} />
              <h3 className="text-text-primary font-semibold">Nous contacter</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Liste des contacts */}
          <div className="p-4 space-y-3">
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.tel}`}
                className="flex items-center justify-between p-3 bg-background-primary rounded-lg border border-border-subtle hover:border-gold/50 hover:bg-background-secondary transition-all duration-300 group"
              >
                <div className="flex flex-col">
                  <span className="text-text-primary font-medium text-sm">{contact.name}</span>
                  <span className="text-text-secondary text-xs mt-1">{contact.phone}</span>
                </div>
                <Phone className="text-gold group-hover:scale-110 transition-transform" size={18} />
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-background-primary border-t border-border-subtle rounded-b-lg text-center">
            <p className="text-text-secondary text-xs">Nexus Circle</p>
          </div>
        </div>
      )}
    </>
  );
}
