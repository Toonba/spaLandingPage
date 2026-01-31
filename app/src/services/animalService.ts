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
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Animal, AnimalCreateInput, AnimalUpdateInput, Species, AnimalStatus } from '@/types/animal'

const COLLECTION = 'animals'

// Sort animals: available first, then reserved, then sponsorship at the end
function sortAnimals(animals: Animal[]): Animal[] {
  const statusOrder: Record<string, number> = {
    available: 0,
    reserved: 1,
    sponsorship: 2,
    adopted: 3,
  }

  return animals.sort((a, b) => {
    // First sort by status
    const statusDiff = (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
    if (statusDiff !== 0) return statusDiff

    // Then by createdAt desc
    const dateA = a.createdAt?.getTime() || 0
    const dateB = b.createdAt?.getTime() || 0
    return dateB - dateA
  })
}

export const animalService = {
  async getAvailable(): Promise<Animal[]> {
    const q = query(
      collection(db, COLLECTION),
      where('status', 'in', ['available', 'reserved', 'sponsorship'])
    )
    const snapshot = await getDocs(q)
    const animals = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      birthDate: doc.data().birthDate?.toDate() || null,
    })) as Animal[]

    return sortAnimals(animals)
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
      where('status', 'in', ['available', 'reserved', 'sponsorship']),
      where('species', '==', species)
    )
    const snapshot = await getDocs(q)
    const animals = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      birthDate: doc.data().birthDate?.toDate() || null,
    })) as Animal[]

    return sortAnimals(animals)
  },

  async getFiltered(filters: {
    species?: Species
    children?: boolean
    dogs?: boolean
    cats?: boolean
  }): Promise<Animal[]> {
    // Start with base query - all non-adopted animals
    let q = query(collection(db, COLLECTION), where('status', 'in', ['available', 'reserved', 'sponsorship']))

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

    // Sort: available first, then reserved, then sponsorship, then by date
    return sortAnimals(animals)
  },

  async getCountBySpecies(): Promise<Record<Species, number>> {
    const counts: Record<Species, number> = {
      chien: 0,
      chat: 0,
      autre: 0,
    }

    const q = query(collection(db, COLLECTION), where('status', 'in', ['available', 'reserved', 'sponsorship']))
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

  async updateStatus(id: string, status: AnimalStatus): Promise<void> {
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
