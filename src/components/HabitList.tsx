import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import { useRecoilState } from 'recoil';
import { habitsState } from '../stores/habitStore';
import { Habit } from '../types';

const HabitList: React.FC = () => {
	const [habits, _] = useRecoilState(habitsState)

	return (
		<IonList>
			{
				Object.values(habits).map((habit: Habit) => <IonItem key={habit.id}>
					<IonLabel>{habit.name}</IonLabel>
				</IonItem>)
			}
		</IonList>
	);
}

export default HabitList;
