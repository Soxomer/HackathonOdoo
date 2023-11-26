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
  const [listOfcompanies, setListOfcompanies] = useState<string[]>([])

  const handleButtonPress = () => {
    setShowInput3(!showInput3);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // add new company to the list
    if (input3 !== '') {
      setListOfcompanies([...listOfcompanies, input3]);
      // add new company to the backend
      fetch('http://localhost:3000/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: input3}),
      });
    }
    if (input1 !== '') {
      // const repos = input1.map((repo: string) => {
      //     return {fullname: repo}
      // })
      // fetch(`http://localhost:3000/profile/${Cookies.get('username')}`, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({repos}),
      // });
    }

    if (input2 !== '') {
      fetch(`http://localhost:3000/profile/${Cookies.get('username')}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({office: input2}),
      });
    }

    console.log('Form submitted with inputs:', input1, input2, input3);
    // Add your logic to handle the form data
  };

  const getListOfRepos = async () => {
    const token = Cookies.get('github_token');
    const response = await fetch(`https://api.github.com/user/repos`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `Bearer ${token}`
      }
    });
    const repos = await response.json();
    setListOfRepos(repos);
    return repos;
  }

  const getListOfCompany = async () => {
    const response = await fetch(`http://localhost:3000/company`);
    const companies = await response.json();
    setListOfcompanies(companies);
    return companies;
  }

  useEffect(() => {
    getListOfRepos();
    getListOfCompany();
  }, []);
    return (
        <form onSubmit={handleSubmit}>
            {/* Input 1 */}
            <IonSelect label="Select the repos you want us to track" labelPlacement="stacked"
                placeholder="My super duper repo"
                multiple
                onIonChange={(e) => setInput1(e.detail.value)}
            >
                {listOfRepos.map((repo,index) => (
                    // @ts-ignore
                    <IonSelectOption key={index} value={repo.fullname}>{repo.name}</IonSelectOption>
                ))}
            </IonSelect>

            {/* Input 2 */}
            <IonSelect label="Select the group you'd like to be a part of" labelPlacement="stacked"
                placeholder="My awesome group"
                onIonChange={(e) => setInput2(e.detail.value)}
            >
                {listOfcompanies.map((office, index) => (
                    //@ts-ignore
                    <IonSelectOption key={index} value={office.name}>{office.name}</IonSelectOption>
                ))}
            </IonSelect>

            {showInput3 && (
                <IonInput label="Select the group you'd like to be a part of" labelPlacement="stacked"
                    onIonInput={(e: any) => setInput3(e.target.value)}
                    placeholder="Odoo ?!">
                </IonInput>
            )}

            {/* Input 3 */}
            <IonButton className="ion-margin-top" onClick={handleButtonPress}>
                {showInput3 ? 'Hide \"Add group\" input' : 'Show \"Add group\" input'}
            </IonButton>



            {/* Submit button */}
            <IonButton className="ion-margin-top" type="submit">Submit</IonButton>
        </form>
    );
};

export default UserForm;
