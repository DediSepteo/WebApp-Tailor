// CreateOrganization.js
import React, { useState } from 'react';
import SetupWizardPage from '../components/SetupWizardPage';
import CustomPopUp from '../components/CustomPopUp';
import { useNavigate } from 'react-router-dom';

const CreateOrganization = () => {
    const [orgName, setOrgName] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [orgPassword, setOrgPassword] = useState('')
    const [orgIndustry, setOrgIndustry] = useState('');
    const [orgProducts, setOrgProducts] = useState([])

    const [showError, setShowError] = useState(false);
    const [showWarning, setShowWarning] = useState(false)

    const navigate = useNavigate()

    const toggleError = () => {
        setShowError(!showError); // Show popup when you want
    };
    const toggleWarning = () => {
        setShowWarning(!showWarning)
    }


    const handleSubmit = (e) => {
        e.preventDefault();


        const tableHeaders = fields[1].headers
        const requiredHeaders = []
        for (let i = 0; i < tableHeaders.length; i++) {
            if (tableHeaders[i].required)
                requiredHeaders.push(tableHeaders[i].title)
        }

        if (orgProducts.length) {
            const productsValid = orgProducts.every((product) => {
                for (let i = 0; i < product.length; i++) {
                    if (!requiredHeaders.includes(Object.keys(product)[i])) {
                        setShowError(true)
                        return false
                    }
                }
                var values = [product.Name, product.Price, product.Description]
                if (values.includes(undefined)) {
                    return false
                }
                const requiredValues = values.map((value) => { return value.trim() })
                if (requiredValues.includes("")) {
                    setShowError(true)
                    return false
                }
                return true
            })
            const missingImages = orgProducts.some((product) => {
                if (!product.Image) {
                    return true
                }
                return false
            })
            console.log(orgProducts)
            if (productsValid) {
                if (missingImages) {
                    setShowWarning(true)
                }
                else {
                    handleRegister(e)
                }
            }
            else {
                setShowError(true)
            }
        }
        else {
            handleRegister(e)
        }

    }

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
            navigate("/admin/corporate/orgs")
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
            headers: [{ "title": "Name", "inputType": "input" }, { "title": "Price", "inputType": "input", "type": "number", "step": "0.01" }, { "title": "Description", "inputType": "textarea", "isInputLong": true }, { "title": "Image", "inputType": "upload" }],
            value: orgProducts,
            onChange: (e) => setOrgProducts(e),
            required: false,
        },
    ];

    return (
        <main>
            {showError && (
                <CustomPopUp togglePopup={toggleError} title="Error" text="Please ensure that all fields are filled for all registered products" />
            )}
            {showWarning && (
                <CustomPopUp togglePopup={toggleWarning} onConfirm={handleRegister} title="Warning" text="Some images are not filled. Placeholder images will be used for these products, are you sure you want to proceed?" hasCancel={true} />
            )}
            < SetupWizardPage title="Register Organization" fields={fields} onSubmit={handleSubmit} />
        </main>
    )
};

export default CreateOrganization;
