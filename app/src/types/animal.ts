export type Species = 'chien' | 'chat' | 'oiseau' | 'autre'
export type Gender = 'male' | 'female'
export type AnimalStatus = 'available' | 'adopted'

export interface AnimalCompatibility {
  children: boolean
  dogs: boolean
  cats: boolean
  other_animals: boolean
}

export interface Animal {
  id: string
  name: string
  species: Species
  breed: string
  age: string
  birthDate: Date | null
  gender: Gender
  description: string
  photos: string[]
  mainPhoto: string
  compatibility: AnimalCompatibility
  status: AnimalStatus
  createdAt: Date
  updatedAt: Date
}

export type AnimalCreateInput = Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>
export type AnimalUpdateInput = Partial<AnimalCreateInput>

export interface AnimalPrivateNotes {
  content: string
  updatedAt: Date
}

export const SPECIES_LABELS: Record<Species, string> = {
  chien: 'Chiens',
  chat: 'Chats',
  oiseau: 'Oiseaux',
  autre: 'Autres',
}

export const SPECIES_LIST: Species[] = ['chien', 'chat', 'oiseau', 'autre']
