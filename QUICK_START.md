# Démarrage Rapide

## 🚀 Installation Express

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier .env.local
echo "ADMIN_PASSWORD=votre-mot-de-passe" > .env.local

# 3. Lancer le serveur
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📝 Première Utilisation

1. **Accéder au portail** : http://localhost:3000
2. **Accéder à l'admin** : http://localhost:3000/admin/login
   - Mot de passe : celui défini dans `.env.local`

## ✏️ Modifier le Contenu

### Option 1 : Interface Admin (Recommandé)
- Aller sur `/admin/login`
- Se connecter
- Modifier le contenu dans l'interface
- Cliquer sur "Sauvegarder"

### Option 2 : Fichiers JSON
- Modifier les fichiers dans `/content/*.json`
- Redémarrer le serveur

## 🎥 Ajouter une Vidéo YouTube

1. Aller dans `/admin` → Onglet "Vidéos"
2. Cliquer sur "Ajouter"
3. Remplir :
   - `title` : Titre de la vidéo
   - `description` : Description
   - `category` : "youtube"
   - `youtubeId` : ID de la vidéo (dans l'URL : `youtube.com/watch?v=ID_ICI`)
4. Sauvegarder

## 📂 Structure des Données

Tous les fichiers JSON sont dans `/content/` :
- `services.json` : Services proposés
- `scripts.json` : Scripts de prospection
- `arguments.json` : Arguments de vente
- `primes.json` : Primes et challenges
- `examples.json` : Exemples d'approche
- `videos.json` : Vidéos YouTube et Nexus Circle

## 🔒 Sécurité

- Le mot de passe admin est dans `.env.local` (ne pas commiter)
- Session valide 24h
- Protection des routes API

## 🐛 Problème ?

1. Vérifier que `.env.local` existe avec `ADMIN_PASSWORD`
2. Vérifier que les fichiers JSON dans `/content/` sont valides
3. Redémarrer le serveur : `npm run dev`

## 📚 Documentation Complète

- `README.md` : Documentation complète
- `ADMIN_GUIDE.md` : Guide détaillé de l'interface admin

