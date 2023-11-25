import { IonSegment, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonContent, IonPage, IonList } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import LeaderboardStructure from '../components/LeaderboardStructure';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
      <IonSegment value="default">
        <IonSegmentButton value="default">
          <IonLabel>Default</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="segment">
          <IonLabel>Segment</IonLabel>
        </IonSegmentButton>
      </IonSegment>
        <IonGrid fixed={true}>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" size-md="4">
            <IonButton expand="full" shape="round" color="dark">
              <IonIcon slot="start" icon={ logoGithub }></IonIcon>
              Sign in with Github
            </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid class="ion-justify-content-center">
          <LeaderboardStructure />
        </IonGrid>
        {/* <ExploreContainer /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
