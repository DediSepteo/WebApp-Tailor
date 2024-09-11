// CreateOrganization.js
import React, { useState } from 'react';
import SetupWizardPage from '../components/SetupWizardPage';

const CreateOrganization = () => {
    const [orgName, setOrgName] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [orgSize, setOrgSize] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle org creation logic
        console.log('Org Created:', { orgName, orgEmail });
    };

    const fields = [
        {
            fieldType: 'input',
            label: 'Organization Name',
            type: 'text',
            value: orgName,
            onChange: (e) => setOrgName(e.target.value),
            required: true,
        },
        {
            fieldType: 'input',
            label: 'Organization Email',
            type: 'text',
            value: orgEmail,
            onChange: (e) => setOrgEmail(e.target.value),
            required: true,
        },
        {
            fieldType: 'input',
            label: 'Organization Size',
            type: 'text',
            value: orgSize,
            onChange: (e) => setOrgSize(e.target.value),
            required: true,
        },
    ];

    return <SetupWizardPage title="Create Organization" fields={fields} onSubmit={handleSubmit} />;
};

export default CreateOrganization;
