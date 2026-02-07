export interface ScheduleDay {
  day: number;
  startHour?: string;
  endHour?: string;
}

export interface UserSchedule {
  user: string; // userId
  days: ScheduleDay[];
}

export interface Schedule {
  month: string; // YYYY-MM
  users: UserSchedule[];
}
