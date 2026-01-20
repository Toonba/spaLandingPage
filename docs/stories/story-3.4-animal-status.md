# Story 3.4: Gestion statut animal

## Description

En tant qu'admin,
Je veux pouvoir marquer un animal comme adopté,
Afin qu'il n'apparaisse plus dans la liste publique.

## Critères d'acceptation

- [ ] Bouton "Marquer comme adopté" sur la fiche animal (si connecté)
- [ ] Modal de confirmation avant changement
- [ ] L'animal disparaît de la liste publique après confirmation
- [ ] L'animal reste dans Firestore (archivé, pas supprimé)
- [ ] Toast de confirmation

## Tâches techniques

1. Ajouter bouton dans `AnimalDetailPage` (visible si admin)
2. Créer une modal de confirmation simple
3. Compléter `animalService.updateStatus()`
4. Optionnel: bouton "Supprimer définitivement" (avec double confirmation)

## Maquette - Fiche animal (admin connecté)

```
┌─────────────────────────────────────────────────┐
│  Rex - Labrador, 3 ans                          │
│  [...]                                          │
├─────────────────────────────────────────────────┤
│  Actions admin:                                 │
│  [ Modifier ]  [ ✓ Marquer adopté ]  [ 🗑️ ]    │
└─────────────────────────────────────────────────┘
```

## Modal de confirmation

```
┌─────────────────────────────────────────────────┐
│  Confirmer l'adoption                           │
├─────────────────────────────────────────────────┤
│                                                 │
│  Marquer Rex comme adopté ?                     │
│                                                 │
│  Il n'apparaîtra plus dans la liste publique    │
│  mais restera dans la base de données.          │
│                                                 │
│           [ Annuler ]  [ Confirmer ]            │
└─────────────────────────────────────────────────┘
```

## Service

```typescript
async updateStatus(id: string, status: AnimalStatus): Promise<void> {
  await updateDoc(doc(db, 'animals', id), {
    status,
    updatedAt: Timestamp.now(),
  });
}

async delete(id: string): Promise<void> {
  // Supprimer les photos du Storage d'abord
  const animal = await this.getById(id);
  if (animal?.photos) {
    await Promise.all(animal.photos.map(url => storageService.deletePhoto(url)));
  }
  // Puis supprimer le document
  await deleteDoc(doc(db, 'animals', id));
}
```

## Definition of Done

- [ ] Bouton "Marquer adopté" visible si admin
- [ ] Modal de confirmation s'affiche
- [ ] Après confirmation, animal status = "adopted"
- [ ] Animal n'apparaît plus dans liste publique
- [ ] Toast "Rex a été marqué comme adopté"
- [ ] Optionnel: suppression définitive fonctionne

## Notes

- L'archivage (status=adopted) est préféré à la suppression
- Permet de revenir en arrière si erreur
- La suppression définitive devrait avoir une double confirmation
- Les photos Storage devraient aussi être supprimées si suppression définitive
