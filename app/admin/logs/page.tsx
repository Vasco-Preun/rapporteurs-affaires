"use client";

import { useState, useEffect } from "react";
import { Calendar, User, Mail, Globe } from "lucide-react";

interface LoginLog {
  userId: string;
  email: string;
  name: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<LoginLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/auth/logs?limit=200");
      const data = await res.json();
      if (data.logs) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Statistiques
  const uniqueUsers = new Set(logs.map(log => log.userId)).size;
  const recentLogs = logs.slice(0, 50); // 50 dernières connexions

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-4 uppercase tracking-wide">
            Logs de Connexion
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card">
              <div className="flex items-center gap-3">
                <User className="text-gold" size={24} />
                <div>
                  <div className="text-2xl font-black text-text-primary">{uniqueUsers}</div>
                  <div className="text-sm text-text-secondary">Apporteurs inscrits</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center gap-3">
                <Calendar className="text-gold" size={24} />
                <div>
                  <div className="text-2xl font-black text-text-primary">{logs.length}</div>
                  <div className="text-sm text-text-secondary">Connexions totales</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center gap-3">
                <Globe className="text-gold" size={24} />
                <div>
                  <div className="text-2xl font-black text-text-primary">
                    {logs.filter(log => new Date(log.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                  </div>
                  <div className="text-sm text-text-secondary">7 derniers jours</div>
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
              50 Dernières Connexions
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Nom</th>
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLogs.map((log, index) => (
                    <tr key={index} className="border-b border-border-subtle/50 hover:bg-background-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-text-secondary text-sm">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="py-3 px-4 text-text-primary font-medium">{log.name}</td>
                      <td className="py-3 px-4 text-text-secondary text-sm">{log.email}</td>
                      <td className="py-3 px-4 text-text-secondary text-xs">{log.ip || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {logs.length === 0 && (
              <div className="text-center text-text-secondary py-8">
                Aucune connexion enregistrée
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
