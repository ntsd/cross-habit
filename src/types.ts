import { LocalNotificationSchema } from "@capacitor/local-notifications";

export interface Habit {
  id: string;
  title: string;
  description: string;
  priority: number;
  schedules: HabitSchedule[];
  tags: string[];
	isNotification: boolean;
  notificationSound?: string;
	oldTasks?: Task[];
  tasks?: Task[];
}

export type Habits = { [key: string]: Habit };

export interface Task {
  id: string;
  notification: LocalNotificationSchema;
}

export interface HabitSchedule {
  id: string;
  corn: string;
}

export interface Tag {
  name: string;
  color: string;
}

export interface Settings {
  darkMode: boolean;
}
