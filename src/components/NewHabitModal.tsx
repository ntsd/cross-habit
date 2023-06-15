import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';

interface NewHabitModalProps {
	pageRef: React.MutableRefObject<null>,
	modalID: string,
}

const NewHabitModal: React.FC<NewHabitModalProps> = ({ pageRef, modalID }) => {
	const modal = useRef<HTMLIonModalElement>(null);

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
			<IonContent className="ion-padding" style={{height: '100vh'}}>
				<IonList>
					<IonItem>
						<IonInput label="Name"></IonInput>
					</IonItem>
					<IonItem>
						<IonInput label="Description"></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
		</IonModal>
	);
}

export default NewHabitModal;
