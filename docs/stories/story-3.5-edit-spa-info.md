# Story 3.5: Édition infos SPA

## Description

En tant qu'admin,
Je veux pouvoir modifier les informations de la SPA,
Afin de maintenir les horaires et contacts à jour.

## Critères d'acceptation

- [ ] Bouton "Modifier" sur les pages Adoption et Aider (si connecté)
- [ ] Modal avec formulaire d'édition des infos SPA
- [ ] Modification des horaires d'ouverture
- [ ] Modification des coordonnées (adresse, téléphone, email)
- [ ] Modification des textes (description, procédure adoption, comment aider)
- [ ] Sauvegarde dans Firestore

## Tâches techniques

1. Créer `src/components/spa/SpaInfoEditModal.tsx`
2. Compléter `spaInfoService.update()`
3. Ajouter bouton "Modifier" dans `AdoptionPage` et `HelpPage`

## Formulaire SpaInfoEditModal

```
┌─────────────────────────────────────────────────┐
│  Modifier les informations               [X]   │
├─────────────────────────────────────────────────┤
│                                                 │
│  Informations générales                         │
│  ─────────────────────                          │
│  Nom:      [SPA de Pontarlier         ]         │
│  Adresse:  [_________________________ ]         │
│  Tél:      [03.81.46.40.64           ]         │
│  Email:    [contact@spa-pontarlier.fr]         │
│                                                 │
│  Horaires d'ouverture                           │
│  ─────────────────────                          │
│  Lundi:    [Fermé                    ]         │
│  Mardi:    [14h-17h                  ]         │
│  Mercredi: [14h-17h                  ]         │
│  Jeudi:    [14h-17h                  ]         │
│  Vendredi: [14h-17h                  ]         │
│  Samedi:   [14h-17h                  ]         │
│  Dimanche: [Fermé                    ]         │
│                                                 │
│  Textes                                         │
│  ─────────────────────                          │
│  Présentation:                                  │
│  [                                    ]         │
│                                                 │
│  Procédure adoption:                            │
│  [                                    ]         │
│                                                 │
│  Comment aider:                                 │
│  [                                    ]         │
│                                                 │
│           [ Annuler ]  [ Enregistrer ]          │
└─────────────────────────────────────────────────┘
```

## Service

```typescript
// src/services/spaInfoService.ts
async update(data: SpaInfoUpdateInput): Promise<void> {
  await updateDoc(doc(db, 'spaInfo', 'main'), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}
```

## Definition of Done

- [ ] Bouton "Modifier" visible si admin sur pages Adoption et Aider
- [ ] Modal s'ouvre avec les données actuelles pré-remplies
- [ ] Tous les champs sont modifiables
- [ ] Sauvegarde met à jour Firestore
- [ ] Les pages affichent les nouvelles données après sauvegarde
- [ ] Toast de confirmation

## Notes

- Les textes longs peuvent être en Markdown (mais affichage simple pour MVP)
- Si Markdown, utiliser une lib simple comme `react-markdown` pour l'affichage
- Pour MVP, le texte brut avec retours à la ligne suffit
