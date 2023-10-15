import React, { useState } from "react";
import {
  IonButton,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  useIonActionSheet,
} from "@ionic/react";
import { useRecoilState } from "recoil";
import { habitsState } from "../stores/habitStore";
import { Habit } from "../types";
import HabitModal from "./HabitModal";

interface HabitItemProps {
  habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
  const [present] = useIonActionSheet();
  const [habits, setHabits] = useRecoilState(habitsState);

  const deleteHabit = () => {
    present({
      buttons: [
        {
          text: "Delete",
          role: "confirm",
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
      onWillDismiss: (ev) => {
        if (ev.detail.role === "confirm") {
          if (habit) {
            setHabits((habits) => {
              const copy = { ...habits };
              delete copy[habit.id];
              return copy;
            });
          }
        }
      },
    });
  };

  return (
    <IonItemSliding>
      <HabitModal habit={habit} isNew={false}>
        <IonItem detail={true}>
          <IonLabel>
            <h3>{habit.title}</h3>
            <p>{habit.description}</p>
          </IonLabel>
        </IonItem>
      </HabitModal>

      <IonItemOptions>
        <IonItemOption onClick={deleteHabit} color={"danger"}>
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default HabitItem;
