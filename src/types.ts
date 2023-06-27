import {
  Schedule,
} from "@capacitor/local-notifications";

export interface Habit {
  id: string;
  title: string;
  description: string;
  priority: number;
  schedules: HabitSchedule[];
  tags: string[];
	notificationSound?: string;
}

export interface HabitSchedule extends Schedule {}

export interface Tag {
  name: string;
  color: string;
}
