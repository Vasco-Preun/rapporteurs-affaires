# Correction de la Mise en Forme

Si les styles TailwindCSS ne s'appliquent pas, suivez ces étapes :

## 1. Vérifier l'installation

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

## 2. Vérifier les fichiers de configuration

Assurez-vous que ces fichiers existent :
- ✅ `tailwind.config.ts`
- ✅ `postcss.config.js`
- ✅ `app/globals.css` (avec `@tailwind` directives)
- ✅ `app/layout.tsx` (avec `import "./globals.css"`)

## 3. Redémarrer le serveur

**IMPORTANT** : Après toute modification de configuration, redémarrez le serveur :

```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

## 4. Vider le cache Next.js

```bash
# Supprimer le cache Next.js
rm -rf .next
npm run dev
```

## 5. Vérifier dans le navigateur

1. Ouvrir les outils de développement (F12)
2. Onglet "Console" - vérifier les erreurs
3. Onglet "Network" - vérifier que `globals.css` est chargé
4. Onglet "Elements" - inspecter un élément et vérifier que les classes Tailwind sont appliquées

## 6. Si ça ne fonctionne toujours pas

Vérifier que le fichier `app/globals.css` contient bien :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Et que `app/layout.tsx` importe ce fichier :

```tsx
import "./globals.css";
```

## Solution Rapide

```bash
# Commande complète de réinitialisation
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

Puis ouvrir http://localhost:3000 et vérifier que les styles sont appliqués.

