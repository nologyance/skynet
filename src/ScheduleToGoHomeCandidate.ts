export const scheduleToGoHomeCandidate = [
  "18:00まで",
  "18:30くらい",
  "19:00くらい",
  "19:30くらい",
  "20:00くらい",
  "20:30くらい",
  "21:00くらい",
  "21:30過ぎるくらい",
] as const;

export type ScheduleToGoHomeCandidate = typeof scheduleToGoHomeCandidate[number]
