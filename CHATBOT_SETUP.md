# Configuration du Chatbot Nexus Circle

## 🚀 Installation

### 1. Installer la dépendance Groq

```bash
npm install groq-sdk
```

### 2. Obtenir une clé API Groq (GRATUIT)

1. Allez sur https://console.groq.com/
2. Créez un compte (gratuit, pas besoin de carte bancaire)
3. Générez une clé API dans la section "API Keys"
4. Copiez la clé

### 3. Configurer la variable d'environnement

Créez un fichier `.env.local` à la racine du projet (si ce n'est pas déjà fait) et ajoutez :

```env
GROQ_API_KEY=votre_cle_api_groq_ici
```

⚠️ **Important** : Le fichier `.env.local` est déjà dans `.gitignore`, votre clé API ne sera pas commitée.

### 4. Redémarrer le serveur de développement

```bash
npm run dev
```

## ✅ C'est tout !

Le chatbot apparaîtra automatiquement en bas à droite de toutes les pages du site.

## 🎯 Fonctionnalités

Le chatbot connaît :
- ✅ Nexus Circle (qui nous sommes, notre positionnement)
- ✅ Nos 4 cibles : avocats, architectes, médical, instituts de formation
- ✅ Nos services et processus
- ✅ Informations pour les apporteurs d'affaires

## 📝 Pour déployer sur Vercel

1. Allez sur votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez `GROQ_API_KEY` avec votre clé API
4. Redéployez

## 💡 Alternatives (si Groq ne fonctionne pas)

Si vous préférez utiliser un autre service gratuit :

- **Hugging Face Inference API** : Gratuit avec certains modèles
- **Cohere** : Plan gratuit disponible
- **OpenAI** : Limite gratuite pour nouveaux comptes

Modifiez `app/api/chat/route.ts` pour changer de provider.
