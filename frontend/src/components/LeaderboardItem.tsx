import React from "react";
import { IonItem, IonAvatar,IonLabel } from '@ionic/react';


interface LeaderboardProps {
    name: string,
    url: string
}

const LeaderboardItem: React.FC<LeaderboardProps> = ({url, name}) => {
  return (
    <IonItem>
      <IonAvatar aria-hidden="true" slot="start">
        <img alt="" src={url} />
      </IonAvatar>
      <IonLabel>{name}</IonLabel>
    </IonItem>
  );
};

export default LeaderboardItem;
