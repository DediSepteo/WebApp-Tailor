// CreateProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomPopUp from '../components/CustomPopUp';
import SetupWizardPage from '../components/SetupWizardPage';

const CreateProduct = () => {
    const [prodName, setProdName] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [orgName, setOrgName] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [prodImg, setProdImg] = useState('');
    const [dropDownInput, setDropDownInput] = useState([])

    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate()

    const togglePopUp = () => {
        setShowPopup(!showPopup); // Show popup when you want
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {
            "name": prodName,
            "price": prodPrice,
            "description": prodDesc
        }
        for (const item in dropDownInput) {
            if (dropDownInput[item].value == orgName) {
                body.org_id = dropDownInput[item].id
                break
            }
        }
        console.log(body)
        const token = sessionStorage.getItem("token")
        if (!token)
            alert("Error retrieving token")
        else {
            try {
                const response = await fetch("http://localhost:3000/api/product/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                })
                if (!response.ok) {
                    throw new Error('Error creating product');
                }

                alert("Product created!")
                navigate("/admin/corporate/products")
            }

            catch (error) {
                console.error('Error creating product');
            }
        }

    }

    const fetchOrgNames = async () => {
        await fetch("http://localhost:3000/api/org/corp")
            .then(response => response.json())
            .then(orgs => {
                const options = orgs.map((org) => ({
                    value: org.name,
                    id: org.org_id
                }))
                console.log(options)
                setDropDownInput(options);
            })

    }

    useEffect(() => {
        fetchOrgNames()
    }, [])


    const fields = [
        {
            fieldType: 'input',
            label: 'Product Name',
            value: prodName,
            onChange: (e) => setProdName(e.target.value),
            required: true,
        },
        {
            fieldType: 'input',
            label: 'Product Price',
            type: 'number',
            value: prodPrice,
            onChange: (e) => setProdPrice(e.target.value),
            required: true,
        },
        {
            fieldType: 'dropdown',
            label: 'For Organization',
            type: 'text',
            value: orgName,
            onChange: (e) => setOrgName(e.target.value),
            required: true,
            options: dropDownInput
        },
        {
            fieldType: 'textarea',
            label: 'Product Description',
            value: prodDesc,
            onChange: (e) => setProdDesc(e.target.value),
            required: true,
        },
        {
            fieldType: 'upload',
            label: 'Product Image',
            value: prodImg,
            onChange: (e) => setProdImg(e.target.value),
            required: true,
        },
    ];
    return (
        <main>
            {showPopup && (
                <CustomPopUp togglePopup={togglePopUp} title="Warning" text="Please ensure that all fields are filled for all registered products" />
            )}
            < SetupWizardPage title="Register Product" fields={fields} onSubmit={handleSubmit} />
        </main>
    )
};

export default CreateProduct;
