import { useState, useEffect, useCallback } from 'react'
import { spaInfoService } from '@/services/spaInfoService'
import type { SpaInfo } from '@/types/spaInfo'

interface UseSpaInfoReturn {
  spaInfo: SpaInfo | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useSpaInfo(): UseSpaInfoReturn {
  const [spaInfo, setSpaInfo] = useState<SpaInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchSpaInfo = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await spaInfoService.get()
      setSpaInfo(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch SPA info'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSpaInfo()
  }, [fetchSpaInfo])

  return { spaInfo, loading, error, refetch: fetchSpaInfo }
}
