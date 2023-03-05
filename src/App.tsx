import React from 'react';
import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Welcome to my Ionic React app!</p>
      </IonContent>
    </IonApp>
  );
};

export default App;