// DeleteOrganization.js
import React, { useEffect, useState } from 'react';
import SetupWizardPage from '../components/SetupWizardPage';
import CustomPopUp from '../components/CustomPopUp';
import { useNavigate } from 'react-router-dom';

const DeactivateOrganization = () => {
    const [dropDownInput, setDropDownInput] = useState([])
    const [orgID, setOrgID] = useState("")

    const navigate = useNavigate()

    const fetchOrgNames = () => {
        const type = window.location.href.includes("corporate") ? "corporate" : "government"
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

    const handleConfirm = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/org/deactivate/${orgID}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Error deactivating organization');
            }
            alert("Organization Deactivated!")
            navigate(-1)
        } catch (error) {
            console.error('Error deleting organization');
        }
    };

    useEffect(() => {
        fetchOrgNames()
    }, [])


    const fields = [
        {
            fieldType: 'dropdown',
            label: 'Organization Name',
            value: orgID,
            onChange: (e) => setOrgID(e.target.value),
            required: true,
            options: dropDownInput
        }
    ];

    return (
        <main>
            < SetupWizardPage title="Deactivate Organization" fields={fields} onSubmit={handleConfirm} isCancel={true} />
        </main>
    )
};

export default DeactivateOrganization;
