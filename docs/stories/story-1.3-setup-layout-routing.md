# Story 1.3: Setup Layout & Routing

## Description

En tant que développeur,
Je veux mettre en place la navigation et le layout de base,
Afin d'avoir une structure cohérente pour toutes les pages.

## Critères d'acceptation

- [ ] React Router installé et configuré
- [ ] Toutes les routes définies (même avec pages placeholder)
- [ ] Navbar avec liens de navigation
- [ ] Footer avec infos de contact basiques
- [ ] AuthContext créé (même si login pas encore implémenté)
- [ ] Layout responsive (mobile-first)

## Tâches techniques

1. Installer React Router : `npm install react-router-dom`
2. Créer les composants layout :
   - `src/components/layout/Navbar.tsx`
   - `src/components/layout/Footer.tsx`
   - `src/components/layout/Container.tsx`
3. Créer `src/context/AuthContext.tsx`
4. Créer les pages placeholder :
   - `src/pages/HomePage.tsx`
   - `src/pages/AnimalsPage.tsx`
   - `src/pages/AnimalDetailPage.tsx`
   - `src/pages/AdoptionPage.tsx`
   - `src/pages/HelpPage.tsx`
   - `src/pages/LoginPage.tsx`
   - `src/pages/NotFoundPage.tsx`
5. Configurer les routes dans `src/App.tsx`
6. Ajouter les liens de navigation dans Navbar

## Structure des routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Page d'accueil |
| `/animaux` | AnimalsPage | Liste des animaux |
| `/animaux/:id` | AnimalDetailPage | Fiche d'un animal |
| `/adoption` | AdoptionPage | Procédure d'adoption |
| `/aider` | HelpPage | Comment aider la SPA |
| `/login` | LoginPage | Connexion admin |
| `*` | NotFoundPage | Page 404 |

## Navbar - Liens

```
[Logo SPA] | Accueil | Adopter | Aider | [Login icon si pas connecté / Logout si connecté]
```

## Footer - Contenu

```
SPA Pontarlier
Adresse | Téléphone | Horaires
```

## Definition of Done

- [ ] Navigation entre toutes les pages fonctionne
- [ ] Navbar visible sur toutes les pages
- [ ] Footer visible sur toutes les pages
- [ ] Responsive : menu hamburger sur mobile (optionnel MVP)
- [ ] Pages placeholder affichent leur nom

## Notes

- Les pages sont des placeholders pour l'instant (juste un titre)
- Le AuthContext retourne `user: null` pour l'instant
- Le style peut rester basique, on affinera plus tard
