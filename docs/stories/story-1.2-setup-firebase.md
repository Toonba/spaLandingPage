# Story 1.2: Setup Firebase

## Description

En tant que développeur,
Je veux configurer Firebase (Firestore, Auth, Storage, Hosting),
Afin de pouvoir stocker les données et déployer l'application.

## Critères d'acceptation

- [ ] Projet Firebase créé dans la console Firebase
- [ ] Firebase SDK installé et configuré dans le projet React
- [ ] Variables d'environnement configurées (.env.local)
- [ ] Firestore rules déployées
- [ ] Storage rules déployées
- [ ] Premier déploiement test effectué
- [ ] URL de démo accessible (https://xxx.web.app)

## Tâches techniques

1. Créer le projet dans Firebase Console (région europe-west1)
2. Activer Firestore, Authentication (email/password), Storage, Hosting
3. Installer Firebase SDK : `npm install firebase`
4. Créer `src/services/firebase.ts` avec la config
5. Créer `.env.local` avec les variables Firebase
6. Créer `.env.example` (template sans valeurs sensibles)
7. Créer `firestore.rules` avec les règles de sécurité
8. Créer `storage.rules` avec les règles de sécurité
9. Créer `firebase.json` pour la config CLI
10. Installer Firebase CLI : `npm install -g firebase-tools`
11. Se connecter : `firebase login`
12. Lier le projet : `firebase use --add`
13. Déployer les rules : `firebase deploy --only firestore,storage`
14. Faire un build et déployer : `npm run build && firebase deploy --only hosting`
15. Vérifier l'URL de démo

## Fichiers à créer

### src/services/firebase.ts
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
```

### firestore.rules
Voir `docs/architecture.md` section "Firestore Security Rules"

### storage.rules
Voir `docs/architecture.md` section "Firebase Storage Rules"

## Definition of Done

- [ ] Firebase connecté (pas d'erreur console)
- [ ] URL de démo accessible et affiche le site
- [ ] Rules déployées (vérifiable dans Firebase Console)

## Notes

- Créer le compte admin manuellement dans Firebase Console > Authentication
- L'URL de démo sera : `https://<project-id>.web.app`
- Cette URL peut être partagée pour les démos avant la mise en production finale
