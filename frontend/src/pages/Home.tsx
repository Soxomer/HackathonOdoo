import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonImg,
    IonPage,
    IonRow,
    IonTitle,

} from '@ionic/react'
import {logoGithub} from 'ionicons/icons';
import Cookies from "js-cookie";
import './Home.css';
import {useEffect, useRef, useState} from 'react';
import Header from '../components/Header';
import Leaderboard from '../components/Leaderboard';

const Home: React.FC = () => {

    const [usersData, setUsersData] = useState([]);
    const [groupData, setGroupData] = useState([]);

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

    const fetchGroupData = async () => {
        try {
            const response = await fetch('http://localhost:3000/ranking/company');

            if (response.ok) {
                const result = await response.json();
                setGroupData(result);
            } else {
                console.error('Failed to fetch data from the backend');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    let token = Cookies.get("username");
    useEffect(() => {
        token = Cookies.get("username");
    })
    fetchAllData();
    fetchGroupData();

    return (
        <IonPage>
            <Header/>
            <IonContent>
                <IonGrid fixed={true} >
                    <IonRow id="home-title" class="ion-justify-content-center align-items-center">
                        <IonCol class="ion-justify-content-center align-items-center" size="6">
                            <div>
                                <h1 className="ion-text-uppercase ion-text-bold">OlymPush : Unleash Your Potential</h1>
                                <p>The more you code, the more badges you earn, marking your trail of excellence.</p>
                            </div>
                        </IonCol>
                        <IonCol size="6">
                            <IonImg id="home-img" src="../../assets/programmer-img.svg"></IonImg>
                        </IonCol>
                    </IonRow>
                </IonGrid>
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
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="12">
                            <IonTitle className="ion-text-center ion-text-uppercase ff-abril ion-margin-top"><h2>Leaderboard</h2></IonTitle>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <Leaderboard usersData={usersData} groupData={groupData}/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
