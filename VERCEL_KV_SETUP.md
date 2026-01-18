# Configuration Vercel KV - Guide Complet

## 📋 Étapes pour connecter Vercel KV

### 1. Créer un store KV via Upstash (Marketplace)

KV n'est plus directement visible - il faut passer par le **Marketplace**.

**Option 1 : Via Upstash (Recommandé)**

1. Allez sur votre projet Vercel : https://vercel.com/dashboard
2. Cliquez sur votre projet "rapporteurs-affaires"
3. Allez dans l'onglet **"Storage"** dans le menu de gauche
4. Cliquez sur **"Create Database"**
5. Dans la modal "Browse Storage", cherchez **"Upstash"** dans la section "Marketplace Database Providers"
6. Cliquez sur **"Upstash"** → cela ouvre une nouvelle interface
7. Sélectionnez **"Redis"** (c'est ce qui correspond à Vercel KV)
8. Donnez un nom à votre store (ex: "nexus-auth")
9. Choisissez la région (Europe pour la France)
10. Suivez les étapes pour créer le store Redis

**Important :** Upstash Redis est compatible avec Vercel KV - les variables d'environnement seront automatiquement configurées.

### Alternative : Chercher dans le Marketplace

Si vous ne voyez pas Upstash dans la liste :
1. Cliquez sur le bouton "Marketplace" ou "Browse all" dans la modal
2. Recherchez "KV" ou "Redis" ou "Upstash"
3. Sélectionnez une solution compatible

### 2. Récupérer les variables d'environnement

Une fois le store créé, Vercel génère automatiquement ces variables :

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

Vercel les ajoute automatiquement à votre projet. Vous pouvez les voir dans :
- Settings → Environment Variables

### 3. Installer le package Vercel KV

```bash
npm install @vercel/kv
```

### 4. Configuration terminée !

Le code va automatiquement utiliser Vercel KV en production et le système de fichiers en local.

## ✅ Vérification

1. Les variables d'environnement sont automatiquement disponibles sur Vercel
2. Le code détecte automatiquement l'environnement
3. En local : utilise les fichiers JSON (comme avant)
4. Sur Vercel : utilise Vercel KV automatiquement

## 💰 Coûts

- **Gratuit** jusqu'à 30 000 requêtes/jour
- Au-delà : $0.50 par million de requêtes

## 🔒 Sécurité

Les tokens sont automatiquement sécurisés par Vercel. Ne les partagez jamais publiquement.
