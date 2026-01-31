# Story 4.3: Onglets Page Animaux

## Description

En tant que visiteur,
Je veux naviguer entre les chiens, chats et autres animaux via des onglets,
Afin de trouver rapidement le type d'animal qui m'intéresse.

## Critères d'acceptation

- [x] Page `/animaux` affiche des onglets au lieu de cartes catégories
- [x] Onglets disponibles : `Chiens | Chats | Autre`
- [x] Onglet "Autre" affiché uniquement si des animaux de type "autre" existent
- [x] Cliquer sur un onglet filtre la liste des animaux
- [x] URL synchronisée avec l'onglet actif (`/animaux?species=chien`)
- [x] L'onglet "Chiens" est actif par défaut
- [x] Les filtres existants (compatibilités) restent fonctionnels

## Tâches techniques

1. Modifier `src/pages/AnimalsPage.tsx` pour utiliser le composant Tabs
2. Réutiliser le composant `src/components/ui/Tabs.tsx` (créé en story 4.1)
3. Modifier le hook `useAnimals` pour gérer le filtre par espèce
4. Supprimer l'espèce "oiseau" du type `Species` dans `src/types/animal.ts`
5. Implémenter la logique d'affichage conditionnel de l'onglet "Autre"
6. Synchroniser l'onglet actif avec les query params URL

## Modification Data Model

```typescript
// src/types/animal.ts

// AVANT
export type Species = "chien" | "chat" | "oiseau" | "autre";

// APRÈS
export type Species = "chien" | "chat" | "autre";
```

## Logique d'affichage conditionnel

```typescript
// Dans AnimalsPage.tsx

const { animals } = useAnimals();

// Compter les animaux par espèce
const counts = {
  chien: animals.filter((a) => a.species === "chien").length,
  chat: animals.filter((a) => a.species === "chat").length,
  autre: animals.filter((a) => a.species === "autre").length,
};

// Construire les onglets dynamiquement
const tabs = [
  { id: "chien", label: `Chiens (${counts.chien})`, show: true },
  { id: "chat", label: `Chats (${counts.chat})`, show: true },
  { id: "autre", label: `Autres (${counts.autre})`, show: counts.autre > 0 },
].filter((tab) => tab.show);
```

## Maquette simplifiée

```
┌─────────────────────────────────────────────────────┐
│               NOS ANIMAUX                           │
├─────────────────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────┐  │
│  │ Chiens (12)  │ │  Chats (8)   │ │ Autres (2)  │  │
│  └──────────────┘ └──────────────┘ └─────────────┘  │
│       ▲ actif                        (conditionnel) │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Filtres: [ ] OK enfants [ ] OK chiens [ ] OK chats │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │ 🐕 Rex  │  │ 🐕 Luna │  │ 🐕 Max  │  ...        │
│  │ 3 ans   │  │ 2 ans   │  │ 5 ans   │             │
│  └─────────┘  └─────────┘  └─────────┘             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Comportement URL

| Action                    | URL résultante                         |
| ------------------------- | -------------------------------------- |
| Arrivée sur `/animaux`    | `/animaux?species=chien` (défaut)      |
| Clic sur "Chats"          | `/animaux?species=chat`                |
| Clic sur "Autres"         | `/animaux?species=autre`               |
| Avec filtre compatibilité | `/animaux?species=chien&children=true` |

## Definition of Done

- [x] Les 3 onglets sont affichés (Autre conditionnel)
- [x] Le compteur d'animaux s'affiche sur chaque onglet
- [x] Le filtre par espèce fonctionne correctement
- [x] L'onglet "Autre" n'apparaît que s'il y a des animaux
- [x] L'URL reflète l'onglet actif
- [x] Les filtres de compatibilité fonctionnent toujours
- [x] Espèce "oiseau" supprimée du code
- [x] Responsive sur mobile

## Notes

- Cette story remplace le système de cartes catégories par des onglets
- Le composant Tabs est partagé avec la page À propos (story 4.1)
- Si aucun animal "autre" n'existe, seuls 2 onglets sont affichés
- Les règles Firestore n'ont pas besoin d'être modifiées

## Dépendances

- Story 4.1 (composant Tabs) doit être terminée
- Stories 2.2 et 2.3 (liste et filtres animaux) doivent exister

## Impact sur stories existantes

- **Story 2.2** (Liste animaux) : Cette story la modifie/remplace partiellement
- **Story 2.3** (Filtres) : Les filtres sont conservés et intégrés aux onglets

## Dev Agent Record

### Status

Ready for Review

### Agent Model Used

Claude Opus 4.5

### File List

- `src/pages/AnimalsPage.tsx` (modified - replaced species select with Tabs)
- `src/components/ui/Tabs.tsx` (modified - added controlled mode with activeTab/onTabChange)
- `src/components/animals/AnimalFilters.tsx` (modified - species dropdown hidden when not in filters)
- `src/types/animal.ts` (modified - removed "oiseau" from Species)
- `src/hooks/useAnimalsCount.ts` (modified - removed "oiseau")
- `src/services/animalService.ts` (modified - removed "oiseau" from counts)
- `src/utils/validators.ts` (modified - removed "oiseau" from zod schema)
- `src/utils/formatters.ts` (modified - removed "oiseau" from labels)
- `src/components/categories/CategoryCard.tsx` (modified - removed "oiseau" icons/colors)

### Change Log

- Added controlled mode to Tabs component (activeTab + onTabChange props)
- Replaced species dropdown in AnimalsPage with Tabs (Chiens/Chats/Autres)
- Tab "Autres" only shown when counts.autre > 0
- URL synced with active tab via searchParams
- Removed "oiseau" species from all files (type, labels, validators, service, formatters, CategoryCard)
- Species dropdown in AnimalFilters hidden when species not in filters (tabs handle it)

### Debug Log References

N/A

### Completion Notes

- All 6 technical tasks completed
- TypeScript compilation passes
- Tabs component now supports both uncontrolled (AboutPage, HelpPage) and controlled (AnimalsPage) usage
