import React from "react";
import {
  IonHeader,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRecoilState } from "recoil";
import { habitsState } from "../stores/habitStore";
import { Habit } from "../types";
import HabitItem from "./HabitItem";

const HabitList: React.FC = () => {
  const [habits] = useRecoilState(habitsState);

  return (
    <>
      <IonSearchbar
        placeholder="Search"
        onIonInput={(e: CustomEvent) => {}}
      ></IonSearchbar>
      <IonList lines="full">
        {Object.values(habits).map((habit: Habit) => (
          <HabitItem habit={habit} key={habit.id} />
        ))}
      </IonList>
    </>
  );
};

export default HabitList;
