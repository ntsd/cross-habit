import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';
import { Habit } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { habitsState } from '../stores/habitStore';

interface NewHabitModalProps {
	pageRef: React.MutableRefObject<null>,
	modalID: string,
}

interface NewHabitInput {
	name: string
	description: string
}

const NewHabitModal: React.FC<NewHabitModalProps> = ({ pageRef, modalID }) => {
	const modal = useRef<HTMLIonModalElement>(null);

	const [habits, setHabits] = useRecoilState(habitsState)
	const { handleSubmit, register } = useForm<NewHabitInput>();

	const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
	const [present] = useIonActionSheet();

	useEffect(() => {
		setPresentingElement(pageRef.current);
	}, [pageRef]);

	function dismiss() {
		modal.current?.dismiss();
	}

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
					} else {
						resolve(false);
					}
				},
			});
		});
	}

	const onSubmit: SubmitHandler<NewHabitInput> = (data) => {
		const newHabit: Habit = {
			name: data.name,
			description: data.description,
			priority: 1
		}
		setHabits(habits.set('', newHabit))
	}

	return (
		<IonModal ref={modal} trigger={modalID} canDismiss={canDismiss} presentingElement={presentingElement!} >
			<IonHeader>
				<IonToolbar>
					<IonTitle>New Habit</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dismiss()}>Close</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding" style={{ height: '100vh' }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<IonList>
						<IonItem>
							<IonInput label="Name" {...register('name')}></IonInput>
						</IonItem>
						<IonItem>
							<IonInput label="Description" {...register('description')}></IonInput>
						</IonItem>
						<IonItem>
							<IonButton type='submit'>Create</IonButton>
						</IonItem>
					</IonList>
				</form>
			</IonContent>
		</IonModal>
	);
}

export default NewHabitModal;
