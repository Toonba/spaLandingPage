# Story 2.2: Liste des animaux

## Description

En tant que visiteur,
Je veux voir la liste de tous les animaux disponibles à l'adoption,
Afin de trouver un compagnon qui me correspond.

## Critères d'acceptation

- [ ] Page `/animaux` affiche une grille de cartes
- [ ] Chaque carte montre : photo, nom, race, âge
- [ ] Seuls les animaux avec `status: "available"` sont affichés
- [ ] Animaux triés du plus récent au plus ancien
- [ ] État de chargement visible (spinner)
- [ ] Message si aucun animal disponible

## Tâches techniques

1. Créer les types `src/types/animal.ts` (si pas déjà fait)
2. Compléter `src/services/animalService.ts` :
   - `getAvailable(): Promise<Animal[]>`
3. Créer `src/components/animals/AnimalCard.tsx`
4. Créer `src/components/animals/AnimalGrid.tsx`
5. Créer `src/components/ui/Spinner.tsx`
6. Implémenter `src/pages/AnimalsPage.tsx`
7. Créer le hook `src/hooks/useAnimals.ts`

## Composant AnimalCard

```typescript
// Props
interface AnimalCardProps {
  animal: Animal;
}

// Affichage
- Photo principale (mainPhoto)
- Nom
- Race + âge ("Labrador • 3 ans")
- Badges de compatibilité (optionnel MVP)
- Lien vers /animaux/:id
```

## Service animalService

```typescript
// src/services/animalService.ts
export const animalService = {
  async getAvailable(): Promise<Animal[]> {
    const q = query(
      collection(db, 'animals'),
      where('status', '==', 'available'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Animal));
  },
};
```

## Definition of Done

- [ ] Page affiche les animaux depuis Firestore
- [ ] Cartes cliquables mènent vers la fiche détail
- [ ] Spinner pendant le chargement
- [ ] Message "Aucun animal disponible" si liste vide
- [ ] Responsive (1 colonne mobile, 2-3 colonnes desktop)

## Données de test

Créer 5-10 animaux de test dans Firestore avec :
- Différentes espèces (chien, chat, oiseau)
- Photos placeholder (utiliser https://placedog.net ou similaire)
- Différents statuts (available, adopted)
