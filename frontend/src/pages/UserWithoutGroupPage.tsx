import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React from "react";
import Leaderboard from "../components/Leaderboard";
import {IonContent, IonHeader, IonPage, IonToolbar} from "@ionic/react";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    // add button to join group
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Leaderboard/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
