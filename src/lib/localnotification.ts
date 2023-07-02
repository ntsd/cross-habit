import { LocalNotifications } from "@capacitor/local-notifications";
import { isPlatform } from "@ionic/react";
import { HabitSchedule } from "../types";
import { randSeedRange } from "../utils/randseed";

// https://www.youtube.com/watch?v=A3X0-ZgU-KI
// https://www.youtube.com/watch?v=bww4a4B43tM

export async function requestNotificationPermission() {
  return LocalNotifications.requestPermissions();
}

export async function registerNotificationActionTypes() {
  if (isPlatform("mobile")) {
    await LocalNotifications.registerActionTypes({
      types: [
        {
          id: "habit_action",
          actions: [
            {
              id: "",
              title: "",
            },
          ],
        },
      ],
    });
  }
}

export async function addNotification(schedule: HabitSchedule) {
  const result = await LocalNotifications.schedule({
    notifications: [
      {
        id: randSeedRange(schedule.id, -2147483647, 2147483647),
        title: "title",
        body: "body",
        // largeBody: "largeBody",
        // summaryText: "summaryText",
        schedule: {
          every: "minute",
          repeats: true,
        },
      },
    ],
  });
  console.log("result", result);

  const pending = await LocalNotifications.getPending();
  console.log("pending", pending);

  return result;
}

export function getPendingNotification(id: number) {
  LocalNotifications.getPending().then();
}
