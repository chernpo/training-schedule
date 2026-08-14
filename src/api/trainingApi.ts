import type { TrainingLesson, LessonFilters, AttendanceStatus } from './types';
import { mockTrainingLessons } from './mockData';

const SIMULATED_DELAY_MS = 600;

// Flip this to true (e.g. from a temporary button, or manually in code) to
// verify the error state UI in Phase 4. In a real app this branch goes away
// once actual fetch/axios error handling is in place.
let simulateError = false;
export function setSimulateError(value: boolean) {
  simulateError = value;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function applyFilters(lessons: TrainingLesson[], filters?: LessonFilters): TrainingLesson[] {
  if (!filters) return lessons;

  return lessons.filter((lesson) => {
    if (filters.dateFrom && lesson.lessonDate < filters.dateFrom) return false;
    if (filters.dateTo && lesson.lessonDate > filters.dateTo) return false;
    if (filters.instructorName && filters.instructorName !== 'All' && lesson.instructorName !== filters.instructorName) return false;
    if (filters.lessonStatus && filters.lessonStatus !== 'All' && lesson.lessonStatus !== filters.lessonStatus) return false;
    if (filters.traineeSearch) {
      const search = filters.traineeSearch.trim().toLowerCase();
      if (search && !lesson.traineeName.toLowerCase().includes(search)) return false;
    }
    return true;
  });
}

/**
 * Fetches training lessons, optionally filtered.
 * Shaped so a real call (e.g. fetch('/api/lessons?...')) can replace the
 * body later without changing the function signature or its call sites.
 */
export async function getTrainingLessons(filters?: LessonFilters): Promise<TrainingLesson[]> {
  await delay(SIMULATED_DELAY_MS);

  if (simulateError) {
    throw new Error('Failed to load training lessons. Please try again.');
  }

  return applyFilters(mockTrainingLessons, filters);
}

/**
 * Updates a lesson's attendance status — mirrors a PATCH /api/lessons/:id/attendance call.
 */
export async function updateAttendance(lessonId: string, status: AttendanceStatus): Promise<TrainingLesson> {
  await delay(SIMULATED_DELAY_MS);

  if (simulateError) {
    throw new Error('Failed to update attendance. Please try again.');
  }

  const lesson = mockTrainingLessons.find((l) => l.id === lessonId);
  if (!lesson) {
    throw new Error(`Lesson with id ${lessonId} not found.`);
  }

  lesson.attendanceStatus = status;
  return lesson;
}