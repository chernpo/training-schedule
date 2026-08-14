import { TextField, MenuItem, Stack } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import type { LessonFilters, LessonStatus } from '../../api/types'
import { mockTrainingLessons } from '../../api/mockData'

interface ScheduleFiltersProps {
  filters: LessonFilters
  onChange: (filters: LessonFilters) => void
}

const LESSON_STATUSES: (LessonStatus | 'All')[] = ['All', 'Scheduled', 'InProgress', 'Completed', 'Cancelled']

// Assumption: in a real app this list would come from a dedicated
// /instructors endpoint; deriving it from mock data is a stand-in for now.
const INSTRUCTOR_OPTIONS = Array.from(new Set(mockTrainingLessons.map((l) => l.instructorName))).sort()

export function ScheduleFilters({ filters, onChange }: ScheduleFiltersProps) {
  const handleChange = (patch: Partial<LessonFilters>) => {
    onChange({ ...filters, ...patch })
  }

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
      <DatePicker
        label="From"
        value={filters.dateFrom ? dayjs(filters.dateFrom) : null}
        onChange={(value: Dayjs | null) =>
          handleChange({ dateFrom: value ? value.format('YYYY-MM-DD') : undefined })
        }
        slotProps={{ textField: { size: 'small', sx: { minWidth: 160 } } }}
      />
      <DatePicker
        label="To"
        value={filters.dateTo ? dayjs(filters.dateTo) : null}
        onChange={(value: Dayjs | null) =>
          handleChange({ dateTo: value ? value.format('YYYY-MM-DD') : undefined })
        }
        slotProps={{ textField: { size: 'small', sx: { minWidth: 160 } } }}
      />

      <TextField
        select
        label="Instructor"
        size="small"
        sx={{ minWidth: 160 }}
        value={filters.instructorName ?? 'All'}
        onChange={(e) => handleChange({ instructorName: e.target.value === 'All' ? undefined : e.target.value })}
      >
        <MenuItem value="All">All Instructors</MenuItem>
        {INSTRUCTOR_OPTIONS.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Lesson Status"
        size="small"
        sx={{ minWidth: 160 }}
        value={filters.lessonStatus ?? 'All'}
        onChange={(e) =>
          handleChange({ lessonStatus: e.target.value === 'All' ? undefined : (e.target.value as LessonStatus) })
        }
      >
        {LESSON_STATUSES.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Search trainee"
        size="small"
        sx={{ minWidth: 200 }}
        value={filters.traineeSearch ?? ''}
        onChange={(e) => handleChange({ traineeSearch: e.target.value || undefined })}
      />
    </Stack>
  )
}