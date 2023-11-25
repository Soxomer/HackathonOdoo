import { IonGrid, IonRow, IonCol, IonIcon, IonButton, IonContent, IonPage, IonList } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import LeaderboardItem from '../components/LeaderboardItem';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
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
        <IonList>
        <LeaderboardItem name="test" url="2" />

        </IonList>
        {/* <ExploreContainer /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
