import { useState, useMemo } from 'react'
import { Container, Typography } from '@mui/material'
import { useTrainingLessons } from '../hooks/useTrainingLessons'
import { TrainingScheduleTable } from '../components/TrainingScheduleTable/TrainingScheduleTable'
import { ScheduleFilters } from '../components/Filters/ScheduleFilters'
import { LoadingState } from '../components/states/LoadingState'
import { EmptyState } from '../components/states/EmptyState'
import { ErrorState } from '../components/states/ErrorState'
import type { LessonFilters } from '../api/types'

export function TrainingSchedulePage() {
  const [filters, setFilters] = useState<LessonFilters>({})
  const { data, loading, error, refetch } = useTrainingLessons(filters)

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((value) => value !== undefined && value !== ''),
    [filters]
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Training Schedule
      </Typography>

      <ScheduleFilters filters={filters} onChange={setFilters} />

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} onRetry={refetch} />}
      {!loading && !error && data.length === 0 && (
        <EmptyState hasActiveFilters={hasActiveFilters} onClearFilters={() => setFilters({})} />
      )}
      {!loading && !error && data.length > 0 && <TrainingScheduleTable lessons={data} />}
    </Container>
  )
}