// Leaderboard.tsx

import React, {useEffect, useState} from 'react';
import {IonContent, IonLabel, IonSegment, IonSegmentButton} from '@ionic/react';
import LeaderboardStructure from "./LeaderboardStructure";
import Cookies from "js-cookie";

interface LeaderboardProps {
    usersData: any;
}

const Leaderboard: React.FC<LeaderboardProps> = ({usersData}) => {
    const [LeaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [selectedSegment, setSelectedSegment] = useState<string>('tab1');
    const [labelGroupe, setLabelGroup] =useState<String>('');

    const handleSegmentChange = async (event: CustomEvent) => {
        setSelectedSegment(event.detail.value);
    };

    let connected = Cookies.get("username");
    useEffect(() => {
        connected = Cookies.get("username");
        let data: any = [];
        if (selectedSegment === 'tab1') {
            data = usersData;
        } else if (selectedSegment === 'tab2') {
            data = [
                {pseudo: 'Tab2 User1', eventSum: 80, urlAvatar:"https://ionicframework.com/docs/img/demos/avatar.svg"},
                {pseudo: 'Tab2 User2', eventSum: 70, urlAvatar:"https://ionicframework.com/docs/img/demos/avatar.svg"},
            ];
        } else if (selectedSegment === 'tab3') {
            data = [
                {pseudo: 'Tab3 User1', eventSum: 60, urlAvatar:"https://ionicframework.com/docs/img/demos/avatar.svg"},
                {pseudo: 'Tab3 User2', eventSum: 50, urlAvatar:"https://ionicframework.com/docs/img/demos/avatar.svg"},
            ];
        }
        const nomBoite = fetch(`http://localhost:3000/profile/${Cookies.get("username")}`).then( async(user) =>{
            let output = await user.json();
            if(output.company != undefined){
                setLabelGroup(output.company.name);
            }
            console.log(labelGroupe);
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
