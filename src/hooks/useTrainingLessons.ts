import { useState, useEffect, useCallback } from 'react'
import type { TrainingLesson, LessonFilters } from '../api/types'
import { getTrainingLessons } from '../api/trainingApi'

interface UseTrainingLessonsResult {
  data: TrainingLesson[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useTrainingLessons(filters?: LessonFilters): UseTrainingLessonsResult {
  const [data, setData] = useState<TrainingLesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Stringify filters for the dependency array — otherwise a new object
  // reference on every render would re-trigger the effect in an infinite loop.
  const filtersKey = JSON.stringify(filters ?? {})

  const fetchLessons = useCallback(() => {
    setLoading(true)
    setError(null)

    getTrainingLessons(filters)
      .then((lessons) => setData(lessons))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey])

  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  return { data, loading, error, refetch: fetchLessons }
}