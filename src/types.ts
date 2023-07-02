import { Schedule } from "@capacitor/local-notifications";

export interface Habit {
  id: string;
  title: string;
  description: string;
  priority: number;
  schedules: HabitSchedule[];
  tags: string[];
  notificationSound?: string;
}

export type Habits = { [key: string]: Habit };

export interface Task {
  notificationId?: number;
}

export interface HabitSchedule extends Schedule {
	id: string;
  notificationId?: number;
}

export interface Tag {
  name: string;
  color: string;
}
