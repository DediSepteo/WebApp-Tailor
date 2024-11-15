// CreateProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomPopUp from '../components/CustomPopUp';
import SetupWizardPage from '../components/SetupWizardPage';

const CreateProductBulk = () => {
    const [org_id, setOrg_id] = useState('')
    const [prodList, setProdList] = useState({})
    const [dropDownInput, setDropDownInput] = useState([])

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

        if (!prodList.length || !org_id) {
            setShowError(true)
            return
        }
        const tableHeaders = fields[1].headers
        const requiredHeaders = []
        for (let i = 0; i < tableHeaders.length; i++) {
            if (tableHeaders[i].required)
                requiredHeaders.push(tableHeaders[i].title)
        }

        if (prodList.length) {
            const productsValid = prodList.every((product) => {
                for (let i = 0; i < product.length; i++) {
                    if (!requiredHeaders.includes(Object.keys(product)[i])) {
                        setShowError(true)
                        return false
                    }
                }
                var values = [product.name, product.price, product.description]
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
            const missingImages = prodList.some((product) => {
                if (!product.image) {
                    return true
                }
                return false
            })
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


    const handleRegister = async (e) => {
        try {
            const token = sessionStorage.getItem("token")
            if (!token)
                alert("Error retrieving token")
            else {
                console.log(org_id)
                const response = await fetch(`http://localhost:3000/api/product/register/${org_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(prodList)
                })
                if (!response) {
                    alert("Error registering products")
                    return
                }
                alert("Products registered!")
                // navigate("/admin/corporate/products")
            }
        }
        catch (error) {
            console.error('Error registering products');
        }
    }

    const fetchOrg_ids = async () => {
        try {
            await fetch("http://localhost:3000/api/org?type=corporate")
                .then(response => response.json())
                .then(orgs => {
                    const options = orgs.map((org) => ({
                        value: org.name,
                        id: org.id
                    }))
                    console.log(options)
                    setDropDownInput(options);
                })
        }
        catch {
            alert("Failed to connect to backend")
        }

    }

    useEffect(() => {
        fetchOrg_ids()
    }, [])


    const fields = [
        {
            fieldType: 'dropdown',
            label: 'For Organization',
            value: org_id,
            onChange: (e) => setOrg_id(e.target.value),
            required: true,
            options: dropDownInput
        },
        {
            fieldType: 'tableInput',
            label: 'Register Products',
            headers: [{ "title": "Name", "inputType": "input", "required": true }, { "title": "Price", "inputType": "input", "type": "number", "step": "0.01", "required": true }, { "title": "Description", "inputType": "textarea", "required": true }, { "title": "Image", "inputType": "upload" }],
            value: prodList,
            onChange: (e) => setProdList(e),
            required: true,
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
            < SetupWizardPage title="Register Multiple Products" fields={fields} onSubmit={handleSubmit} />
        </main>
    )
};

export default CreateProductBulk;
