"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogIn, UserPlus, Mail, Lock, User } from "lucide-react";

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, user } = useAuth();
  const searchParams = useSearchParams();
  
  // Si déjà connecté, rediriger vers la page d'accueil ou la page demandée
  useEffect(() => {
    if (user) {
      const redirect = searchParams.get("redirect") || "/";
      window.location.href = redirect;
    }
  }, [user, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        if (!name.trim()) {
          setError("Le nom est requis");
          setLoading(false);
          return;
        }
        result = await register(email, name, password);
      }

      if (result.success) {
        // Rediriger vers la page demandée ou la page d'accueil
        // Utiliser window.location pour forcer un rechargement complet et récupérer le cookie
        const redirect = searchParams.get("redirect") || "/";
        window.location.href = redirect;
      } else {
        setError(result.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2 uppercase tracking-wide">
              {isLogin ? "Connexion" : "Inscription"}
            </h1>
            <p className="text-text-secondary">
              {isLogin 
                ? "Accédez à votre espace apporteur d'affaires" 
                : "Créez votre compte apporteur d'affaires"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  <User className="inline mr-2" size={16} />
                  Nom complet
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  placeholder="Votre nom"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                <Mail className="inline mr-2" size={16} />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                <Lock className="inline mr-2" size={16} />
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder={isLogin ? "Votre mot de passe" : "Au moins 6 caractères"}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3"
            >
              {loading ? (
                "Chargement..."
              ) : isLogin ? (
                <>
                  <LogIn className="mr-2" size={18} />
                  Se connecter
                </>
              ) : (
                <>
                  <UserPlus className="mr-2" size={18} />
                  Créer mon compte
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setEmail("");
                setName("");
                setPassword("");
              }}
              className="text-text-secondary hover:text-gold transition-colors text-sm"
            >
              {isLogin 
                ? "Pas encore de compte ? Créez-en un ici" 
                : "Déjà un compte ? Connectez-vous ici"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-border-subtle text-center">
            <Link href="/" className="text-text-secondary hover:text-gold transition-colors text-sm">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background-primary px-4">
        <div className="text-text-secondary">Chargement...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
