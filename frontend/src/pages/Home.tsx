import { IonGrid, IonRow, IonCol, IonIcon, IonButton, IonContent, IonPage } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid fixed={true}>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" size-md="4">
            <IonButton href="http://localhost:3000/auth/github" expand="full" shape="round" color="dark">
              <IonIcon slot="start" icon={ logoGithub }></IonIcon>
              Sign in with Github
            </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid class="ion-justify-content-center">
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
