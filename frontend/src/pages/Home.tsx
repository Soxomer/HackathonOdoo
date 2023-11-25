import {IonButton, IonCol, IonContent, IonGrid, IonIcon, IonPage, IonRow} from '@ionic/react'
import {logoGithub} from 'ionicons/icons';
import Cookies from "js-cookie";
import './Home.css';
import {useEffect, useState} from 'react';
import Header from '../components/Header';
import UserForm from "../components/UserForm";
import Leaderboard from '../components/Leaderboard';

const Home: React.FC = () => {
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
                    <><IonGrid class="ion-justify-content-center">
                        <UserForm/>
                    </IonGrid>
                    </>
                }
                <Leaderboard usersData={usersData}/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
