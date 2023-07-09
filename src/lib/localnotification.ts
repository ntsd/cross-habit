import {
  CancelOptions,
  LocalNotifications,
} from "@capacitor/local-notifications";
import { isPlatform } from "@ionic/react";
import { Habit } from "../types";
import { actionId, actionSkip, actionSuccess } from "../consts";

// https://www.youtube.com/watch?v=A3X0-ZgU-KI
// https://www.youtube.com/watch?v=bww4a4B43tM

export async function requestNotificationPermission() {
  return LocalNotifications.requestPermissions();
}

export async function listenNotificationReceived() {
  return LocalNotifications.addListener(
    "localNotificationReceived",
    (notification) => {
      console.log(`Received notification`, notification);
    }
  );
}

export async function registerNotificationActionTypes() {
  if (isPlatform("mobile")) {
    console.log("registering action types");
    await LocalNotifications.registerActionTypes({
      types: [
        {
          id: actionId,
          actions: [
            {
              id: actionSuccess,
              title: "Success",
              destructive: true,
            },
            {
              id: actionSkip,
              title: "Skip",
              destructive: true,
            },
          ],
        },
      ],
    });
    await LocalNotifications.addListener(
      "localNotificationActionPerformed",
      (action) => {
        switch (action.actionId) {
          case actionSuccess:
            console.log("actionSuccess");
            break;
          case actionSkip:
            console.log("actionSkip");
            break;
        }
      }
    );
  }
}

export async function addNotifications(habit: Habit) {
  // for (let i = 0; i < habit.schedules.length; i++) {
  //   let schedule = habit.schedules[i];
  //   await LocalNotifications.schedule({
  //     notifications: [
  //       {
  //         id: schedule.notificationId,
  //         title: habit.title,
  //         body: habit.description,
  //         actionTypeId: actionId,
  //         schedule: schedule,
  //         extra: habit,
  //       },
  //     ],
  //   });
  // }
  // const pending = await LocalNotifications.getPending();
  // console.log("pending", pending);
  // return pending.notifications;
}

export async function removeNotificationById(notificationId: number) {
  const pending: CancelOptions = {
    notifications: [
      {
        id: notificationId,
      },
    ],
  };

  return LocalNotifications.cancel(pending);
}

export function getPendingNotification(id: number) {
  LocalNotifications.getPending().then();
}
