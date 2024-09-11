// CreateStore.js
import React, { useState } from 'react';
import SetupWizardPage from '../components/SetupWizardPage';

const CreateStore = () => {
    const [storeName, setStoreName] = useState('');
    const [storeLocation, setStoreLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle store creation logic
        console.log('Store Created:', { storeName, storeLocation });
    };

    const fields = [
        {
            fieldType: 'input',
            label: 'Store Name',
            type: 'text',
            value: storeName,
            onChange: (e) => setStoreName(e.target.value),
            placeholder: 'Enter store name',
            required: true,
        },
        {
            fieldType: 'input',
            label: 'Store Location',
            type: 'text',
            value: storeLocation,
            onChange: (e) => setStoreLocation(e.target.value),
            placeholder: 'Enter store location',
            required: true,
        },
    ];

    return <SetupWizardPage title="Create Store" fields={fields} onSubmit={handleSubmit} />;
};

export default CreateStore;
