import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import React from "react";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>UserWithoutPage</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer />
            </IonContent>
        </IonPage>
    );
};

export default Home;
