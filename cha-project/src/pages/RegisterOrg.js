// CreateOrganization.js
import React, { useState } from 'react';
import SetupWizardPage from '../components/SetupWizardPage';
import CustomPopUp from '../components/CustomPopUp';

const CreateOrganization = () => {
    const [orgName, setOrgName] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [orgPassword, setOrgPassword] = useState('')
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
        handleRegister(e)
    };

    const handleRegister = async (event) => {
        const orgType = window.location.href.includes("corporate") ? "Corporate" : "Government"
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/org/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "name": orgName,
                        "email": orgEmail,
                        "password": orgPassword,
                        "type": orgType,
                        "industry": orgIndustry,
                    }),
            });

            if (!response.ok) {
                throw new Error('Error creating organization');
            }

            alert("Organization created!")
        } catch (error) {
            console.error('Error creating organization');
        }
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
            label: 'Organization Password',
            type: 'text',
            value: orgPassword,
            onChange: (e) => setOrgPassword(e.target.value),
            required: true,
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
