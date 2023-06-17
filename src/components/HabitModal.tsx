import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import { Habit } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { habitsState } from '../stores/habitStore';
import { v4 as uuid } from 'uuid';

interface HabitModalProps {
	habit?: Habit
	children: JSX.Element
}

const HabitModal: React.FC<HabitModalProps> = ({ habit, children }) => {
	const modal = useRef<HTMLIonModalElement>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [habits, setHabits] = useRecoilState(habitsState)
	const { handleSubmit, register } = useForm<Habit>({
		defaultValues: habit || {
			id: uuid(),
			tags: [],
			schedules: []
		}
	});

	const [present] = useIonActionSheet();

	function canDismiss() {
		return new Promise<boolean>((resolve, reject) => {
			present({
				header: 'Quit without saving?',
				buttons: [
					{
						text: 'Yes',
						role: 'confirm',
					},
					{
						text: 'No',
						role: 'cancel',
					},
				],
				onWillDismiss: (ev) => {
					if (ev.detail.role === 'confirm') {
						resolve(true);
					}
					resolve(false);
				},
			});
		});
	}

	const onSubmit: SubmitHandler<Habit> = (data) => {
		const newHabit: Habit = {
			id: data.id,
			title: data.title,
			description: data.description,
			priority: data.priority,
			schedules: data.schedules,
			tags: data.tags,
		}

		setHabits({ ...habits, [newHabit.id]: newHabit });

		setIsOpen(false)
	}

	return (
		<span onClick={() => { setIsOpen(true) }}>
			{children}
			<IonModal ref={modal} onDidDismiss={() => setIsOpen(false)} isOpen={isOpen} >
				<form onSubmit={handleSubmit(onSubmit)}>
					<IonHeader>
						<IonToolbar>
							<IonButtons slot="start">
								<IonButton onClick={() => canDismiss().then(yes => yes && setIsOpen(false))}>Cancel</IonButton>
							</IonButtons>
							<IonTitle>{habit?.title || "New Habit"}</IonTitle>
							<IonButtons slot="end">
								<IonButton strong={true} type='submit'>
									Save
								</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<IonContent className="ion-padding" class='h-screen'>
						<IonList>
							<IonItem>
								<IonInput label="Name" {...register('title')}></IonInput>
							</IonItem>
							<IonItem>
								<IonInput label="Description" {...register('description')}></IonInput>
							</IonItem>
						</IonList>
					</IonContent>
				</form>
			</IonModal>
		</span>
	);
}

export default HabitModal;
