import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { PageProps } from "./PageProps";

const TasksPage: React.FC<PageProps> = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Tasks</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    </IonContent>
  </IonPage>
);

export default TasksPage;
