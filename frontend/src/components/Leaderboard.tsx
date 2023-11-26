// Leaderboard.tsx

import React, {useEffect, useState} from 'react';
import {IonContent, IonLabel, IonSegment, IonSegmentButton} from '@ionic/react';
import LeaderboardStructure from "./LeaderboardStructure";
import Cookies from "js-cookie";

interface LeaderboardProps {
    usersData: any;
    groupData: any;
}

const Leaderboard: React.FC<LeaderboardProps> = ({usersData,groupData}) => {
    const [LeaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [LeaderboardGroupData, setLeaderboardGroupData] = useState([]);
    const [selectedSegment, setSelectedSegment] = useState<string>('tab1');
    const [labelGroupe, setLabelGroup] =useState<String>('');

    const handleSegmentChange = async (event: CustomEvent) => {
        setSelectedSegment(event.detail.value);
    };

    const fetchInsideGroupData = async (group) => {
        try {
            const response = await fetch(`http://localhost:3000/ranking/company/${group}`);

            if (response.ok) {
                const result = await response.json();
                setLeaderboardGroupData(result);
            } else {
                console.error('Failed to fetch data from the backend');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    let connected = Cookies.get("username");
    useEffect(() => {
        connected = Cookies.get("username");
        let data: any = [];
        if (selectedSegment === 'tab1') {
            data = usersData;
        } else if (selectedSegment === 'tab2') {
            data = LeaderboardGroupData;
        } else if (selectedSegment === 'tab3') {
            data = groupData;
        }
        const nomBoite = fetch(`http://localhost:3000/profile/${Cookies.get("username")}`).then( async(user) =>{
            let output = await user.json();
            if(output.company != undefined){
                setLabelGroup(output.company.name);
                fetchInsideGroupData(output.company.name);
            }
        });

        setLeaderboardData(data);
     },[selectedSegment]);

    return (
            <IonContent>
                <IonSegment onIonChange={handleSegmentChange}>
                    <IonSegmentButton value="tab1">
                        <IonLabel>Worldwide</IonLabel>
                    </IonSegmentButton>
                    {connected != undefined && labelGroupe != "" ? (<IonSegmentButton value="tab2">
                        <IonLabel>{labelGroupe}</IonLabel>
                    </IonSegmentButton>) : null}
                    <IonSegmentButton value="tab3">
                        <IonLabel>Group vs Group</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <LeaderboardStructure list={LeaderboardData}/>
            </IonContent>
    );
};

export default Leaderboard;
