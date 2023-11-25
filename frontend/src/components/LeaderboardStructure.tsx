import React from "react";
import { IonRow, IonAvatar,IonLabel } from '@ionic/react';
import LeaderboardItem from './LeaderboardItem';
import {key} from "ionicons/icons";

interface UserDataType {
    pseudo: string;
    eventsCount: Int16Array;
}

interface LeaderboardStructureProps {
    list: UserDataType[];
}

const LeaderboardStructure: React.FC<LeaderboardStructureProps> = ({list}) => {
  return (
    <>
        {
            list.map(({pseudo,eventsCount}) => {
                return (
                    <LeaderboardItem key={pseudo} name={pseudo} url="https://ionicframework.com/docs/img/demos/avatar.svg" score={eventsCount}/>
                )
            })
        }

    </>
  );
};

export default LeaderboardStructure;
