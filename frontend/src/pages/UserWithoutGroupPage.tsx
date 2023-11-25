import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import React , { useEffect }from "react";
import Leaderboard from "../components/Leaderboard";
import {IonContent, IonHeader, IonPage, IonToolbar} from "@ionic/react";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Leaderboard/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
