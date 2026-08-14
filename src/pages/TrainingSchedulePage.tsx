import { useState, useMemo, useEffect } from 'react'
import { Container, Typography, Snackbar, Alert, TablePagination } from '@mui/material'
import { useTrainingLessons } from '../hooks/useTrainingLessons'
import { TrainingScheduleTable } from '../components/TrainingScheduleTable/TrainingScheduleTable'
import { ScheduleFilters } from '../components/Filters/ScheduleFilters'
import { LoadingState } from '../components/states/LoadingState'
import { EmptyState } from '../components/states/EmptyState'
import { ErrorState } from '../components/states/ErrorState'
import { LessonDetailsDialog } from '../components/LessonDetailsDialog/LessonDetailsDialog'
import { AttendanceDialog } from '../components/AttendanceDialog/AttendanceDialog'
import type { LessonFilters, TrainingLesson } from '../api/types'

const ROWS_PER_PAGE = 10

export function TrainingSchedulePage() {
  const [filters, setFilters] = useState<LessonFilters>({})
  const { data, loading, error, refetch } = useTrainingLessons(filters)

  const [page, setPage] = useState(0)
  useEffect(() => {
    setPage(0) // reset to first page whenever filters change, so you don't land on an empty page
  }, [filters])

  const paginatedData = useMemo(
    () => data.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE),
    [data, page]
  )

  const [selectedLesson, setSelectedLesson] = useState<TrainingLesson | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [attendanceOpen, setAttendanceOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((value) => value !== undefined && value !== ''),
    [filters]
  )

  const handleViewDetails = (lesson: TrainingLesson) => {
    setSelectedLesson(lesson)
    setDetailsOpen(true)
  }

  const handleManageAttendance = (lesson: TrainingLesson) => {
    setSelectedLesson(lesson)
    setAttendanceOpen(true)
  }

  const handleAttendanceSaved = () => {
    setSuccessMessage('Attendance updated successfully.')
    refetch()
  }

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
      {!loading && !error && data.length > 0 && (
        <>
          <TrainingScheduleTable
            lessons={paginatedData}
            onViewDetails={handleViewDetails}
            onManageAttendance={handleManageAttendance}
          />
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={ROWS_PER_PAGE}
            rowsPerPageOptions={[ROWS_PER_PAGE]}
          />
        </>
      )}

      <LessonDetailsDialog lesson={selectedLesson} open={detailsOpen} onClose={() => setDetailsOpen(false)} />

      <AttendanceDialog
        lesson={selectedLesson}
        open={attendanceOpen}
        onClose={() => setAttendanceOpen(false)}
        onSaved={handleAttendanceSaved}
      />

      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}