# Story 4.3: Onglets Page Animaux

## Description

En tant que visiteur,
Je veux naviguer entre les chiens, chats et autres animaux via des onglets,
Afin de trouver rapidement le type d'animal qui m'intéresse.

## Critères d'acceptation

- [ ] Page `/animaux` affiche des onglets au lieu de cartes catégories
- [ ] Onglets disponibles : `Chiens | Chats | Autre`
- [ ] Onglet "Autre" affiché uniquement si des animaux de type "autre" existent
- [ ] Cliquer sur un onglet filtre la liste des animaux
- [ ] URL synchronisée avec l'onglet actif (`/animaux?species=chien`)
- [ ] L'onglet "Chiens" est actif par défaut
- [ ] Les filtres existants (compatibilités) restent fonctionnels

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
export type Species = 'chien' | 'chat' | 'oiseau' | 'autre';

// APRÈS
export type Species = 'chien' | 'chat' | 'autre';
```

## Logique d'affichage conditionnel

```typescript
// Dans AnimalsPage.tsx

const { animals } = useAnimals();

// Compter les animaux par espèce
const counts = {
  chien: animals.filter(a => a.species === 'chien').length,
  chat: animals.filter(a => a.species === 'chat').length,
  autre: animals.filter(a => a.species === 'autre').length,
};

// Construire les onglets dynamiquement
const tabs = [
  { id: 'chien', label: `Chiens (${counts.chien})`, show: true },
  { id: 'chat', label: `Chats (${counts.chat})`, show: true },
  { id: 'autre', label: `Autres (${counts.autre})`, show: counts.autre > 0 },
].filter(tab => tab.show);
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

| Action | URL résultante |
|--------|----------------|
| Arrivée sur `/animaux` | `/animaux?species=chien` (défaut) |
| Clic sur "Chats" | `/animaux?species=chat` |
| Clic sur "Autres" | `/animaux?species=autre` |
| Avec filtre compatibilité | `/animaux?species=chien&children=true` |

## Definition of Done

- [ ] Les 3 onglets sont affichés (Autre conditionnel)
- [ ] Le compteur d'animaux s'affiche sur chaque onglet
- [ ] Le filtre par espèce fonctionne correctement
- [ ] L'onglet "Autre" n'apparaît que s'il y a des animaux
- [ ] L'URL reflète l'onglet actif
- [ ] Les filtres de compatibilité fonctionnent toujours
- [ ] Espèce "oiseau" supprimée du code
- [ ] Responsive sur mobile

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
