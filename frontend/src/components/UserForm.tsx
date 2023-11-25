// MyFormComponent.tsx

import React, {useEffect, useState} from 'react';
import {IonButton, IonInput, IonSelect, IonSelectOption} from '@ionic/react';
import Cookies from 'js-cookie';

const UserForm: React.FC = () => {
    const [input1, setInput1] = useState<string>('');
    const [input2, setInput2] = useState<string>('');
    const [showInput3, setShowInput3] = useState<boolean>(false);
    const [input3, setInput3] = useState<string>('');

    const [listOfRepos, setListOfRepos] = useState<string[]>([])
    const [listOfOffices, setListOfOffices] = useState<string[]>([])

    const handleButtonPress = () => {
        setShowInput3(!showInput3);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form submitted with inputs:', input1, input2, input3);
        // Add your logic to handle the form data
    };

    const getListOfRepos = async () => {
        const username = Cookies.get('username');
        if (username === undefined) return;
        const response = await fetch(`http://localhost:3000/user/${username}/repos`);
        const repos = await response.json();
        setListOfRepos(repos);
        return repos;
    }

    const getListOfOffices = async () => {
        const response = await fetch(`http://localhost:3000/offices`);
        const offices = await response.json();
        setListOfOffices(offices);
        return offices;
    }

    useEffect( () => {
        getListOfRepos();
        getListOfOffices();
    }, []);
    return (
        <form onSubmit={handleSubmit}>
            {/* Input 1 */}
            <IonSelect
                placeholder="Select the repos you want to track"
                value={input1}
                multiple
                onIonChange={(e) => setInput1(e.detail.value)}
            >
                {listOfRepos.map((repo) => (
                    <IonSelectOption key={repo} value={repo}>{repo}</IonSelectOption>
                ))}
            </IonSelect>

            {/* Input 2 */}
            <IonSelect
                placeholder="Select the office you want to join"
                value={input2}
                onIonChange={(e) => setInput2(e.detail.value)}
            >
                {listOfOffices.map((office) => (
                    <IonSelectOption key={office} value={office}>{office}</IonSelectOption>
                ))}
            </IonSelect>

            {/* Input 3 */}
            <IonInput onClick={handleButtonPress}>
                {showInput3 ? 'Don\'t add your office' : 'Add your office'}
            </IonInput>

            {showInput3 && (
                <IonInput
                    placeholder="Add your office">
                </IonInput>
            )}

            {/* Submit button */}
            <IonButton type="submit">Submit</IonButton>
        </form>
    );
};

export default UserForm;
