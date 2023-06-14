import React, { useRef } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonPage } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route } from 'react-router';

import { checkbox, accessibility, cog } from 'ionicons/icons';

import TasksPage from './pages/TasksPage';
import HabitsPage from './pages/HabitsPage';
import SettingPage from './pages/SettingPage';
import { PageProps } from './pages/PageProps';

const pages: { title: string, component: React.FC<PageProps>, path: string, icon: string }[] = [
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
		title: "Setting",
		component: SettingPage,
		path: "setting",
		icon: cog,
	}
]

const App: React.FC = () => {
	const pageRef = useRef(null);

	return (
		<IonPage ref={pageRef}>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						{
							pages.map(page =>
								<Route path={`/${page.path}`} render={() => <page.component pageRef={pageRef} />} key={page.path} />
							)
						}
					</IonRouterOutlet>

					<IonTabBar slot="bottom">
						{
							pages.map(page =>
								<IonTabButton tab={page.path} href={`/${page.path}`} key={page.path} >
									<IonIcon icon={page.icon} />
									<IonLabel>{page.title}</IonLabel>
								</IonTabButton>)
						}
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonPage>
	);
}
export default App;