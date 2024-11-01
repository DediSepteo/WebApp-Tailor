// CreateOrganization.js
import React, { useState } from 'react';
import SetupWizardPage from '../components/SetupWizardPage';

const CreateEmployee = () => {
    const [link, setLink] = useState("")
    const [clickLink, setClickLink] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem("token")
        if (!token)
            alert("Error retrieving token")
        else {
            try {
                const response = await fetch("http://localhost:3000/api/org/gen-link", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                if (!response) {
                    alert("Error")
                }
                const data = await response.json()
                setLink(data.link)
                setClickLink(data.link.slice(20))
            }
            catch {
                alert("Failed to connect to backend")
            }
        }

    }


    const fields = [
    ];

    return (
        <main>

            <SetupWizardPage title="Register Employee" fields={fields} onSubmit={handleSubmit} />
            <div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 1000 }}>Link: <a href={clickLink}>{link}</a></div>
        </main>
    )
};

export default CreateEmployee;
