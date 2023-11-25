import { IonGrid, IonRow, IonCol, IonIcon, IonButton, IonContent, IonPage } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import Cookies from "js-cookie";
import './Home.css';
import { useEffect } from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {

  let token = Cookies.get("username");
  useEffect(( ) => {
    token = Cookies.get("username");
  })

  return (
    <IonPage>
      <Header />
      <IonContent>
          {token == undefined ? (
            <IonGrid fixed={true}>
            <IonRow class="ion-justify-content-center">
            <IonCol size="12" size-md="4">
            <IonButton className="ion-margin-top" href="http://localhost:3000/auth/github" expand="full" shape="round" color="dark">
              <IonIcon slot="start" icon={ logoGithub }></IonIcon>
              Sign in with Github
            </IonButton>
            </IonCol>
          </IonRow>
          </IonGrid>
          ): null}
        <IonGrid class="ion-justify-content-center">
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
