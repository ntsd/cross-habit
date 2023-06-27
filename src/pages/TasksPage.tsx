import React from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { PageProps } from "./PageProps";

const TasksPage: React.FC<PageProps> = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Tasks</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>Tasks</IonContent>
  </>
);

export default TasksPage;
