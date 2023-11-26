import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonModal,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react'
import {logoGithub} from 'ionicons/icons';
import Cookies from "js-cookie";
import './Home.css';
import {useEffect, useRef, useState} from 'react';
import Header from '../components/Header';
import UserForm from "../components/UserForm";
import Leaderboard from '../components/Leaderboard';
import {OverlayEventDetail} from '@ionic/react/dist/types/components/react-component-lib/interfaces';

const Home: React.FC = () => {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const [message, setMessage] = useState(
        'This modal example uses triggers to automatically open a modal when the button is clicked.'
    );

    function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            setMessage(`Hello, ${ev.detail.data}!`);
        }
    }

    const [usersData, setUsersData] = useState([]);

    let token = Cookies.get("username");
    useEffect(() => {
        token = Cookies.get("username");
        const fetchAllData = async () => {
            try {
                const response = await fetch('http://localhost:3000/ranking/users');

                if (response.ok) {
                    const result = await response.json();
                    setUsersData(result);
                } else {
                    console.error('Failed to fetch data from the backend');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchAllData();
    })

    return (
        <IonPage>
            <Header/>
            <IonContent>
                <IonButton id="open-modal" expand="block">
                    Open
                </IonButton>
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
                    ) : null
                }
                <Leaderboard usersData={usersData}/>
                <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonHeader>
                        <IonToolbar class="ion-text-center">
                            <IonTitle>Setup your account</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <UserForm/>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Home;
