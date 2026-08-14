import type { ReactNode } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Chip } from '@mui/material'
import type { TrainingLesson } from '../../api/types'

interface LessonDetailsDialogProps {
  lesson: TrainingLesson | null
  open: boolean
  onClose: () => void
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={500}>{value}</Typography>
    </Stack>
  )
}

export function LessonDetailsDialog({ lesson, open, onClose }: LessonDetailsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Lesson Details</DialogTitle>
      <DialogContent>
        {lesson && (
          <Stack spacing={1.5} sx={{ mt: 1 }}>
            <DetailRow label="Trainee" value={lesson.traineeName} />
            <DetailRow label="Date" value={lesson.lessonDate} />
            <DetailRow label="Time" value={lesson.lessonTime} />
            <DetailRow label="Instructor" value={lesson.instructorName} />
            <DetailRow label="Vehicle / Bus" value={lesson.vehicle} />
            <DetailRow label="Lesson Status" value={<Chip label={lesson.lessonStatus} size="small" />} />
            <DetailRow label="Attendance" value={<Chip label={lesson.attendanceStatus} size="small" />} />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}