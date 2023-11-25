import { IonButtons, IonMenuButton, IonMenu, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonContent, IonPage } from '@ionic/react';
import { logOut, logoGithub, personAddOutline, personCircleOutline, personOutline, search } from 'ionicons/icons';
import Cookies from "js-cookie";
import './Home.css';
import { Profiler, useEffect } from 'react';

const Home: React.FC = () => {

  let token = Cookies.get("username");
  useEffect(( ) => {
    token = Cookies.get("username");
  })

  function nukeCookies(){
    Cookies.remove("username");
  }

  return (
    <IonPage>
    <IonToolbar>
        {token != undefined ? (
        <IonButtons slot="secondary">
        <IonButton>
            <IonIcon slot="icon-only" icon={ personCircleOutline }></IonIcon>
          </IonButton>
        <IonButton href="http://localhost:3000/logout" onClick={nukeCookies}>
            <IonIcon slot="icon-only" icon={ logOut }></IonIcon>
          </IonButton>
        </IonButtons>
        ) : null}
      </IonToolbar>
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
