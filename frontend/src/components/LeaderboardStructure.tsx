import React from "react";
import { IonRow, IonAvatar,IonLabel } from '@ionic/react';
import LeaderboardItem from './LeaderboardItem';
import {key} from "ionicons/icons";

interface UserDataType {
    pseudo: string;
    eventSum: Int16Array;
}

interface LeaderboardStructureProps {
    list: UserDataType[];
}

const LeaderboardStructure: React.FC<LeaderboardStructureProps> = ({list}) => {
  return (
    <div className="leaderboard">
        {
            list.map((item, index) => {
                if(index == 0) return <LeaderboardItem classname="first-item" key={index} name={item.pseudo} url="https://ionicframework.com/docs/img/demos/avatar.svg" score={item.eventSum}/>
                if(index == 1) return <LeaderboardItem classname="second-item" key={index} name={item.pseudo} url="https://ionicframework.com/docs/img/demos/avatar.svg" score={item.eventSum}/>
                if(index == 2) return <LeaderboardItem classname="third-item" key={index} name={item.pseudo} url="https://ionicframework.com/docs/img/demos/avatar.svg" score={item.eventSum}/>
                return (
                    <LeaderboardItem key={index} name={item.pseudo} url="https://ionicframework.com/docs/img/demos/avatar.svg" score={item.eventSum}/>
                )
            })
        }

    </div>
  );
};

export default LeaderboardStructure;
