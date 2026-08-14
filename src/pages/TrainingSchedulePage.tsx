import { Container, Typography } from '@mui/material'
import { useTrainingLessons } from '../hooks/useTrainingLessons'
import { TrainingScheduleTable } from '../components/TrainingScheduleTable/TrainingScheduleTable'

export function TrainingSchedulePage() {
  const { data, loading, error } = useTrainingLessons()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Training Schedule
      </Typography>

      {/* Phase 4 replaces these three lines with proper loading/empty/error components */}
      {loading && <Typography>Loading…</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && <TrainingScheduleTable lessons={data} />}
    </Container>
  )
}