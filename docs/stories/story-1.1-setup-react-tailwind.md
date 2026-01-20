# Story 1.1: Setup React + Tailwind

## Description

En tant que développeur,
Je veux initialiser le projet avec React, TypeScript et Tailwind CSS,
Afin d'avoir une base de code propre pour commencer le développement.

## Critères d'acceptation

- [ ] Projet créé avec Vite + React + TypeScript
- [ ] Tailwind CSS configuré et fonctionnel
- [ ] Structure de dossiers créée (components/, pages/, services/, etc.)
- [ ] ESLint + Prettier configurés
- [ ] Alias `@/` configuré pour les imports
- [ ] Le projet démarre sans erreur (`npm run dev`)

## Tâches techniques

1. Créer le projet avec `npm create vite@latest . -- --template react-ts`
2. Installer et configurer Tailwind CSS
3. Créer la structure de dossiers :
   ```
   src/
   ├── assets/
   ├── components/
   │   ├── ui/
   │   ├── layout/
   │   └── animals/
   ├── context/
   ├── hooks/
   ├── pages/
   ├── services/
   ├── types/
   └── utils/
   ```
4. Configurer ESLint + Prettier
5. Configurer l'alias `@/` dans vite.config.ts et tsconfig.json
6. Créer un composant test pour vérifier que Tailwind fonctionne

## Commandes utiles

```bash
# Créer le projet
npm create vite@latest . -- --template react-ts

# Installer Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Installer ESLint + Prettier
npm install -D eslint prettier eslint-config-prettier
```

## Definition of Done

- [ ] `npm run dev` démarre sans erreur
- [ ] Une page affiche du texte stylé avec Tailwind
- [ ] `npm run lint` passe sans erreur

## Notes

Référence : `docs/architecture.md` section "Tech Stack" et "Project Structure"
