import React from "react";
import { IonCol, IonAvatar,IonLabel, IonItem, IonRow } from '@ionic/react';


interface LeaderboardProps {
    name: string,
    url: string,    
    score: Int16Array,
    classname?: string
}

const LeaderboardItem: React.FC<LeaderboardProps> = ({url, name, score, classname}) => {
  return (
    <IonRow class="ion-justify-content-center ion-align-items-center">
        <IonCol className="item-background-color" size="10" size-md="5">
            <IonItem className={classname}>
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
