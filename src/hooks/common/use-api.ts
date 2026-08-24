import { useState, useEffect } from "react"

interface UseApiOptions<T> {
  initialData?: T
  autoFetch?: boolean
}

interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Generic hook for API calls
 */
export function useApi<T>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions<T> = {},
): UseApiReturn<T> {
  const { initialData = null, autoFetch = true } = options

  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState<boolean>(autoFetch)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await apiFunction()
      setData(result)
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Xatolik yuz berdi")
      console.error("API Error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}
