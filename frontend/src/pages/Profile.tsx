import {IonAvatar, IonCol, IonContent, IonGrid, IonLabel, IonPage, IonRow} from "@ionic/react";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import Header from "../components/Header";
import './Profile.css';

const Profile: React.FC = () => {
    const [data, setData] = useState([]);
    const username = Cookies.get("username");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/profile/' + username);
          
          if (response.ok) {
            const result = await response.json();
            setData(result);
          } else {
            console.error('Failed to fetch data from the backend');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <IonPage>
            <Header />
            <IonContent>
                <IonGrid>
                    <IonRow class="ion-justify-content-center">
                        <IonCol size="3">
                            <IonAvatar>
                                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                            </IonAvatar>
                        </IonCol>
                        <IonCol size="12">
                            //@ts-ignore
                            <IonLabel key={data.id}>{data.pseudo}</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Profile;
