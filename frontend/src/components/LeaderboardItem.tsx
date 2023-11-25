import React from "react";
import { IonCol, IonAvatar,IonLabel, IonItem, IonRow } from '@ionic/react';


interface LeaderboardProps {
    name: string,
    url: string,
    score: string
}

const LeaderboardItem: React.FC<LeaderboardProps> = ({url, name, score}) => {
  return (
    <IonRow class="ion-justify-content-center ion-align-items-center">
        <IonCol size="10" size-md="5">
            <IonItem>
                <IonAvatar aria-hidden="true" slot="start">
                    <img alt="" src={url} />
                </IonAvatar>
                <IonLabel>{name}</IonLabel>
                <IonLabel class="ion-text-right">{score} pts</IonLabel>
            </IonItem>
        </IonCol>
    </IonRow>
  );
};

export default LeaderboardItem;
