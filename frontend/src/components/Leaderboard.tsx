// Leaderboard.tsx

import React, {useEffect, useState} from 'react';
import {IonContent, IonSegment, IonSegmentButton, IonTitle} from '@ionic/react';
import LeaderboardStructure from "./LeaderboardStructure";

// async function getListBoitesVsBoites() {
//     return await fetch('http://localhost:3000/boitesVsboites');
// }
//
// async function getListUsersVsUsers() {
//     return await fetch('http://localhost:3000/usersVsusers');
// }
//
// async function getListUsersBoitesVsUsersBoites() {
//     return await fetch('http://localhost:3000/usersboitesVsusersboites');
// }

interface LeaderboardProps {
    tab: string;
}



const Leaderboard: React.FC = () => {
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [selectedSegment, setSelectedSegment] = useState<string>('tab1');

    const handleSegmentChange = (event: CustomEvent) => {
        console.log('handleSegmentChange')
        setSelectedSegment(event.detail.value);
    };

    useEffect(() => {
        console.log('useEffect')
        // Fetch leaderboard data from your API
        // For now, let's use a sample data
        // const leaderBoardBoites = await getListBoitesVsBoites();
        // const leaderBoardUsers =await  getListUsersVsUsers();
        // const leaderBoardUsersBoites =await  getListUsersBoitesVsUsersBoites();
        let data: any = [];
        if (selectedSegment === 'tab1') {
            data = [
                {name: 'Tab1 User1', score: 100},
                {name: 'Tab1 User2', score: 90},
                // Add more users for Tab 1...
            ];
        } else if (selectedSegment === 'tab2') {
            data = [
                {name: 'Tab2 User1', score: 80},
                {name: 'Tab2 User2', score: 70},
                // Add more users for Tab 2...
            ];
        } else if (selectedSegment === 'tab3') {
            data = [
                {name: 'Tab3 User1', score: 60},
                {name: 'Tab3 User2', score: 50},
                // Add more users for Tab 3...
            ];
        }
        setLeaderboardData(data);
    }, [selectedSegment]);

    return (
        <IonContent>
            <IonSegment onIonChange={handleSegmentChange}>
                <IonSegmentButton value="tab1">
                    <IonTitle>Tab 1</IonTitle>
                </IonSegmentButton>
                <IonSegmentButton value="tab2">
                    <IonTitle>Tab 2</IonTitle>
                </IonSegmentButton>
                <IonSegmentButton value="tab3">
                    <IonTitle>Tab 3</IonTitle>
                </IonSegmentButton>
            </IonSegment>
            <LeaderboardStructure list={leaderboardData}/>
        </IonContent>
    );
};

export default Leaderboard;
