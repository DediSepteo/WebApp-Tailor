import React, { useState } from 'react';
import SetupWizardPage from '../components/SetupWizardPage';
import CustomPopUp from '../components/CustomPopUp';
import { useNavigate } from 'react-router-dom';

const CreateOrganization = () => {
    const [orgName, setOrgName] = useState('');
    const [orgEmail, setOrgEmail] = useState('');
    const [orgPassword, setOrgPassword] = useState('');
    const [orgIndustry, setOrgIndustry] = useState('');
    const [orgAddress, setOrgAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [state, setState] = useState('');
    const [orgProducts, setOrgProducts] = useState([]);

    const [showError, setShowError] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const navigate = useNavigate();

    const toggleError = () => {
        setShowError(!showError);
    };
    const toggleWarning = () => {
        setShowWarning(!showWarning);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate required fields and products as in the original code...
        handleRegister(e);
    };

    const handleRegister = async (event) => {
        const orgType = window.location.href.includes("corporate") ? "Corporate" : "Government";
        event.preventDefault();
        try {
            fetch('http://localhost:3000/api/org/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": orgName,
                    "email": orgEmail,
                    "password": orgPassword,
                    "type": orgType,
                    "industry": orgIndustry,
                    "address": orgAddress,
                    "city": city,
                    "country": country,
                    "address_line1": addressLine1,
                    "address_line2": addressLine2,
                    "postal_code": postalCode,
                    "state": state,
                }),
            })
                .then(response => {
                    if (!response.ok) throw new Error('Error creating organization');
                    return response.json();
                })
                .then(response => {
                    if (orgProducts.length) {
                        fetch(`http://localhost:3000/api/product/register/${response.data.insertId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(orgProducts),
                        })
                            .then(productResponse => {
                                if (!productResponse.ok) throw new Error('Error creating products for organization');
                                alert("Organization created and products registered!");
                                navigate("/admin/corporate/orgs");
                            });
                    } else {
                        alert("Organization created!");
                        navigate("/admin/corporate/orgs");
                    }
                });
        } catch (error) {
            console.error('Error creating organization');
            alert("Error creating organization");
        }
    };

    const fields = [
        { fieldType: 'input', label: 'Organization Name', type: 'text', value: orgName, onChange: (e) => setOrgName(e.target.value), required: true },
        { fieldType: 'input', label: 'Organization Email', type: 'text', value: orgEmail, onChange: (e) => setOrgEmail(e.target.value), required: true },
        { fieldType: 'input', label: 'Organization Password', type: 'password', value: orgPassword, onChange: (e) => setOrgPassword(e.target.value), required: true },
        { fieldType: 'input', label: 'Organization Address', type: 'text', value: orgAddress, onChange: (e) => setOrgAddress(e.target.value), required: true },
        { fieldType: 'input', label: 'City', type: 'text', value: city, onChange: (e) => setCity(e.target.value), required: true },
        { fieldType: 'input', label: 'Country', type: 'text', value: country, onChange: (e) => setCountry(e.target.value), required: true },
        { fieldType: 'input', label: 'Address Line 1', type: 'text', value: addressLine1, onChange: (e) => setAddressLine1(e.target.value), required: true },
        { fieldType: 'input', label: 'Address Line 2', type: 'text', value: addressLine2, onChange: (e) => setAddressLine2(e.target.value), required: false },
        { fieldType: 'input', label: 'Postal Code', type: 'text', value: postalCode, onChange: (e) => setPostalCode(e.target.value), required: true },
        { fieldType: 'input', label: 'State', type: 'text', value: state, onChange: (e) => setState(e.target.value), required: true },
        {
            fieldType: 'dropdown',
            label: 'Organization Industry',
            type: 'text',
            value: orgIndustry,
            onChange: (e) => setOrgIndustry(e.target.value),
            required: true,
            options: [
                { value: "Technology" }, { value: "Finance" }, { value: "Healthcare" },
                { value: "Manufacturing" }, { value: "Retail" }, { value: "Real Estate" },
                { value: "Transportation and Logistics" }, { value: "Construction" },
                { value: "Marketing and Advertising" }, { value: "Others" }
            ]
        },
        {
            fieldType: 'tableInput',
            label: 'Register Product (Optional)',
            headers: [
                { title: "Name", inputType: "input" },
                { title: "Price", inputType: "input", type: "number", step: "0.01" },
                { title: "Description", inputType: "textarea", isInputLong: true },
                { title: "Image", inputType: "upload" }
            ],
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
            <SetupWizardPage title="Register Organization" fields={fields} onSubmit={handleSubmit} />
        </main>
    );
};

export default CreateOrganization;
