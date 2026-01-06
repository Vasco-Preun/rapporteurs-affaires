# Guide d'Administration

## Accès à l'Administration

1. Naviguer vers `/admin/login`
2. Entrer le mot de passe défini dans `.env.local`
3. Vous serez redirigé vers `/admin`

## Interface d'Administration

L'interface admin est divisée en 6 onglets correspondant aux types de contenu :

### 1. Services
Gérer les services proposés aux entreprises et influenceurs.

**Champs :**
- `id` : Identifiant unique (généré automatiquement)
- `title` : Titre du service
- `description` : Description du service
- `category` : "entreprise" ou "influenceur"
- `features` : Liste des fonctionnalités (optionnel)
- `priceRange` : Fourchette de prix indicative (optionnel)

### 2. Scripts
Gérer les scripts de prospection (appels, DM, SMS, email, objections).

**Champs :**
- `id` : Identifiant unique
- `title` : Titre du script
- `type` : "appel", "dm", "sms", "email", ou "objection"
- `content` : Contenu du script (texte complet)
- `duration` : Durée pour les scripts d'appel (optionnel, ex: "30 sec")
- `tags` : Tags pour la recherche (optionnel)

### 3. Arguments
Gérer les arguments de vente structurés par service.

**Champs :**
- `id` : Identifiant unique
- `service` : Nom du service concerné
- `problem` : Le problème du prospect
- `benefit` : Le bénéfice apporté
- `example` : Exemple concret
- `closingQuestion` : Question de closing pour obtenir le RDV
- `tags` : Tags pour la recherche (optionnel)

### 4. Primes
Gérer les primes et challenges.

**Champs :**
- `id` : Identifiant unique
- `title` : Titre de la prime
- `description` : Description
- `amount` : Montant ou description du montant
- `conditions` : Conditions pour obtenir la prime
- `status` : "active", "upcoming", ou "completed"
- `startDate` : Date de début (optionnel, format YYYY-MM-DD)
- `endDate` : Date de fin (optionnel, format YYYY-MM-DD)

### 5. Exemples
Gérer les exemples d'approche par type de business.

**Champs :**
- `id` : Identifiant unique
- `businessType` : Type de business (ex: "Auto-école", "Restaurant")
- `context` : Contexte du prospect
- `message` : Message/phrase d'approche
- `objective` : Objectif du RDV
- `tags` : Tags pour la recherche (optionnel)

### 6. Vidéos
Gérer les vidéos YouTube et Nexus Circle.

**Champs :**
- `id` : Identifiant unique
- `title` : Titre de la vidéo
- `description` : Description
- `category` : "youtube" ou "nexus"
- `youtubeId` : ID YouTube (pour les vidéos YouTube)
- `url` : URL ou embed personnalisé (pour les vidéos Nexus Circle)
- `tags` : Tags pour la recherche (optionnel)

## Actions Disponibles

### Ajouter un Élément
1. Cliquer sur le bouton "Ajouter" en haut à droite
2. Remplir les champs
3. Cliquer sur "Sauvegarder"

### Modifier un Élément
1. Modifier directement les champs dans l'interface
2. Cliquer sur "Sauvegarder"

### Supprimer un Élément
1. Cliquer sur l'icône poubelle (🗑️) à droite de l'élément
2. Confirmer la suppression
3. Cliquer sur "Sauvegarder"

## Important

⚠️ **Toujours cliquer sur "Sauvegarder" après vos modifications !**

Les modifications ne sont pas automatiques. Vous devez explicitement sauvegarder pour que les changements soient écrits dans les fichiers JSON.

## Déconnexion

Cliquer sur "Déconnexion" en haut à droite pour se déconnecter de l'interface admin.

La session expire après 24 heures d'inactivité.

