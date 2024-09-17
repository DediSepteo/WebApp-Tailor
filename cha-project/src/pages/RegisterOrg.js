// CreateOrganization.js
import React, { useState } from 'react';
import SetupWizardPage from '../components/SetupWizardPage';
import CustomPopUp from '../components/CustomPopUp';

const CreateOrganization = () => {
    const [orgName, setOrgName] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [orgSize, setOrgSize] = useState('');
    const [orgIndustry, setOrgIndustry] = useState('');
    const [orgProducts, setOrgProducts] = useState([])

    const [showPopup, setShowPopup] = useState(false);

    const togglePopUp = () => {
        setShowPopup(!showPopup); // Show popup when you want
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle org creation logic
        const tableHeaders = Object.keys(fields[4].headers)
        console.log(tableHeaders)
        orgProducts.forEach((product) => {
            if (Object.keys(product).length !== tableHeaders.length) {
                setShowPopup(true)
                return
            }
        })
        return console.log('Org Created:', { orgName, orgEmail, orgSize, orgIndustry, orgProducts });
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
            fieldType: 'dropdown',
            label: 'Organization Size',
            type: 'text',
            value: orgSize,
            onChange: (e) => setOrgSize(e.target.value),
            required: true,
            options: [{ "value": "1-10" }, { "value": "11-49" }, { "value": "50-249" }, { "value": ">250" }]
        },
        {
            fieldType: 'dropdown',
            label: 'Organization Industry',
            type: 'text',
            value: orgIndustry,
            onChange: (e) => setOrgIndustry(e.target.value),
            required: true,
            options: [{ "value": "Healthcare" }, { "value": "Construction" }, { "value": "Technology" }, { "value": "Education" }]
        },
        {
            fieldType: 'tableInput',
            label: 'Register Product (Optional)',
            headers: [{ "title": "Name", "inputType": "input" }, { "title": "Price", "inputType": "input", "type": "number", "step": "0.01" }, { "title": "Description", "inputType": "input", "isInputLong": true }, { "title": "Image", "inputType": "upload" }],
            value: orgProducts,
            onChange: (e) => setOrgProducts(e),
            required: false,
        },
    ];

    return (
        <main>
            {showPopup && (
                <CustomPopUp togglePopup={togglePopUp} title="Warning" text="Please ensure that all fields are filled for all registered products" />
            )}
            < SetupWizardPage title="Create Organization" fields={fields} onSubmit={handleSubmit} />
        </main>
    )
};

export default CreateOrganization;
