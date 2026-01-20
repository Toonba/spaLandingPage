# Story 2.4: Fiche animal

## Description

En tant que visiteur,
Je veux voir les détails complets d'un animal,
Afin de mieux le connaître avant de décider de l'adopter.

## Critères d'acceptation

- [ ] Page `/animaux/:id` affiche la fiche complète
- [ ] Galerie photos (ou carrousel simple)
- [ ] Informations : nom, espèce, race, âge, sexe
- [ ] Description/histoire de l'animal
- [ ] Badges de compatibilité (enfants, chiens, chats, autres animaux)
- [ ] Bouton "Comment adopter ?" vers la page adoption
- [ ] Gestion du cas "animal non trouvé" (404)

## Tâches techniques

1. Compléter `src/services/animalService.ts` :
   - `getById(id: string): Promise<Animal | null>`
2. Créer `src/components/animals/AnimalGallery.tsx`
3. Créer `src/components/animals/CompatibilityBadges.tsx`
4. Implémenter `src/pages/AnimalDetailPage.tsx`
5. Créer `src/utils/formatters.ts` pour `formatAge()`, `formatGender()`

## Maquette simplifiée

```
┌─────────────────────────────────────────────────┐
│ ← Retour aux animaux                            │
├─────────────────────────────────────────────────┤
│ ┌─────────────┐  Nom: Rex                       │
│ │             │  Race: Labrador                 │
│ │   [Photo]   │  Âge: 3 ans                     │
│ │             │  Sexe: Mâle                     │
│ └─────────────┘                                 │
│ [o] [o] [o]      ← miniatures autres photos     │
├─────────────────────────────────────────────────┤
│ Compatibilités:                                 │
│ ✓ Enfants  ✓ Chiens  ✗ Chats  ✓ Autres animaux │
├─────────────────────────────────────────────────┤
│ Son histoire:                                   │
│ Rex est arrivé à la SPA en janvier 2026...      │
│ C'est un chien très affectueux qui adore...     │
├─────────────────────────────────────────────────┤
│        [ Comment adopter Rex ? ]                │
└─────────────────────────────────────────────────┘
```

## Service

```typescript
async getById(id: string): Promise<Animal | null> {
  const docSnap = await getDoc(doc(db, 'animals', id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Animal;
}
```

## Definition of Done

- [ ] Fiche affiche toutes les infos de l'animal
- [ ] Galerie photos fonctionne (clic pour agrandir optionnel)
- [ ] Badges de compatibilité clairs (icônes ou texte)
- [ ] Bouton CTA vers page adoption
- [ ] Page 404 si animal non trouvé
- [ ] Responsive

## Notes

- Si l'animal n'a qu'une photo, pas besoin de galerie (juste l'image)
- Le bouton "Comment adopter" peut inclure le nom de l'animal
