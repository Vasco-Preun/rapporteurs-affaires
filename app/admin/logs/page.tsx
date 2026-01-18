"use client";

import { useState, useEffect } from "react";
import { Calendar, User } from "lucide-react";

interface LastLoginData {
  userId: string;
  lastLogin: {
    at: string; // Format ISO
  } | null;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export default function AdminLogsPage() {
  const [lastLogins, setLastLogins] = useState<LastLoginData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLastLogins();
  }, []);

  const fetchLastLogins = async () => {
    try {
      const res = await fetch("/api/auth/logs");
      const data = await res.json();
      if (data.lastLogins) {
        setLastLogins(data.lastLogins);
      }
    } catch (error) {
      console.error("Error fetching last logins:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Trier par dernière connexion (les plus récents en premier)
  const sortedLogins = [...lastLogins].sort((a, b) => {
    if (!a.lastLogin) return 1;
    if (!b.lastLogin) return -1;
    return new Date(b.lastLogin.at).getTime() - new Date(a.lastLogin.at).getTime();
  });

  // Statistiques
  const totalUsers = lastLogins.length;
  const usersWithLogin = lastLogins.filter(item => item.lastLogin !== null).length;

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">
            Dernières Connexions
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="card">
              <div className="flex items-center gap-3">
                <User className="text-gold" size={24} />
                <div>
                  <div className="text-2xl font-black text-text-primary">{totalUsers}</div>
                  <div className="text-sm text-text-secondary">Apporteurs inscrits</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center gap-3">
                <Calendar className="text-gold" size={24} />
                <div>
                  <div className="text-2xl font-black text-text-primary">{usersWithLogin}</div>
                  <div className="text-sm text-text-secondary">Avec connexion enregistrée</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-text-secondary">Chargement...</div>
        ) : (
          <div className="card">
            <h2 className="text-xl font-bold text-text-primary mb-4 uppercase tracking-wide">
              Dernière Connexion par Apporteur
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Nom</th>
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Dernière Connexion</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLogins.map((item, index) => (
                    <tr key={index} className="border-b border-border-subtle/50 hover:bg-background-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-text-primary font-medium">
                        {item.user?.name || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-text-secondary text-sm">
                        {item.user?.email || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-text-secondary text-sm">
                        {item.lastLogin ? formatDate(item.lastLogin.at) : <span className="text-text-muted italic">Jamais connecté</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sortedLogins.length === 0 && (
              <div className="text-center text-text-secondary py-8">
                Aucun apporteur enregistré
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
