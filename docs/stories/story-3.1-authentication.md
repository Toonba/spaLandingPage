# Story 3.1: Authentification

## Description

En tant qu'admin de la SPA,
Je veux pouvoir me connecter au site,
Afin d'accéder aux fonctionnalités de gestion.

## Critères d'acceptation

- [ ] Page `/login` avec formulaire email/password
- [ ] Connexion via Firebase Auth
- [ ] Redirection vers la page précédente après connexion
- [ ] Message d'erreur si identifiants incorrects
- [ ] Bouton logout dans la Navbar (si connecté)
- [ ] Toast de confirmation "Connecté en tant qu'admin"

## Tâches techniques

1. Créer `src/services/authService.ts`
2. Compléter `src/context/AuthContext.tsx`
3. Implémenter `src/pages/LoginPage.tsx`
4. Mettre à jour `src/components/layout/Navbar.tsx` (bouton login/logout)
5. Créer `src/components/ui/Toast.tsx` (ou utiliser une lib simple)

## authService

```typescript
// src/services/authService.ts
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

export const authService = {
  login: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),

  logout: () => signOut(auth),

  onAuthStateChanged: (callback: (user: User | null) => void) =>
    onAuthStateChanged(auth, callback),
};
```

## AuthContext complet

```typescript
// src/context/AuthContext.tsx
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await authService.login(email, password);
  };

  const logout = async () => {
    await authService.logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Page Login

```
┌─────────────────────────────────────────────────┐
│              Connexion Admin                    │
├─────────────────────────────────────────────────┤
│                                                 │
│  Email:     [____________________]              │
│                                                 │
│  Password:  [____________________]              │
│                                                 │
│  [Erreur si identifiants incorrects]            │
│                                                 │
│           [ Se connecter ]                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Definition of Done

- [ ] Login fonctionne avec le compte créé dans Firebase
- [ ] Erreurs affichées clairement
- [ ] Après login, redirection + toast "Connecté"
- [ ] Navbar affiche "Déconnexion" si connecté
- [ ] Logout fonctionne et redirige vers l'accueil

## Prérequis

- Compte admin créé manuellement dans Firebase Console :
  - Authentication > Users > Add user
  - Email: admin@spa-pontarlier.fr (ou autre)
  - Password: (choisir un mot de passe fort)
