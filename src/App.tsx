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
import SettingPage from "./pages/SettingPage";
import { PageProps } from "./pages/PageProps";
import { LocalNotifications } from "@capacitor/local-notifications";
import { RecoilRoot } from "recoil";
import CalendarPage from "./pages/CalendarPage";
import { registerNotificationActionTypes, requestNotificationPermission } from "./lib/localnotification";

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
    title: "Setting",
    component: SettingPage,
    path: "setting",
    icon: cog,
  },
];

const App: React.FC = () => {
	requestNotificationPermission();

	registerNotificationActionTypes();

  return (
    <RecoilRoot>
      <IonApp>
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
    </RecoilRoot>
  );
};
export default App;
