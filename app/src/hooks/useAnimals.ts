import { useState, useEffect, useCallback } from 'react'
import { animalService } from '@/services/animalService'
import type { Animal, Species } from '@/types/animal'

export interface AnimalFilters {
  species?: Species
  children?: boolean
  dogs?: boolean
  cats?: boolean
}

interface UseAnimalsReturn {
  animals: Animal[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useAnimals(filters: AnimalFilters = {}): UseAnimalsReturn {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const hasFilters = filters.species || filters.children || filters.dogs || filters.cats

  const fetchAnimals = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = hasFilters
        ? await animalService.getFiltered(filters)
        : await animalService.getAvailable()
      setAnimals(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch animals'))
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.species, filters.children, filters.dogs, filters.cats, hasFilters])

  useEffect(() => {
    fetchAnimals()
  }, [fetchAnimals])

  return { animals, loading, error, refetch: fetchAnimals }
}
