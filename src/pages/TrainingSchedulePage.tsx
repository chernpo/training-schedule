import { useState } from 'react'
import { Container, Typography } from '@mui/material'
import { useTrainingLessons } from '../hooks/useTrainingLessons'
import { TrainingScheduleTable } from '../components/TrainingScheduleTable/TrainingScheduleTable'
import { ScheduleFilters } from '../components/Filters/ScheduleFilters'
import type { LessonFilters } from '../api/types'

export function TrainingSchedulePage() {
  const [filters, setFilters] = useState<LessonFilters>({})
  const { data, loading, error } = useTrainingLessons(filters)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Training Schedule
      </Typography>

      <ScheduleFilters filters={filters} onChange={setFilters} />

      {loading && <Typography>Loading…</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && <TrainingScheduleTable lessons={data} />}
    </Container>
  )
}