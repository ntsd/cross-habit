import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, useIonActionSheet } from '@ionic/react';

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
	}, []);

	function dismiss() {
		console.log('dismiss');
		modal.current?.dismiss();
	}

	function canDismiss() {
		return new Promise<boolean>((resolve, reject) => {
			console.log('canDismiss');
			present({
				header: 'Are you sure?',
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
						reject();
					}
				},
			});
		});
	}

	return (
		<IonModal ref={modal} trigger={modalID} canDismiss={canDismiss} presentingElement={presentingElement!} >
			<IonHeader>
				<IonToolbar>
					<IonTitle>Modal</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => {
							console.log("test");
							dismiss();
						}}>Close</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<p>You will be prompted when closing this modal.</p>
			</IonContent>
		</IonModal>
	);
}

export default NewHabitModal;
