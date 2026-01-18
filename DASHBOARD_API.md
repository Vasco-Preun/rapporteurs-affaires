# API Dashboard - Connexions des Apporteurs d'Affaires

Cette API permet au dashboard Nexus externe de récupérer les données de connexion des apporteurs d'affaires.

## 🔐 Configuration

### Variables d'environnement

Ajoutez dans votre fichier `.env.local` (et dans les variables d'environnement Vercel) :

```env
DASHBOARD_API_KEY=votre-clé-api-secure-ici
```

**Important** : Utilisez une clé API forte et unique. Exemple :
- Générer avec `openssl rand -hex 32`
- Ou utiliser un générateur de tokens sécurisés

## 📡 Endpoint

### GET `/api/dashboard/logins`

Récupère les dernières connexions de tous les apporteurs d'affaires.

#### Authentification

La requête doit inclure un header `X-API-Key` avec la clé API configurée.

```
X-API-Key: votre-clé-api-secure-ici
```

#### Réponse en cas de succès (200)

```json
{
  "success": true,
  "data": [
    {
      "userId": "user_1234567890_abc123",
      "userName": "Jean Dupont",
      "userEmail": "jean.dupont@example.com",
      "lastLogin": "2026-02-15T14:30:00.000Z",
      "createdAt": "2026-01-10T09:00:00.000Z"
    },
    {
      "userId": "user_1234567891_xyz789",
      "userName": "Marie Martin",
      "userEmail": "marie.martin@example.com",
      "lastLogin": null,
      "createdAt": "2026-01-12T11:20:00.000Z"
    }
  ],
  "count": 2,
  "timestamp": "2026-02-15T15:00:00.000Z"
}
```

#### Réponse en cas d'erreur (401 - Clé API invalide)

```json
{
  "error": "Clé API invalide"
}
```

#### Réponse en cas d'erreur (500 - Erreur serveur)

```json
{
  "error": "Une erreur est survenue lors de la récupération des données"
}
```

## 💻 Exemples d'utilisation

### JavaScript/TypeScript (fetch)

```javascript
const apiKey = 'votre-clé-api-secure-ici';
const apiUrl = 'https://votre-domaine.vercel.app/api/dashboard/logins';

async function fetchLogins() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Nombre d'apporteurs: ${data.count}`);
    console.log('Données:', data.data);
  } catch (error) {
    console.error('Erreur:', error);
  }
}
```

### Python (requests)

```python
import requests

api_key = 'votre-clé-api-secure-ici'
api_url = 'https://votre-domaine.vercel.app/api/dashboard/logins'

headers = {
    'X-API-Key': api_key,
    'Content-Type': 'application/json',
}

response = requests.get(api_url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(f"Nombre d'apporteurs: {data['count']}")
    print("Données:", data['data'])
else:
    print(f"Erreur {response.status_code}: {response.text}")
```

### cURL

```bash
curl -X GET \
  https://votre-domaine.vercel.app/api/dashboard/logins \
  -H 'X-API-Key: votre-clé-api-secure-ici' \
  -H 'Content-Type: application/json'
```

## 📊 Format des données

Chaque objet dans `data` contient :

- **userId** (string) : Identifiant unique de l'apporteur
- **userName** (string) : Nom complet de l'apporteur
- **userEmail** (string) : Email de l'apporteur
- **lastLogin** (string | null) : Date/heure de la dernière connexion au format ISO (ex: "2026-02-15T14:30:00.000Z"), ou `null` si jamais connecté
- **createdAt** (string | null) : Date/heure de création du compte au format ISO, ou `null` si non disponible

## 🔄 Fréquence de mise à jour

Les données sont récupérées en temps réel depuis Vercel KV (Upstash Redis). Chaque connexion est enregistrée immédiatement lors du login.

## 🛡️ Sécurité

- **Clé API requise** : Toutes les requêtes doivent inclure une clé API valide
- **HTTPS uniquement** : L'API doit être appelée via HTTPS en production
- **Rate limiting recommandé** : Implémentez un rate limiting côté dashboard pour éviter les appels excessifs

## 🧪 Test local

Pour tester l'API en local :

1. Ajoutez `DASHBOARD_API_KEY` dans `.env.local`
2. Démarrez le serveur : `npm run dev`
3. Appelez l'API : `http://localhost:3000/api/dashboard/logins`

```bash
curl -X GET \
  http://localhost:3000/api/dashboard/logins \
  -H 'X-API-Key: votre-clé-api-secure-ici'
```

## 🚀 Déploiement sur Vercel

1. Allez dans votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez la variable `DASHBOARD_API_KEY` avec votre clé
4. Redéployez l'application si nécessaire
