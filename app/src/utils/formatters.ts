import type { Gender, Species } from '@/types/animal'

export function formatGender(gender: Gender): string {
  return gender === 'male' ? 'Mâle' : 'Femelle'
}

export function formatSpecies(species: Species): string {
  const labels: Record<Species, string> = {
    chien: 'Chien',
    chat: 'Chat',
    oiseau: 'Oiseau',
    autre: 'Autre',
  }
  return labels[species]
}
