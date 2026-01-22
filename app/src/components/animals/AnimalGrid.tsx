import type { Animal } from '@/types/animal'
import { AnimalCard } from './AnimalCard'

interface AnimalGridProps {
  animals: Animal[]
  onEdit?: (animal: Animal) => void
}

export function AnimalGrid({ animals, onEdit }: AnimalGridProps) {
  if (animals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucun animal disponible pour le moment.</p>
        <p className="text-gray-400 mt-2">Revenez bientôt !</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} onEdit={onEdit} />
      ))}
    </div>
  )
}
