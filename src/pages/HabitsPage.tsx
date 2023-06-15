import React from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';

import { add } from 'ionicons/icons';
import NewHabitModal from '../components/NewHabitModal';
import { PageProps } from './PageProps';

const HabitsPage: React.FC<PageProps> = ({pageRef}) => {
	return (<>
		<IonHeader>
			<IonToolbar>
				<IonTitle>Habits</IonTitle>
			</IonToolbar>
		</IonHeader>
		<IonContent>
			<IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
				<IonFabButton id='new-habbit-modal'>
					<IonIcon icon={add}></IonIcon>
				</IonFabButton>
			</IonFab>
			<NewHabitModal modalID='new-habbit-modal' pageRef={pageRef}></NewHabitModal>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				Habit
			</div>
		</IonContent>
	</>);
};

export default HabitsPage;