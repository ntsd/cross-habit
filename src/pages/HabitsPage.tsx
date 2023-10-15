import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import HabitModal from "../components/HabitModal";
import { PageProps } from "./PageProps";
import HabitList from "../components/HabitList";

const HabitsPage: React.FC<PageProps> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Habits</IonTitle>
          <IonButtons slot="end">
            <HabitModal isNew={true}>
              <IonButton strong={true} type="submit">
                New
              </IonButton>
            </HabitModal>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <HabitList />
      </IonContent>
    </IonPage>
  );
};

export default HabitsPage;
