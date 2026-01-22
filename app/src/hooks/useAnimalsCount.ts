import { useState, useEffect } from 'react'
import { animalService } from '@/services/animalService'
import type { Species } from '@/types/animal'

interface UseAnimalsCountReturn {
  counts: Record<Species, number>
  total: number
  loading: boolean
  error: Error | null
}

export function useAnimalsCount(): UseAnimalsCountReturn {
  const [counts, setCounts] = useState<Record<Species, number>>({
    chien: 0,
    chat: 0,
    oiseau: 0,
    autre: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await animalService.getCountBySpecies()
        setCounts(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch counts'))
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0)

  return { counts, total, loading, error }
}
