import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Animal, AnimalCreateInput, AnimalUpdateInput, Species } from '@/types/animal'

const COLLECTION = 'animals'

export const animalService = {
  async getAvailable(): Promise<Animal[]> {
    const q = query(
      collection(db, COLLECTION),
      where('status', '==', 'available'),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      birthDate: doc.data().birthDate?.toDate() || null,
    })) as Animal[]
  },

  async getById(id: string): Promise<Animal | null> {
    const docRef = doc(db, COLLECTION, id)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) return null
    return {
      id: snapshot.id,
      ...snapshot.data(),
      createdAt: snapshot.data().createdAt?.toDate(),
      updatedAt: snapshot.data().updatedAt?.toDate(),
      birthDate: snapshot.data().birthDate?.toDate() || null,
    } as Animal
  },

  async getBySpecies(species: Species): Promise<Animal[]> {
    const q = query(
      collection(db, COLLECTION),
      where('status', '==', 'available'),
      where('species', '==', species),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      birthDate: doc.data().birthDate?.toDate() || null,
    })) as Animal[]
  },

  async getFiltered(filters: {
    species?: Species
    children?: boolean
    dogs?: boolean
    cats?: boolean
  }): Promise<Animal[]> {
    // Start with base query - only available animals
    let q = query(collection(db, COLLECTION), where('status', '==', 'available'))

    // Add species filter
    if (filters.species) {
      q = query(q, where('species', '==', filters.species))
    }

    // Add compatibility filters
    if (filters.children) {
      q = query(q, where('compatibility.children', '==', true))
    }
    if (filters.dogs) {
      q = query(q, where('compatibility.dogs', '==', true))
    }
    if (filters.cats) {
      q = query(q, where('compatibility.cats', '==', true))
    }

    const snapshot = await getDocs(q)
    const animals = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      birthDate: doc.data().birthDate?.toDate() || null,
    })) as Animal[]

    // Sort by createdAt desc (client-side since we can't combine orderBy with multiple where)
    return animals.sort((a, b) => {
      const dateA = a.createdAt?.getTime() || 0
      const dateB = b.createdAt?.getTime() || 0
      return dateB - dateA
    })
  },

  async getCountBySpecies(): Promise<Record<Species, number>> {
    const counts: Record<Species, number> = {
      chien: 0,
      chat: 0,
      oiseau: 0,
      autre: 0,
    }

    const q = query(collection(db, COLLECTION), where('status', '==', 'available'))
    const snapshot = await getDocs(q)

    snapshot.docs.forEach((doc) => {
      const species = doc.data().species as Species
      if (species in counts) {
        counts[species]++
      }
    })

    return counts
  },

  async create(data: AnimalCreateInput): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return docRef.id
  },

  async update(id: string, data: AnimalUpdateInput): Promise<void> {
    const docRef = doc(db, COLLECTION, id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  },

  async updateStatus(id: string, status: 'available' | 'adopted'): Promise<void> {
    const docRef = doc(db, COLLECTION, id)
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    })
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION, id)
    await deleteDoc(docRef)
  },
}
