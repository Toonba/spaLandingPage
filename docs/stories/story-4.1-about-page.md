# Story 4.1: Page À propos

## Description

En tant que visiteur,
Je veux découvrir l'histoire et les actions de la SPA de Pontarlier,
Afin de mieux connaître l'association et ses engagements.

## Critères d'acceptation

- [x] Page `/a-propos` accessible depuis la navigation
- [x] Navigation par onglets : Historique | Nos Actions | Partenaires
- [x] Onglet Historique affiche 7 paragraphes
- [x] Onglet Nos Actions affiche les actions menées par la SPA
- [x] Onglet Partenaires affiche le(s) partenaire(s) avec logo si disponible
- [x] Design responsive (onglets empilés ou dropdown sur mobile)
- [x] Contenu statique (pas d'édition admin)

## Tâches techniques

1. Créer `src/pages/AboutPage.tsx`
2. Créer composant `src/components/ui/Tabs.tsx` (réutilisable)
3. Créer fichier de contenu statique `src/data/aboutContent.ts`
4. Ajouter route `/a-propos` dans `App.tsx`
5. Ajouter lien dans la navigation (Navbar)

## Structure du contenu statique

```typescript
// src/data/aboutContent.ts

export const historyContent = {
  title: "Notre Histoire",
  paragraphs: [
    "Paragraphe 1 (à remplir depuis scraping)",
    "Paragraphe 2",
    "Paragraphe 3",
    "Paragraphe 4",
    "Paragraphe 5",
    "Paragraphe 6",
    "Paragraphe 7",
  ]
};

export const actionsContent = {
  title: "Nos Actions",
  description: "Description des actions menées par la SPA",
  items: [
    {
      title: "Action 1",
      description: "Description de l'action"
    },
    // ...
  ]
};

export const partnersContent = {
  title: "Nos Partenaires",
  partners: [
    {
      name: "Nom du partenaire",
      logo: "/images/partners/partner-1.png", // optionnel
      url: "https://...", // optionnel
      description: "Description courte" // optionnel
    }
  ]
};
```

## Maquette simplifiée

```
┌─────────────────────────────────────────────────────┐
│                    À PROPOS                         │
├─────────────────────────────────────────────────────┤
│  ┌────────────┐ ┌─────────────┐ ┌─────────────┐     │
│  │ Historique │ │ Nos Actions │ │ Partenaires │     │
│  └────────────┘ └─────────────┘ └─────────────┘     │
│       ▲ actif                                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Notre Histoire                                     │
│  ─────────────                                      │
│                                                     │
│  Paragraphe 1...                                    │
│                                                     │
│  Paragraphe 2...                                    │
│                                                     │
│  [... 7 paragraphes au total]                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Composant Tabs (réutilisable)

```typescript
// src/components/ui/Tabs.tsx

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  // État pour l'onglet actif
  // Rendu des boutons d'onglets
  // Rendu du contenu de l'onglet actif
}
```

## Definition of Done

- [x] Page accessible à `/a-propos`
- [x] Les 3 onglets fonctionnent correctement
- [x] Le contenu s'affiche pour chaque onglet
- [x] Navigation clavier accessible (arrows, tab, enter)
- [x] Responsive : onglets adaptés au mobile
- [x] Lien ajouté dans la navbar
- [x] Contenu placeholder en attendant le scraping

## Notes

- Le contenu sera rempli après exécution du script de scraping (story 4.4)
- En attendant, utiliser du contenu placeholder
- Le composant Tabs sera réutilisé pour la page Animaux (story 4.3)
- Pas de gestion admin pour cette page (contenu statique)

## Dépendances

- Aucune dépendance bloquante
- Le composant Tabs sera réutilisé par story 4.3

## Dev Agent Record

### Status
Ready for Review

### Agent Model Used
Claude Opus 4.5

### File List
- `src/pages/AboutPage.tsx` (created)
- `src/components/ui/Tabs.tsx` (created)
- `src/data/aboutContent.ts` (created)
- `src/App.tsx` (modified - added route)
- `src/components/layout/Navbar.tsx` (modified - added nav link)

### Change Log
- Implemented AboutPage with 3 tab sections (Historique, Nos Actions, Partenaires)
- Created reusable Tabs component with keyboard navigation (ArrowLeft/Right)
- Created static placeholder content in aboutContent.ts
- Added `/a-propos` route in App.tsx
- Added "À propos" link in Navbar

### Debug Log References
N/A

### Completion Notes
- All 5 technical tasks completed
- TypeScript compilation passes with no errors
- ESLint passes with no errors
- No test framework configured in project; manual verification recommended
- Content is placeholder; will be replaced after scraping (story 4.4)
