# Story 3.3: Upload Photos

## Description

En tant qu'admin,
Je veux pouvoir ajouter des photos aux fiches animaux,
Afin de présenter visuellement les animaux aux visiteurs.

## Critères d'acceptation

- [ ] Composant d'upload multi-photos dans le formulaire animal
- [ ] Preview des photos avant upload
- [ ] Compression automatique des images (max 1MB)
- [ ] Upload vers Firebase Storage
- [ ] Possibilité de supprimer une photo
- [ ] Définir la photo principale (première = principale)

## Tâches techniques

1. Installer la lib de compression : `npm install browser-image-compression`
2. Créer `src/services/storageService.ts`
3. Créer `src/components/animals/PhotoUploader.tsx`
4. Intégrer PhotoUploader dans AnimalEditModal
5. Mettre à jour `animalService.create/update` pour gérer les photos

## storageService

```typescript
// src/services/storageService.ts
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
import imageCompression from 'browser-image-compression';

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export const storageService = {
  async uploadPhoto(file: File, animalId: string): Promise<string> {
    // Compresser l'image
    const compressed = await imageCompression(file, compressionOptions);

    // Générer un nom unique
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `animals/${animalId}/${fileName}`);

    // Upload
    await uploadBytes(storageRef, compressed);

    // Retourner l'URL
    return getDownloadURL(storageRef);
  },

  async deletePhoto(url: string): Promise<void> {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  },
};
```

## Composant PhotoUploader

```typescript
interface PhotoUploaderProps {
  photos: string[];              // URLs existantes
  onChange: (photos: string[]) => void;
  animalId?: string;            // Pour le path storage
  maxPhotos?: number;           // Défaut: 5
}
```

## Maquette

```
┌─────────────────────────────────────────────────┐
│  Photos                                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│  │ 📷  │ │ 📷  │ │ 📷  │ │     │ │  +  │      │
│  │ [x] │ │ [x] │ │ [x] │ │     │ │     │      │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘      │
│   ★                                             │
│  (★ = photo principale)                         │
│                                                 │
│  Glisser pour réordonner (optionnel)           │
└─────────────────────────────────────────────────┘
```

## Flow d'upload

1. User sélectionne des fichiers
2. Preview immédiat (URL.createObjectURL)
3. Au clic "Enregistrer" du formulaire :
   - Upload des nouvelles photos vers Storage
   - Récupération des URLs
   - Sauvegarde des URLs dans Firestore avec les autres données

## Definition of Done

- [ ] Peut ajouter jusqu'à 5 photos
- [ ] Preview avant sauvegarde
- [ ] Compression automatique (vérifiable: fichier < 1MB)
- [ ] Photos uploadées dans Storage au bon path
- [ ] URLs sauvegardées dans le document Firestore
- [ ] Peut supprimer une photo existante
- [ ] Première photo = mainPhoto

## Notes

- Pour un nouvel animal, générer un ID temporaire pour le path storage
- Ou uploader les photos seulement après création du document
- Gérer le cas d'erreur d'upload (retry ou message d'erreur)
