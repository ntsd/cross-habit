import React, { useRef } from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonPage,
  IonApp,
  isPlatform,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { Redirect, Route } from "react-router";

import { checkbox, accessibility, cog, calendar } from "ionicons/icons";

import TasksPage from "./pages/TasksPage";
import HabitsPage from "./pages/HabitsPage";
import SettingsPage from "./pages/SettingsPage";
import { PageProps } from "./pages/PageProps";
import { LocalNotifications } from "@capacitor/local-notifications";
import { RecoilRoot, useRecoilState } from "recoil";
import CalendarPage from "./pages/CalendarPage";
import {
	listenNotificationReceived,
  registerNotificationActionTypes,
  requestNotificationPermission,
} from "./lib/localnotification";
import { settingsState } from "./stores/settingsStore";

const tabs: {
  title: string;
  component: React.FC<PageProps>;
  path: string;
  icon: string;
}[] = [
  {
    title: "Tasks",
    component: TasksPage,
    path: "tasks",
    icon: checkbox,
  },
  {
    title: "Habits",
    component: HabitsPage,
    path: "habits",
    icon: accessibility,
  },
  {
    title: "Calendar",
    component: CalendarPage,
    path: "calendar",
    icon: calendar,
  },
  {
    title: "Settings",
    component: SettingsPage,
    path: "settings",
    icon: cog,
  },
];

const App: React.FC = () => {
  const [setting, setSetting] = useRecoilState(settingsState);

  requestNotificationPermission();
	listenNotificationReceived();
  registerNotificationActionTypes();

  return (
      <IonApp className={`${setting.darkMode ? "dark-theme" : ""}`}>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/" to="/tasks" />
              {tabs.map((tab) => (
                <Route
                  path={`/${tab.path}`}
                  render={() => <tab.component />}
                  key={tab.path}
                  exact
                />
              ))}
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              {tabs.map((tab) => (
                <IonTabButton
                  tab={tab.path}
                  href={`/${tab.path}`}
                  key={tab.path}
                >
                  <IonIcon icon={tab.icon} />
                  <IonLabel>{tab.title}</IonLabel>
                </IonTabButton>
              ))}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
  );
};
export default App;
