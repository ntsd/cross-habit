import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { PageProps } from "./PageProps";

const CalendarPage: React.FC<PageProps> = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Calendar</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    </IonContent>
  </IonPage>
);

export default CalendarPage;
