# Story 2.3: Filtres animaux

## Description

En tant que visiteur,
Je veux filtrer les animaux par espèce et compatibilité,
Afin de trouver plus facilement un animal qui correspond à ma situation.

## Critères d'acceptation

- [ ] Filtres visibles au-dessus de la grille
- [ ] Filtre par espèce (Tous, Chiens, Chats, Oiseaux, Autres)
- [ ] Filtres par compatibilité (OK enfants, OK chiens, OK chats)
- [ ] Filtres combinables (ex: Chiens + OK enfants)
- [ ] URL mise à jour avec les filtres (`/animaux?species=chien&children=true`)
- [ ] Compteur de résultats affiché

## Tâches techniques

1. Créer `src/components/animals/AnimalFilters.tsx`
2. Mettre à jour `src/services/animalService.ts` :
   - `getFiltered(filters: AnimalFilters): Promise<Animal[]>`
3. Mettre à jour `src/pages/AnimalsPage.tsx` pour gérer les filtres
4. Utiliser `useSearchParams` pour persister les filtres dans l'URL

## Interface des filtres

```typescript
interface AnimalFilters {
  species?: 'chien' | 'chat' | 'oiseau' | 'autre';
  compatibility?: {
    children?: boolean;
    dogs?: boolean;
    cats?: boolean;
  };
}
```

## Maquette simplifiée

```
┌─────────────────────────────────────────────────┐
│ Espèce: [Tous ▼]                                │
│                                                 │
│ ☐ OK avec enfants  ☐ OK avec chiens  ☐ OK chats│
│                                                 │
│ 8 animaux trouvés                               │
└─────────────────────────────────────────────────┘

[Grille des animaux filtrés]
```

## Service - Requête filtrée

```typescript
async getFiltered(filters: AnimalFilters): Promise<Animal[]> {
  let q = query(
    collection(db, 'animals'),
    where('status', '==', 'available')
  );

  if (filters.species) {
    q = query(q, where('species', '==', filters.species));
  }

  if (filters.compatibility?.children) {
    q = query(q, where('compatibility.children', '==', true));
  }
  // etc.

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Animal));
}
```

## Definition of Done

- [ ] Filtres fonctionnent individuellement
- [ ] Filtres combinables
- [ ] URL reflète les filtres actifs
- [ ] Rafraîchir la page conserve les filtres
- [ ] Compteur de résultats correct

## Notes

- Attention aux index Firestore pour les requêtes composées
- Si erreur d'index, Firebase affiche un lien pour le créer
