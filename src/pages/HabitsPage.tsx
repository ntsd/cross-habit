import React from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { add } from "ionicons/icons";
import HabitModal from "../components/HabitModal";
import { PageProps } from "./PageProps";
import HabitList from "../components/HabitList";

const HabitsPage: React.FC<PageProps> = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Habits</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
          <HabitModal>
            <IonFabButton>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </HabitModal>
        </IonFab>
        <HabitList />
      </IonContent>
    </>
  );
};

export default HabitsPage;
