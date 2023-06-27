import React from "react";
import { IonList } from "@ionic/react";
import { useRecoilState } from "recoil";
import { habitsState } from "../stores/habitStore";
import { Habit } from "../types";
import HabitItem from "./HabitItem";

const HabitList: React.FC = () => {
  const [habits] = useRecoilState(habitsState);

  return (
    <IonList>
      {Object.values(habits).map((habit: Habit) => (
        <HabitItem habit={habit} key={habit.id} />
      ))}
    </IonList>
  );
};

export default HabitList;
