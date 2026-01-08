# Portail Partenaires Nexus Circle

Plateforme web moderne pour les apporteurs d'affaires de Nexus Circle. Espace dédié avec ressources, scripts, arguments de vente, primes, exemples et vidéos.

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Lucide React** (icônes)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation

1. **Cloner le projet** (ou naviguer dans le dossier)
   ```bash
   cd "Site apporteurs d'affaires"
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   
   Créer un fichier `.env.local` à la racine du projet :
   ```env
   SITE_PASSWORD=votre-mot-de-passe-site-securise
   ```
   
   ⚠️ **Important** : 
   - `SITE_PASSWORD` : Mot de passe pour accéder au site (obligatoire)
   - Changez le mot de passe par défaut en production !
   
   Note : L'entraînement fonctionne 100% en local sans aucune API externe.

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur**
   
   Rendez-vous sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── services/          # Page services
│   ├── videos/            # Page vidéos
│   ├── primes/            # Page primes
│   ├── training/          # Page entraînement par scénarios
│   ├── admin/             # Administration
│   │   ├── page.tsx      # Panel admin
│   │   └── login/        # Page de connexion
│   └── api/              # Routes API
│       ├── admin/        # API admin (login, content)
│       └── training/     # API entraînement (scenarios)
├── components/            # Composants React réutilisables
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── AdminPanel.tsx
├── content/              # Fichiers JSON de contenu
│   ├── services.json
│   ├── scripts.json
│   ├── arguments.json
│   ├── primes.json
│   ├── examples.json
│   ├── videos.json
│   └── training_scenarios.json  # Scénarios d'entraînement
├── lib/                  # Utilitaires
│   ├── content.ts        # Gestion du contenu
│   ├── auth.ts           # Authentification
│   └── training/         # Utilitaires entraînement
│       ├── scenarios.ts  # Filtrage des scénarios
│       ├── loadScenarios.ts  # Chargement depuis JSON
│       └── evaluator.ts  # Système de scoring local
└── types/                # Types TypeScript
    ├── index.ts
    └── training.ts       # Types pour l'entraînement
```

## ✏️ Modifier le Contenu

### Via les fichiers JSON

Modifier directement les fichiers dans le dossier `/content/` :

- `services.json` : Services proposés (entreprises & influenceurs)
- `scripts.json` : Scripts d'appel, DM, SMS, email, objections
- `arguments.json` : Arguments de vente par service
- `primes.json` : Primes et challenges actifs/à venir
- `examples.json` : Exemples d'approche par type de business
- `videos.json` : Vidéos YouTube et Nexus Circle

**Format JSON** : Respectez la structure existante. Voir les types dans `types/index.ts`.

## 🎥 Ajouter une Vidéo YouTube

1. **Via l'admin** :
   - Aller dans `/admin` → Onglet "Vidéos"
   - Ajouter une nouvelle vidéo
   - Remplir le champ `youtubeId` avec l'ID de la vidéo (visible dans l'URL : `youtube.com/watch?v=ID_ICI`)

2. **Via le fichier JSON** :
   ```json
   {
     "id": "nouveau-id",
     "title": "Titre de la vidéo",
     "description": "Description",
     "category": "youtube",
     "youtubeId": "ID_YOUTUBE_ICI",
     "tags": ["tag1", "tag2"]
   }
   ```

## 🔒 Sécurité

### Authentification Site
- **Protection globale** : Toutes les pages du site nécessitent un mot de passe (sauf `/login`)
- **Mot de passe** : Défini dans `.env.local` avec la variable `SITE_PASSWORD`
- **Session** : Cookie sécurisé valide 24h
- **Page de login** : Accessible à `/login`

## 🏗️ Build pour Production

```bash
npm run build
npm start
```

## 🎯 Page d'Entraînement

La page `/training` permet aux apporteurs d'affaires de s'entraîner avec des scénarios réalistes.

### Fonctionnalités

- **Scénarios multiples** : 15+ scénarios préconfigurés (entreprises et influenceurs)
- **Entraînement par rédaction** : Rédigez votre réponse comme si vous parliez au prospect
- **Scoring automatique** : Évaluation /10 basée sur des règles et mots-clés (100% local)
- **Feedback personnalisé** : 3 points forts, 3 axes d'amélioration, réponse idéale
- **Filtres avancés** : Par catégorie, canal (appel/DM/WhatsApp), difficulté
- **Aucune API externe** : Fonctionne entièrement en local

### Comment ajouter un scénario

Modifiez le fichier `/content/training_scenarios.json` :

```json
{
  "id": "nouveau-scenario",
  "title": "Titre du scénario",
  "category": "entreprise",
  "channel": "appel",
  "difficulty": "moyen",
  "context": "Description du prospect et de sa situation",
  "objection": "L'objection principale qu'il va poser",
  "goal": "Objectif : obtenir un RDV de 15 minutes",
  "ideal_answer": "Réponse modèle que vous souhaitez voir",
  "scoring": {
    "must_include_any": ["ordre d'idée", "fourchette"],
    "must_include_all": [],
    "bonus_keywords": ["référencement", "optimisation"],
    "forbidden_keywords": ["garanti", "promis", "remise"],
    "rdv_keywords": ["rdv", "rendez-vous", "15 min", "disponible"],
    "price_fixed_keywords": ["ça coûte exactement", "prix fixe"],
    "qualification_keywords": ["besoin", "situation"],
    "framework_keywords": ["sur-mesure", "personnalisé"]
  }
}
```

Le système de scoring détecte automatiquement :
- ✅ Proposition de RDV
- ✅ Qualification du besoin
- ✅ Respect du cadre Nexus (pas de prix fixe)
- ❌ Mots interdits (promesses, prix fixes)

## 📚 Ajouter un Scénario d'Entraînement

Le fichier `/content/training_scenarios.json` contient tous les scénarios d'entraînement.

### Structure d'un scénario

```json
{
  "id": "unique-id",
  "title": "Titre descriptif",
  "category": "entreprise" | "influenceur",
  "channel": "appel" | "dm" | "whatsapp",
  "difficulty": "facile" | "moyen" | "dur",
  "context": "Description détaillée du prospect et de sa situation",
  "objection": "L'objection principale qu'il pose",
  "goal": "Objectif : obtenir un RDV de 15 minutes",
  "ideal_answer": "Réponse modèle complète (2-3 phrases)",
  "scoring": {
    "must_include_any": ["mots-clés attendus (au moins un)"],
    "must_include_all": ["phrases obligatoires (optionnel)"],
    "bonus_keywords": ["mots qui augmentent la note"],
    "forbidden_keywords": ["garanti", "promis", "remise", "prix fixe"],
    "rdv_keywords": ["rdv", "rendez-vous", "15 min", "disponible"],
    "price_fixed_keywords": ["ça coûte exactement", "prix fixe"],
    "qualification_keywords": ["besoin", "situation", "comprendre"],
    "framework_keywords": ["sur-mesure", "personnalisé", "ordre d'idée"]
  }
}
```

### Exemple complet

Voir les scénarios existants dans `/content/training_scenarios.json` pour des exemples concrets.

### Scoring automatique

Le système analyse la réponse et donne :
- **Note /10** basée sur les mots-clés détectés
- **RDV obtenu ?** OUI/NON selon la note et la présence de mots-clés RDV
- **3 points forts** et **3 axes d'amélioration** automatiques
- **Réponse idéale** : celle définie dans le scénario

## 📝 Notes Importantes

### Contenu Modifiable

Tout le contenu est modifiable sans toucher au code :
- ✅ Services
- ✅ Scripts
- ✅ Arguments
- ✅ Primes
- ✅ Exemples
- ✅ Vidéos

### Rappels Légaux

Les pages `/process` et le footer contiennent des rappels importants :
- Les partenaires ne négocient pas
- Les prix sont indicatifs
- Commission de 15% après encaissement

### Vidéos Nexus Circle

L'espace est prêt pour ajouter des vidéos personnalisées :
- Via embed (ajouter l'URL dans le champ `url`)
- Via upload (à implémenter si nécessaire)

## 🐛 Dépannage

### Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur d'authentification
- Vérifier que `.env.local` existe avec `SITE_PASSWORD`
- Redémarrer le serveur après modification de `.env.local`

### Contenu non mis à jour
- Vérifier que les fichiers JSON dans `/content/` sont valides
- Redémarrer le serveur si modification manuelle des JSON

## 📞 Support

Pour toute question ou problème, consulter la documentation Next.js ou les types TypeScript dans `types/index.ts`.

## 📄 Licence

Propriétaire - Nexus Circle

