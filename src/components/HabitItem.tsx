import React, { useState } from "react";
import { IonButton, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from "@ionic/react";
import { useRecoilState } from "recoil";
import { habitsState } from "../stores/habitStore";
import { Habit } from "../types";
import HabitModal from "./HabitModal";

interface HabitItemProps {
  habit: Habit;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit }) => {
  return (
    <IonItemSliding>
      <HabitModal habit={habit}>
        <IonItem detail={true}>
          <IonLabel>
            <h3>{habit.title}</h3>
            <p>{habit.description}</p>
          </IonLabel>
        </IonItem>
      </HabitModal>

      <IonItemOptions>
        <IonItemOption>Delete</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default HabitItem;
