import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import type { TrainingLesson, LessonStatus, AttendanceStatus } from '../../api/types'

interface TrainingScheduleTableProps {
  lessons: TrainingLesson[]
  onViewDetails: (lesson: TrainingLesson) => void
  onManageAttendance: (lesson: TrainingLesson) => void
}

const lessonStatusColor: Record<LessonStatus, 'default' | 'primary' | 'success' | 'error'> = {
  Scheduled: 'default',
  InProgress: 'primary',
  Completed: 'success',
  Cancelled: 'error',
}

const attendanceStatusColor: Record<AttendanceStatus, 'default' | 'success' | 'error' | 'warning'> = {
  Pending: 'default',
  Present: 'success',
  Absent: 'error',
  Late: 'warning',
}

export function TrainingScheduleTable({ lessons, onViewDetails, onManageAttendance }: TrainingScheduleTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Trainee</TableCell>
            <TableCell>Lesson Date</TableCell>
            <TableCell>Lesson Time</TableCell>
            <TableCell>Instructor</TableCell>
            <TableCell>Vehicle / Bus</TableCell>
            <TableCell>Lesson Status</TableCell>
            <TableCell>Attendance</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons.map((lesson) => (
            <TableRow key={lesson.id} hover>
              <TableCell>{lesson.traineeName}</TableCell>
              <TableCell>{lesson.lessonDate}</TableCell>
              <TableCell>{lesson.lessonTime}</TableCell>
              <TableCell>{lesson.instructorName}</TableCell>
              <TableCell>{lesson.vehicle}</TableCell>
              <TableCell>
                <Chip label={lesson.lessonStatus} color={lessonStatusColor[lesson.lessonStatus]} size="small" />
              </TableCell>
              <TableCell>
                <Chip label={lesson.attendanceStatus} color={attendanceStatusColor[lesson.attendanceStatus]} size="small" />
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                  <Tooltip title="View lesson details">
                    <IconButton size="small" onClick={() => onViewDetails(lesson)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Manage attendance">
                    <IconButton size="small" onClick={() => onManageAttendance(lesson)}>
                      <EventAvailableIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}