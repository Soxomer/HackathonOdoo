import React from "react";
import { IonRow, IonAvatar,IonLabel } from '@ionic/react';
import LeaderboardItem from './LeaderboardItem';



interface LeaderboardStructureProps {
}

const LeaderboardStructure: React.FC<LeaderboardStructureProps> = () => {
  return (
    <>
        <LeaderboardItem name="test 1" url="https://ionicframework.com/docs/img/demos/avatar.svg" score="2000"/>
        <LeaderboardItem name="test 2" url="https://ionicframework.com/docs/img/demos/avatar.svg" score="4000"/>
        <LeaderboardItem name="test 3" url="https://ionicframework.com/docs/img/demos/avatar.svg" score="1500"/>
    </>
  );
};

export default LeaderboardStructure;
