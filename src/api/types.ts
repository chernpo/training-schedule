export type LessonStatus = 'Scheduled' | 'InProgress' | 'Completed' | 'Cancelled';

export type AttendanceStatus = 'Pending' | 'Present' | 'Absent' | 'Late';

export interface TrainingLesson {
  id: string;
  traineeName: string;
  lessonDate: string; // ISO date, e.g. "2026-08-20"
  lessonTime: string; // e.g. "08:00 - 09:00"
  instructorName: string;
  vehicle: string;
  lessonStatus: LessonStatus;
  attendanceStatus: AttendanceStatus;
}

export interface LessonFilters {
  dateFrom?: string;
  dateTo?: string;
  instructorName?: string;
  lessonStatus?: LessonStatus | 'All';
  traineeSearch?: string;
}