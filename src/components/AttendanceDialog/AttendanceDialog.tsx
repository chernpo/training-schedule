import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
  Alert,
  CircularProgress,
} from '@mui/material'
import type { TrainingLesson, AttendanceStatus } from '../../api/types'
import { updateAttendance } from '../../api/trainingApi'

interface AttendanceDialogProps {
  lesson: TrainingLesson | null
  open: boolean
  onClose: () => void
  onSaved: (updatedLesson: TrainingLesson) => void
}

const ATTENDANCE_OPTIONS: AttendanceStatus[] = ['Present', 'Absent', 'Late']

export function AttendanceDialog({ lesson, open, onClose, onSaved }: AttendanceDialogProps) {
  const [selected, setSelected] = useState<AttendanceStatus | ''>('')
  const [touched, setTouched] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  if (open && lesson) {
    /* eslint-disable react-hooks/set-state-in-effect -- intentional: resetting local form state when the dialog opens for a (possibly different) lesson */
    setSelected(lesson.attendanceStatus === 'Pending' ? '' : lesson.attendanceStatus)
    setTouched(false)
    setError(null)
    /* eslint-enable react-hooks/set-state-in-effect */
  }
  }, [open, lesson])

  const showValidationError = touched && !selected

  const handleSave = async () => {
    setTouched(true)
    if (!selected || !lesson) return

    setSaving(true)
    setError(null)
    try {
      const updated = await updateAttendance(lesson.id, selected)
      onSaved(updated)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update attendance.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Update Attendance</DialogTitle>
      <DialogContent>
        {lesson && (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography color="text.secondary">
              {lesson.traineeName} — {lesson.lessonDate}, {lesson.lessonTime}
            </Typography>

            <FormControl error={showValidationError}>
              <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value as AttendanceStatus)}>
                {ATTENDANCE_OPTIONS.map((status) => (
                  <FormControlLabel key={status} value={status} control={<Radio />} label={status} />
                ))}
              </RadioGroup>
              {showValidationError && (
                <FormHelperText>Please select an attendance status before saving.</FormHelperText>
              )}
            </FormControl>

            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving}>
          {saving ? <CircularProgress size={20} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}