import { IonButton, IonButtons, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import Cookies from "js-cookie";
import { home, logOut, personCircleOutline } from 'ionicons/icons';
import { useEffect } from 'react';


const Header: React.FC = () => {
    let token = Cookies.get("username");
    useEffect(( ) => {
      token = Cookies.get("username");
    })
  
    function nukeCookies(){
      Cookies.remove("username");
    }
  
  return (
    <IonToolbar>
        <IonButtons slot="start">
        <IonButton href="/">
            <IonIcon slot="icon-only" icon={ home }></IonIcon>
          </IonButton>
        </IonButtons>
        <IonButtons slot="secondary">
        {token != undefined ? (<>
        <IonButton href="/profile">
            <IonIcon slot="icon-only" icon={ personCircleOutline }></IonIcon>
          </IonButton>
        <IonButton href="http://localhost:3000/logout" onClick={nukeCookies}>
            <IonIcon slot="icon-only" icon={ logOut }></IonIcon>
          </IonButton>
          </>) : null}
        </IonButtons>
      </IonToolbar>
  );
};

export default Header;
