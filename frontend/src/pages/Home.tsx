import { IonGrid, IonRow, IonCol, IonIcon, IonButton, IonContent, IonPage } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import axios from 'axios';
import './Home.css';

const Home: React.FC = () => {
  const fetchDataFromApi = async () => {
    const url = 'https://127.0.0.1:3000/';

    try {
      const response = await axios.get(url);
      console.log('Fetched data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <IonPage>
      <IonContent>
        <IonGrid fixed={true}>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" size-md="4">
            <IonButton onClick={fetchDataFromApi} expand="full" shape="round" color="dark">
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
