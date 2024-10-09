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

    const togglePopUp = () => {
        setShowPopup(!showPopup);
    }

    useEffect(() => {
        const initData = {}
        fields.forEach((field) => {
            initData[field.key] = field.currentVal || ""
            field.onChange = (e) => {
                setData((prevData) => ({
                    ...prevData,
                    [field.key]: e.target.value
                }))
            }
        })
        setData(initData)
    }, [fields])

    useEffect(() => {
        console.log(data)
    }, [data])


    const handleSubmit = async (e) => {

    }

    return (
        <main>
            {showPopup && (
                <CustomPopUp togglePopup={togglePopUp} title="Error" text="Please ensure that all fields are filled" />
            )}
            < SetupWizardPage title="Edit Information" fields={fields} onSubmit={handleSubmit} />
        </main>
    )
};

export default CreateProduct;
