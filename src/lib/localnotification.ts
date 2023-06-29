import { LocalNotifications } from "@capacitor/local-notifications";
import { isPlatform } from "@ionic/react";

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

export async function addNotification() {
  const result = await LocalNotifications.schedule({
    notifications: [
      {
        id: 1,
        title: "title",
        body: "body",
        largeBody: "largeBody",
        summaryText: "summaryText",
        schedule: {
          every: "second",
        },
      },
    ],
  });
  return result;
}

export function getPendingNotification(id: number) {
  LocalNotifications.getPending().then();
}
