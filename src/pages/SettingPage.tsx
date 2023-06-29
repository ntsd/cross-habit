import React from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { PageProps } from "./PageProps";

const SettingPage: React.FC<PageProps> = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Setting</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>Setting</IonContent>
  </IonPage>
);

export default SettingPage;
