# Story 4.2: Enrichissement Page Aider

## Description

En tant que visiteur,
Je veux découvrir toutes les façons d'aider la SPA (balades, bénévolat, dons, aides financières),
Afin de choisir comment contribuer selon mes possibilités.

## Critères d'acceptation

- [ ] Section Balades mise en avant (en haut de page)
- [ ] Section Bénévolat avec titre, sous-titre et 5 paragraphes
- [ ] Section Aides financières détaillée
- [ ] Section Dons (existante, à conserver)
- [ ] Section Contact & Horaires (doublon du footer, pour le contexte)
- [ ] Contenu statique (pas d'édition admin pour les nouvelles sections)

## Tâches techniques

1. Modifier `src/pages/HelpPage.tsx` pour ajouter les nouvelles sections
2. Créer fichier de contenu statique `src/data/helpContent.ts`
3. Réorganiser l'ordre des sections (Balades en premier)
4. Conserver l'intégration avec `useSpaInfo` pour contact/horaires

## Structure de la page révisée

```
/aider
├── 1. Section Balades (mise en avant)
│   └── Titre + description + incitation à participer
├── 2. Section Bénévolat
│   ├── Titre: "Comment devenir bénévole"
│   ├── Sous-titre
│   └── 5 paragraphes
├── 3. Section Aides financières
│   └── Explication des moyens de soutien financier
├── 4. Section Dons matériels (existante)
│   └── Liste des dons acceptés
└── 5. Section Contact & Horaires
    └── Infos depuis spaInfo (éditable admin)
```

## Structure du contenu statique

```typescript
// src/data/helpContent.ts

export const walksContent = {
  title: "Balades avec nos chiens",
  description: `
    Vous souhaitez passer du temps avec nos pensionnaires ?
    Les balades sont une excellente façon de nous aider tout en
    découvrant nos chiens dans un autre contexte que le refuge.
  `,
  cta: "Contactez-nous pour participer aux prochaines balades !"
};

export const volunteerContent = {
  title: "Comment devenir bénévole",
  subtitle: "Sous-titre à remplir depuis scraping",
  paragraphs: [
    "Paragraphe 1 (à remplir depuis scraping)",
    "Paragraphe 2",
    "Paragraphe 3",
    "Paragraphe 4",
    "Paragraphe 5",
  ]
};

export const financialAidContent = {
  title: "Aides financières",
  description: "Description des moyens de soutien financier",
  // Structure à affiner selon le contenu scrapé
};

export const donationsContent = {
  title: "Dons matériels",
  intro: "Nous acceptons les dons suivants :",
  items: [
    "Croquettes et pâtées",
    "Couvertures et paniers",
    "Jouets pour animaux",
    "Produits d'entretien"
  ]
};
```

## Maquette simplifiée

```
┌─────────────────────────────────────────────────────┐
│                 AIDER LA SPA                        │
├─────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────┐  │
│  │  🐕 BALADES AVEC NOS CHIENS                   │  │
│  │                                               │  │
│  │  Participez aux balades et découvrez nos      │  │
│  │  pensionnaires ! [En savoir plus]             │  │
│  └───────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🤝 COMMENT DEVENIR BÉNÉVOLE                        │
│  ─────────────────────────────                      │
│  Sous-titre explicatif                              │
│                                                     │
│  Paragraphe 1...                                    │
│  Paragraphe 2...                                    │
│  Paragraphe 3...                                    │
│  Paragraphe 4...                                    │
│  Paragraphe 5...                                    │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  💰 AIDES FINANCIÈRES                               │
│  ────────────────────                               │
│  [Contenu sur les dons financiers]                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📦 DONS MATÉRIELS                                  │
│  ────────────────                                   │
│  • Croquettes et pâtées                             │
│  • Couvertures et paniers                           │
│  • Jouets pour animaux                              │
│  • Produits d'entretien                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📍 NOUS CONTACTER                                  │
│  ────────────────                                   │
│  Adresse | Téléphone | Email | Horaires             │
│  (données depuis spaInfo - éditable admin)          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Definition of Done

- [ ] Section Balades visible en haut de page, mise en avant visuellement
- [ ] Section Bénévolat affiche titre, sous-titre et 5 paragraphes
- [ ] Section Aides financières présente
- [ ] Section Dons matériels conservée
- [ ] Section Contact affiche les infos depuis Firestore
- [ ] Responsive sur mobile
- [ ] Contenu placeholder en attendant le scraping

## Notes

- La section Balades doit être visuellement différenciée (card, couleur de fond, etc.)
- Les sections Bénévolat et Aides financières sont du contenu statique
- La section Contact reste dynamique (depuis `spaInfo`)
- Le contenu sera finalisé après le scraping (story 4.4)

## Dépendances

- Story 2.6 (Page Aider existante) doit exister
- Story 4.4 (scraping) fournira le contenu définitif

## Impact sur story 2.6

Cette story **enrichit** la story 2.6 existante. Les critères d'acceptation de 2.6 restent valides, cette story ajoute du contenu supplémentaire.
