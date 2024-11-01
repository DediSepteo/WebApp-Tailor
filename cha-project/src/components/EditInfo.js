// CreateProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomPopUp from '../components/CustomPopUp';
import SetupWizardPage from '../components/SetupWizardPage';

const CreateProduct = () => {
    const [data, setData] = useState({})
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate()
    const location = useLocation();  // Hook to access location state
    const id = location.state?.id
    const fields = location.state?.fields
    const category = location.state?.category

    const togglePopUp = () => {
        setShowPopup(!showPopup);
    }

    const initData = {}
    fields.forEach((field) => {
        initData[field.key] = field.currentVal || ""
        field.value = initData[field.key]
        field.onChange = (e) => {
            field.currentVal = e.target.value
            setData((prevData) => ({
                ...prevData,
                [field.key]: e.target.value
            }))
        }
    })

    useEffect(() => {
        setData(initData)
    }, [])

    const handleEdit = async () => {
        var url = ""
        switch (category) {
            case ("product"):
                url = `http://localhost:3000/api/product/${id}`
                break;
            case ("organization"):
                url = `http://localhost:3000/api/org/${id}`
                break
            default:
                return
        }
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                alert(`${category} Edited!`)
                navigate("/admin/dashboard")
            }
            else {
                alert(`Failed to edit ${category}`);
            }
        }
        catch {
            alert("Failed to connect to backend")
        }

    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.keys(data).includes("price")) {
            if (data.price <= 0) {
                alert("Price must not be zero or negative")
                return
            }
        }
        handleEdit()
    }

    return (
        <main>
            {showPopup && (
                <CustomPopUp togglePopup={togglePopUp} title="Error" text="Please ensure that all fields are filled" />
            )}
            <SetupWizardPage title="Edit Information" fields={fields} onSubmit={handleSubmit} />
        </main>
    )
};

export default CreateProduct;
