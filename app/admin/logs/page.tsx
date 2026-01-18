"use client";

import { useState, useEffect } from "react";
import { Calendar, User } from "lucide-react";

interface LoginHistoryData {
  userId: string;
  loginHistory: Array<{ at: string }>; // Historique complet
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
  const [loginHistories, setLoginHistories] = useState<LoginHistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  useEffect(() => {
    fetchLoginHistories();
  }, []);

  const fetchLoginHistories = async () => {
    try {
      const res = await fetch("/api/auth/logs");
      const data = await res.json();
      if (data.lastLogins) {
        setLoginHistories(data.lastLogins);
      }
    } catch (error) {
      console.error("Error fetching login histories:", error);
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
  const sortedLogins = [...loginHistories].sort((a, b) => {
    if (!a.lastLogin) return 1;
    if (!b.lastLogin) return -1;
    return new Date(b.lastLogin.at).getTime() - new Date(a.lastLogin.at).getTime();
  });

  // Statistiques
  const totalUsers = loginHistories.length;
  const usersWithLogin = loginHistories.filter(item => item.lastLogin !== null).length;
  const totalLogins = loginHistories.reduce((sum, item) => sum + item.loginHistory.length, 0);

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">
            Historique des Connexions
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                  <div className="text-sm text-text-secondary">Avec connexion</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center gap-3">
                <Calendar className="text-gold" size={24} />
                <div>
                  <div className="text-2xl font-black text-text-primary">{totalLogins}</div>
                  <div className="text-sm text-text-secondary">Total connexions</div>
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
              Historique par Apporteur
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Nom</th>
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Dernière Connexion</th>
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Total Connexions</th>
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Détails</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLogins.map((item, index) => {
                    const isExpanded = expandedUser === item.userId;
                    const totalConnections = item.loginHistory.length;
                    
                    return (
                      <>
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
                          <td className="py-3 px-4 text-text-secondary text-sm">
                            <span className="font-medium text-gold">{totalConnections}</span>
                          </td>
                          <td className="py-3 px-4">
                            {totalConnections > 0 && (
                              <button
                                onClick={() => setExpandedUser(isExpanded ? null : item.userId)}
                                className="text-gold hover:text-gold/80 text-sm font-medium transition-colors"
                              >
                                {isExpanded ? "Masquer" : "Voir l'historique"}
                              </button>
                            )}
                          </td>
                        </tr>
                        {isExpanded && totalConnections > 0 && (
                          <tr key={`${index}-details`} className="bg-background-secondary/30">
                            <td colSpan={5} className="py-4 px-4">
                              <div className="space-y-2">
                                <div className="text-sm font-medium text-text-secondary mb-2">
                                  Historique complet ({totalConnections} connexion{totalConnections > 1 ? 's' : ''})
                                </div>
                                <div className="max-h-64 overflow-y-auto space-y-1">
                                  {item.loginHistory.map((login, loginIndex) => (
                                    <div key={loginIndex} className="text-xs text-text-secondary py-1 px-2 bg-background-primary/50 rounded">
                                      {formatDate(login.at)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
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
