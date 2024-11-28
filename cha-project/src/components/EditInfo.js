// CreateProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import CustomPopUp from '../components/CustomPopUp';
import SetupWizardPage from '../components/SetupWizardPage';

const EditInfo = () => {
    const [data, setData] = useState({})
    const [showPopup, setShowPopup] = useState(false);

    const token = sessionStorage.getItem("authToken")


    const navigate = useNavigate()
    const location = useLocation();  // Hook to access location state
    const id = location.state?.id
    const fields = location.state?.fields
    const category = location.state?.category
    console.log(id, fields, category)

    const togglePopUp = () => {
        setShowPopup(!showPopup);
    }

    const initData = {}

    useEffect(() => {
        if (!id || !fields || !category) {
            navigate('/admin/dashboard')
        }
        else {
            fields.forEach((field) => {
                field.value = field.currentVal || ""
                field.onChange = (e) => {
                    console.log(e.target.value)
                    field.value = e.target.value
                    setData((prevData) => ({
                        ...prevData,
                        [field.key]: e.target.value
                    }))
                }
            })
        }
        setData(initData)
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!Object.keys(data).length) {
            alert("Fields are unchanged")
            return
        }
        if (Object.keys(data).includes("price")) {
            if (data.price <= 0) {
                alert("Price must not be zero or negative")
                return
            }
        }
        var url = ""
        switch (category.toLowerCase()) {
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
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                alert(`${category} Edited!`)
                navigate(-1)
            }
            else {
                alert(`Failed to edit ${category}`);
            }
        }
        catch {
            alert("Failed to connect to backend")
        }
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

export default EditInfo;
