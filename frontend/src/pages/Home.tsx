import { IonGrid, IonRow, IonCol, IonIcon, IonButton, IonContent, IonPage } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import {IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow, IonToolbar} from '@ionic/react';
import {logoGithub, logOut, personCircleOutline} from 'ionicons/icons';
import Cookies from "js-cookie";
import './Home.css';
import { useEffect } from 'react';
import Header from '../components/Header';
import UserForm from "../components/UserForm";

const Home: React.FC = () => {

    let token = Cookies.get("username");
    useEffect(() => {
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
                                    <IonButton className="ion-margin-top" href="http://localhost:3000/auth/github"
                                               expand="full" shape="round" color="dark">
                                        <IonIcon slot="start" icon={logoGithub}></IonIcon>
                                        Sign in with Github
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    ) :
                    <IonGrid class="ion-justify-content-center">
                        <UserForm/>
                    </IonGrid>
                }
            </IonContent>
        </IonPage>
    );
};

export default Home;
