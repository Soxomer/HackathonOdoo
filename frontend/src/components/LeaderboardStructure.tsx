import React from "react";
import { IonRow, IonAvatar,IonLabel } from '@ionic/react';
import LeaderboardItem from './LeaderboardItem';
import {key} from "ionicons/icons";

interface UserDataType {
    name: string;
    url: string;
    score: string;
}

interface LeaderboardStructureProps {
    list: UserDataType[];
}

const LeaderboardStructure: React.FC<LeaderboardStructureProps> = ({list}) => {
  return (
    <>
        {
            list.map(({name,url,score}) => {
                return (
                    <LeaderboardItem key={name} name={name} url="https://ionicframework.com/docs/img/demos/avatar.svg" score={score}/>
                )
            })
        }

    </>
  );
};

export default LeaderboardStructure;
