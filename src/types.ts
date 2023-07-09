import { LocalNotificationSchema } from "@capacitor/local-notifications";

export interface Habit {
  id: string;
  title: string;
  description: string;
  priority: number;
  schedules: HabitSchedule[];
  tags: string[];
  notificationSound?: string;
  tasks?: Task[];
}

export type Habits = { [key: string]: Habit };

export interface Task {
  id: string;
  notification: LocalNotificationSchema;
}

/**
 * Day of the week. Used for scheduling notifications on a particular weekday.
 */
export declare enum Weekday {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export interface ScheduleOn {
  year?: number;
  month?: number;
  day?: number;
  weekday?: Weekday;
  hour?: number;
  minute?: number;
}

export declare type ScheduleEvery =
  | "year"
  | "month"
  | "two-weeks"
  | "week"
  | "day"
  | "hour";

export interface HabitSchedule {
  id: string;
  every: ScheduleEvery;
  on: ScheduleOn;
  corn?: string;
}

export interface Tag {
  name: string;
  color: string;
}

export interface Settings {
  darkMode: boolean;
}
