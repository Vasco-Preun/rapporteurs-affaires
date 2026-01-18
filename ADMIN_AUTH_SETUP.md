# Configuration Authentification Admin

## 🔐 Accès Admin

L'accès à la section Admin (`/admin/logs`) est protégé par un mot de passe séparé. Seuls les utilisateurs avec le mot de passe admin peuvent y accéder.

## ⚙️ Configuration

### Variable d'environnement

Ajoutez dans votre fichier `.env.local` (et dans les variables d'environnement Vercel) :

```env
ADMIN_PASSWORD=Suxen.2025
```

### Configuration Vercel

1. Allez dans votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez la variable `ADMIN_PASSWORD` avec la valeur `Suxen.2025`
4. Redéployez l'application si nécessaire

## 🔑 Accès

### Se connecter en tant qu'admin

1. Naviguez vers `/admin/login`
2. Entrez le mot de passe : `Suxen.2025`
3. Vous serez redirigé vers `/admin/logs`

### Accès direct protégé

Si vous essayez d'accéder directement à `/admin/logs` sans être authentifié en tant qu'admin, vous serez automatiquement redirigé vers `/admin/login`.

## 🔒 Sécurité

- **Mot de passe séparé** : L'authentification admin est indépendante de l'authentification des apporteurs d'affaires
- **Session admin** : Cookie séparé `admin_session` (valide 24h)
- **Protection middleware** : Toutes les routes `/admin/*` sont protégées (sauf `/admin/login`)
- **Lien masqué** : Le lien "Admin" dans la navigation n'apparaît que si vous êtes authentifié en tant qu'admin

## 📋 Fonctionnement

1. **Connexion apporteur d'affaires** : `/login` (pour tous les apporteurs)
2. **Connexion admin** : `/admin/login` (pour les admins uniquement)
3. **Sessions séparées** : Un apporteur d'affaires connecté ne peut pas accéder à `/admin/logs` sans mot de passe admin

## 🧪 Test local

Pour tester en local :

1. Ajoutez `ADMIN_PASSWORD=Suxen.2025` dans `.env.local`
2. Démarrez le serveur : `npm run dev`
3. Allez sur `http://localhost:3000/admin/login`
4. Entrez le mot de passe : `Suxen.2025`

## ⚠️ Important

- **Ne commitez pas** le fichier `.env.local` dans Git
- **Changez le mot de passe** en production si nécessaire
- Le mot de passe est stocké en clair dans les variables d'environnement (pour simplicité avec Vercel)
