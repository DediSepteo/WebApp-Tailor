// CreateProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomPopUp from '../components/CustomPopUp';
import SetupWizardPage from '../components/SetupWizardPage';

const CreateProduct = () => {
    const [type, setType] = useState("")
    const [prodName, setProdName] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [org_id, setOrg_id] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [prodImg, setProdImg] = useState("");
    const [dropDownInput, setDropDownInput] = useState([])

    const [showPopup, setShowPopup] = useState(false);
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate()


    const togglePopUp = () => {
        setShowPopup(!showPopup); // Show popup when you want
    };
    const toggleError = () => {
        setShowError(!showError); // Show popup when you want
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProdImg(file);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (prodPrice <= 0) {
            alert("Price cannot be zero or negative")
            return
        }
        // Image not implemented yet
        const body = {
            "name": prodName,
            "price": prodPrice,
            "description": prodDesc,
        }
        const values = [prodName, prodPrice, prodDesc]
        const requiredValues = values.map((value) => { return value.trim() })
        if (requiredValues.includes("")) {
            setShowError(true)
            return false
        }
        const token = sessionStorage.getItem("authToken")
        if (!token)
            alert("Error retrieving token")
        else {
            handleRegister(token, body)
        }
    }

    const handleRegister = async (token, body) => {
        try {
            console.log(prodImg)
            if (prodImg) {
                /* Image will be replaced if product already registered */
                // const imagePath = `images/${org_id}/${prodName}`
                // await fetch(`http://localhost:3000/api/image?imagePath=${imagePath}`, {
                //     headers: {
                //         'Authorization': `Bearer ${token}`
                //     },
                // })
                //     .then((response) => response.json())
                //     .then((data) => {
                //         if (data.url) {
                //             alert("Product with this name already exists for this organization.")
                //             return
                //         }
                //         else {
                const formData = new FormData()
                formData.append("image", prodImg)
                formData.append("org_id", org_id)
                formData.append('name', prodName)
                fetch(`http://localhost:3000/api/image/upload`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                })
                    .then((response) => {
                        if (!response.ok) {
                            return response.json().then((error) => {
                                alert(error.message)
                            })
                        }
                    })
                    .then(() => {
                        fetch(`http://localhost:3000/api/product/register/${org_id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(body)
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    return response.json().then((error) => {
                                        alert(error.message)
                                    })
                                }
                                else {
                                    alert("Product created!")
                                    navigate(-1)
                                }
                            })
                    });
                // }
                // })
            }
            else {
                fetch(`http://localhost:3000/api/product/register/${org_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(body)
                })
                    .then((response) => {
                        if (!response.ok) {
                            return response.json().then((error) => {
                                alert(error.message)
                            })
                        }
                        else {
                            alert("Product created!")
                            navigate(-1)
                        }
                    })
            }

        }
        catch (error) {
            console.error('Error creating product');
        }

    }
    const fetchOrgNames = () => {
        fetch(`http://localhost:3000/api/org/names?type=${type}`)
            .then(response => response.json())
            .then(orgs => {
                const options = orgs.map((org) => ({
                    value: org.name,
                    id: org.id
                }))
                setDropDownInput(options);
            })

    }

    useEffect(() => {
        if (window.location.href.includes("corporate")) {
            setType("corporate")
        }
        else {
            setType("government")
        }
    }, [])


    useEffect(() => {
        if (type)
            fetchOrgNames()
    }, [type])


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
            value: org_id,
            onChange: (e) => setOrg_id(e.target.value),
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
            onChange: (e) => handleImageChange(e),
            required: true,
        },
    ];
    return (
        <main>
            {showPopup && (
                <CustomPopUp togglePopup={togglePopUp} title="Warning" text="Please ensure that all fields are filled for all registered products" />
            )}
            {showError && (
                <CustomPopUp togglePopup={toggleError} title="Error" text="Please ensure that all fields are filled for all registered products" />
            )}
            < SetupWizardPage title="Register Product" fields={fields} onSubmit={handleSubmit} />
        </main>
    )
};

export default CreateProduct;
