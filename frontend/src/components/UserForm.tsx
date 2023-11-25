// MyFormComponent.tsx

import React, {useState} from 'react';
import {IonButton, IonInput, IonSelect, IonSelectOption} from '@ionic/react';

const UserForm: React.FC = () => {
    const [input1, setInput1] = useState<string>('');
    const [input2, setInput2] = useState<string>('');
    const [showInput3, setShowInput3] = useState<boolean>(false);
    const [input3, setInput3] = useState<string>('');

    const handleButtonPress = () => {
        setShowInput3(!showInput3);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form submitted with inputs:', input1, input2, input3);
        // Add your logic to handle the form data
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input 1 */}
            <IonSelect
                placeholder="Select the repos you want to track"
                value={input1}
                multiple
                onIonChange={(e) => setInput1(e.detail.value)}
            >
                <IonSelectOption value="option1">Option 1</IonSelectOption>
                <IonSelectOption value="option2">Option 2</IonSelectOption>
            </IonSelect>

            {/* Input 2 */}
            <IonSelect
                placeholder="Select the office you want to join"
                value={input2}
                onIonChange={(e) => setInput2(e.detail.value)}
            >
                <IonSelectOption value="optionA">Option A</IonSelectOption>
                <IonSelectOption value="optionB">Option B</IonSelectOption>
            </IonSelect>

            {/* Button to toggle visibility of Input 3 */}
            <IonButton onClick={handleButtonPress}>
                {showInput3 ? 'Add your office' : 'Skip this step'}
            </IonButton>

            {showInput3 && (
                <IonInput
                    placeholder="Add your office">
                </IonInput>
            )}

            {/* Submit button */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
