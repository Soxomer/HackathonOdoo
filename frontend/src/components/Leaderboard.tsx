// Leaderboard.tsx

import React, {useEffect, useState} from 'react';
import {IonContent, IonLabel, IonSegment, IonSegmentButton, IonTitle} from '@ionic/react';
import LeaderboardStructure from "./LeaderboardStructure";

interface LeaderboardProps {
    usersData: any;
}

const Leaderboard: React.FC<LeaderboardProps> = ({usersData}) => {
    const [LeaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [selectedSegment, setSelectedSegment] = useState<string>('tab1');

    const handleSegmentChange = (event: CustomEvent) => {
        console.log('handleSegmentChange')
        setSelectedSegment(event.detail.value);
    };

    useEffect(() => {
        console.log('useEffect')
        let data: any = [];
        if (selectedSegment === 'tab1') {
            data = usersData;
        } else if (selectedSegment === 'tab2') {
            data = [
                {name: 'Tab2 User1', score: 80},
                {name: 'Tab2 User2', score: 70},
            ];
        } else if (selectedSegment === 'tab3') {
            data = [
                {name: 'Tab3 User1', score: 60},
                {name: 'Tab3 User2', score: 50},
            ];
        }
        setLeaderboardData(data);
    }, [selectedSegment]);

    return (
        <IonContent>
            <IonSegment onLoad={handleSegmentChange} onIonChange={handleSegmentChange}>
                <IonSegmentButton value="tab1">
                    <IonLabel>World</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="tab2">
                    <IonLabel>Boite</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="tab3">
                    <IonLabel>Boite Vs Boite</IonLabel>
                </IonSegmentButton>
            </IonSegment>
            <LeaderboardStructure list={LeaderboardData}/>
        </IonContent>
    );
};

export default Leaderboard;
