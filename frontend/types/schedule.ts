export interface ScheduleDay {
  day: number;
  startHour?: string;
  endHour?: string;
}

export interface UserObject {
  _id: string;
  name: string;
}

export interface UserSchedule {
  user: UserObject | null;
  days: ScheduleDay[];
}

export interface Schedule {
  month: string;
  users: UserSchedule[];
}

