import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { PageProps } from './PageProps';

const SettingPage: React.FC<PageProps> = () => (
	<>
		<IonHeader>
			<IonToolbar>
				<IonTitle>Setting</IonTitle>
			</IonToolbar>
		</IonHeader>
		<IonContent>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				Listen now content
			</div>
		</IonContent>
	</>
);

export default SettingPage;