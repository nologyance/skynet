export const scheduleToGoHomeCandidate = [
  "19:00まで",
  "19:30くらい",
  "20:00くらい",
  "20:30くらい",
  "21:00くらい",
  "21:30過ぎるくらい",
] as const;

export type ScheduleToGoHomeCandidate = typeof scheduleToGoHomeCandidate[number]
