# Story 3.2: CRUD Animaux

## Description

En tant qu'admin,
Je veux pouvoir ajouter et modifier des animaux,
Afin de maintenir le catalogue à jour.

## Critères d'acceptation

- [ ] Bouton "Ajouter un animal" sur la page `/animaux` (si connecté)
- [ ] Bouton "Modifier" sur chaque AnimalCard (si connecté)
- [ ] Modal avec formulaire complet (création et édition)
- [ ] Validation des champs obligatoires
- [ ] Sauvegarde dans Firestore
- [ ] Feedback de succès/erreur

## Tâches techniques

1. Créer `src/components/animals/AnimalEditModal.tsx`
2. Créer `src/components/ui/Modal.tsx`
3. Créer `src/components/ui/Input.tsx`, `Select.tsx`, `Textarea.tsx`
4. Installer React Hook Form + Zod : `npm install react-hook-form zod @hookform/resolvers`
5. Créer `src/utils/validators.ts` avec le schéma Zod pour Animal
6. Compléter `animalService` avec `create()` et `update()`
7. Mettre à jour `AnimalsPage` et `AnimalCard` pour afficher les boutons admin

## Formulaire AnimalEditModal

```
┌─────────────────────────────────────────────────┐
│  Ajouter un animal  /  Modifier [Nom]      [X] │
├─────────────────────────────────────────────────┤
│                                                 │
│  Nom *:        [____________________]           │
│  Espèce *:     [Chien ▼]                        │
│  Race *:       [____________________]           │
│  Âge *:        [____________________]           │
│  Date naiss.:  [____________________] (optionnel)│
│  Sexe *:       ○ Mâle  ○ Femelle                │
│                                                 │
│  Description:                                   │
│  [                                    ]         │
│  [                                    ]         │
│                                                 │
│  Compatibilités:                                │
│  ☐ OK enfants  ☐ OK chiens  ☐ OK chats  ☐ Autres│
│                                                 │
│  Photos: [Géré dans Story 3.3]                  │
│                                                 │
│           [ Annuler ]  [ Enregistrer ]          │
└─────────────────────────────────────────────────┘
```

## Schéma Zod

```typescript
// src/utils/validators.ts
import { z } from 'zod';

export const animalSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  species: z.enum(['chien', 'chat', 'oiseau', 'autre']),
  breed: z.string().min(1, 'La race est requise'),
  age: z.string().min(1, "L'âge est requis"),
  birthDate: z.date().nullable(),
  gender: z.enum(['male', 'female']),
  description: z.string(),
  compatibility: z.object({
    children: z.boolean(),
    dogs: z.boolean(),
    cats: z.boolean(),
    other_animals: z.boolean(),
  }),
});
```

## Service - create & update

```typescript
async create(data: AnimalCreateInput): Promise<string> {
  const docRef = await addDoc(collection(db, 'animals'), {
    ...data,
    status: 'available',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
},

async update(id: string, data: Partial<AnimalCreateInput>): Promise<void> {
  await updateDoc(doc(db, 'animals', id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
},
```

## Definition of Done

- [ ] Bouton "Ajouter" visible uniquement si connecté
- [ ] Bouton "Modifier" sur les cartes si connecté
- [ ] Modal s'ouvre en création ou édition
- [ ] Validation fonctionne (champs requis)
- [ ] Sauvegarde crée/modifie dans Firestore
- [ ] Toast de succès après sauvegarde
- [ ] Liste se rafraîchit après modification

## Notes

- Les photos sont gérées dans Story 3.3 (upload séparé)
- Pour l'instant, laisser le champ photos vide ou avec un placeholder
