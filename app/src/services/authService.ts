import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from './firebase'

export const authService = {
  login: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),

  logout: () => signOut(auth),

  onAuthStateChanged: (callback: (user: User | null) => void) =>
    onAuthStateChanged(auth, callback),
}
