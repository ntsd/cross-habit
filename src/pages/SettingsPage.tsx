import React from "react";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { PageProps } from "./PageProps";
import { useRecoilState } from "recoil";
import { settingsState } from "../stores/settingsStore";
import { moonOutline } from "ionicons/icons";

const SettingsPage: React.FC<PageProps> = () => {
  const [setting, setSetting] = useRecoilState(settingsState);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonListHeader>UI</IonListHeader>
          <IonItem>
            <IonIcon
              slot="start"
              icon={moonOutline}
              aria-hidden="true"
            ></IonIcon>
            <IonToggle
              checked={setting.darkMode}
              onClick={() =>
                setSetting({ ...setting, darkMode: !setting.darkMode })
              }
            >
              Dark Mode
            </IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
