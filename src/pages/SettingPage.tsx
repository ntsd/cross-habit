import React from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { PageProps } from "./PageProps";

const SettingPage: React.FC<PageProps> = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Setting</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>Setting</IonContent>
  </>
);

export default SettingPage;
