# Story 2.1: Page d'accueil

## Description

En tant que visiteur,
Je veux voir une page d'accueil accueillante avec les infos essentielles,
Afin de comprendre rapidement ce que propose la SPA et comment agir.

## Critères d'acceptation

- [ ] Hero section avec image/carrousel des lieux
- [ ] Texte de présentation court de la SPA
- [ ] 2 CTA principaux bien visibles : "Adopter un animal" et "Aider la SPA"
- [ ] Section avec compteur d'animaux par catégorie (chiens, chats, etc.)
- [ ] Design responsive (mobile-first)

## Tâches techniques

1. Créer `src/components/home/HeroCarousel.tsx` (ou HeroImage simple pour MVP)
2. Créer `src/components/home/CTASection.tsx`
3. Créer `src/components/categories/CategoryCard.tsx`
4. Implémenter la page `src/pages/HomePage.tsx`
5. Créer le hook `src/hooks/useAnimalsCount.ts` pour compter les animaux par espèce
6. Créer `src/services/animalService.ts` avec la méthode `getCountBySpecies()`

## Maquette simplifiée

```
┌─────────────────────────────────────┐
│         [Image/Carrousel]           │
│     "Bienvenue à la SPA de         │
│         Pontarlier"                 │
└─────────────────────────────────────┘

┌───────────────┐  ┌───────────────┐
│   ADOPTER     │  │   AIDER LA    │
│  UN ANIMAL    │  │     SPA       │
└───────────────┘  └───────────────┘

┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ Chiens │ │ Chats  │ │Oiseaux │ │ Autres │
│   12   │ │   8    │ │   3    │ │   2    │
└────────┘ └────────┘ └────────┘ └────────┘
```

## Definition of Done

- [ ] Page d'accueil affiche toutes les sections
- [ ] CTA redirigent vers les bonnes pages
- [ ] Compteurs affichent les vrais chiffres depuis Firestore
- [ ] Responsive sur mobile

## Notes

- Pour le MVP, une image statique suffit (pas besoin de vrai carrousel)
- Les compteurs nécessitent des données de test dans Firestore
- Ajouter quelques animaux de test manuellement dans Firebase Console
