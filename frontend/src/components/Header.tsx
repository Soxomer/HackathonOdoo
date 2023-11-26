import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonRouterLink, IonTitle, IonToolbar } from "@ionic/react";
import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import { home, logOut, personCircleOutline } from 'ionicons/icons';
import { useEffect } from 'react';
import UserForm from "./UserForm";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";


const Header: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
      'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
      modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {
          setMessage(`Hello, ${ev.detail.data}!`);
      }
  }
    let token = Cookies.get("username");
    useEffect(( ) => {
      token = Cookies.get("username");
    })
  
    function nukeCookies(){
      Cookies.remove("username");
    }
  
  return (
    <IonToolbar class="ion-padding">
        <IonTitle class="ff-abril"><IonRouterLink id="home-title" href="/">OlymPush</IonRouterLink></IonTitle>
        <IonButtons slot="secondary">
        {token != undefined ? (<>
          <IonButton id="open-modal" expand="block">
          Setup 
        </IonButton>  
        <IonButton href="/profile">
            <IonIcon slot="icon-only" icon={ personCircleOutline }></IonIcon>
          </IonButton>
        <IonButton href="http://localhost:3000/logout" onClick={nukeCookies}>
            <IonIcon slot="icon-only" icon={ logOut }></IonIcon>
          </IonButton>
          </>) : null}
        </IonButtons>
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonHeader>
                        <IonToolbar class="ion-text-center">
                            <IonTitle>Setup your account</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <UserForm/>
                    </IonContent>
                </IonModal>
      </IonToolbar>
  );
};

export default Header;
