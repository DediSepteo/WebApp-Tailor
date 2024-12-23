import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'
import AdminNavBar from '../components/AdminNavBar'
import styles from "../styles/AdminOrgPage.module.css"
import CustomPopUp from '../components/CustomPopUp';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs"

const AdminPage = () => {
    const [showOrgStatusPopup, setShowOrgStatusPopup] = useState(false);
    const [orgsData, setOrgsData] = useState([])
    const [orgStatusToggleID, setOrgStatusToggleID] = useState("")
    const [isExpanded, setIsExpanded] = useState([]);
    const [orgStatus, setOrgStatus] = useState({})

    const token = sessionStorage.getItem("authToken")


    const navigate = useNavigate()

    const toggleOrgStatusPopUp = (id) => {
        setOrgStatusToggleID(id)
        setShowOrgStatusPopup(!showOrgStatusPopup); // Show popup when you want
    };

    const handleUpdateOrgStatus = async () => {
        const link = orgStatus[orgStatusToggleID] ? `http://localhost:3000/api/org/deactivate/${orgStatusToggleID}` : `http://localhost:3000/api/org/activate${orgStatusToggleID}`
        try {
            const response = await fetch(link, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Adding Authorization Bearer Token
                }
            });

            if (response.ok) {
                setOrgStatus(() => {
                    const updatedStatus = { ...orgStatus }; // Create a copy of the current state
                    updatedStatus[orgStatusToggleID] = !updatedStatus[orgStatusToggleID]; // Toggle the specific index
                    return updatedStatus; // Return the updated array
                });
                alert("Organization")
            }
            else {
                alert('Failed to update organization');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Error deleting organization');
        }
    }

    const getURL = window.location.href
    const isCorpPage = getURL == "http://localhost:3001/admin/corporate/orgs"
    const type = isCorpPage ? "corporate" : "government"

    const editOrg = (category, id, fields) => {
        navigate('/admin/edit', { state: { id: id, fields: fields, category: category } })
    }

    const toggleAddressInfo = (index) => {
        const newExpandedState = [...isExpanded];
        newExpandedState[index] = !newExpandedState[index];
        setIsExpanded(newExpandedState);
    }

    const splitPhoneNumber = (phoneNumber, countryCode) => {
        const parsed = parsePhoneNumberFromString(phoneNumber, countryCode);
        if (parsed) {
            return `+${parsed.countryCallingCode} ${parsed.nationalNumber}`
        } else {
            console.error("Could not find country calling code from phone number")
            return phoneNumber
        }
    }


    useEffect(() => {
        fetch(`http://localhost:3000/api/org/recent?type=${type}&limit=5`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Adding Authorization Bearer Token
            }
        })
            .then(response => response.json())
            .then(data => {
                var statusData = {}
                // Format data to change country code to country, phone number to separate prefix from number
                const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                data.forEach((item) => {
                    statusData[item.id] = item.status == "active"
                })
                const formattedData = data.map((item) => {
                    const countryCode = item.country
                    const formattedPhoneNumber = splitPhoneNumber(item.phone, countryCode)
                    const newItem = { ...item, phone: formattedPhoneNumber, country: regionNames.of(countryCode) }
                    return newItem
                })
                setOrgsData(formattedData)
                setIsExpanded(Array(data.length).fill(false))
                setOrgStatus(statusData)
            })
            .catch(error => console.error('Error fetching organization:', error));
    }, [getURL]);



    return (
        <main style={{ display: 'flex', flexDirection: "row", backgroundColor: "#F1F2F7" }}>
            {showOrgStatusPopup && (
                <CustomPopUp togglePopup={toggleOrgStatusPopUp}
                    title={orgStatus[orgStatusToggleID] ? "Deactivate Organization" : "Activate Organization"}
                    text={`Are you sure you want to ${orgStatus[orgStatusToggleID] ? "deactivate" : "activate"} this organization?`}
                    hasCancel={true}
                    onConfirm={handleUpdateOrgStatus} />
            )}
            <AdminSideNavBar />
            <div className={styles.container}>
                <AdminNavBar pageName={`Manage Organization (${type[0].toUpperCase()}${type.slice(1)})`} />
                <div className={styles.head}>
                    <div className={styles.tableDiv}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "1em" }}>
                            <div style={{ fontFamily: "Inter", fontWeight: "bold", alignSelf: "flex-start" }}>Organization List</div>
                            <NavLink className={styles.link} to={`/admin/${type}/view-orgs`}>View All</NavLink>
                        </div>
                        <table className={styles.organizationTable}>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Industry</th>
                                <th>Phone</th>
                                <th>No. of Products</th>
                                {orgsData.length > 0 && (
                                    <th></th>
                                )}
                            </tr>
                            {orgsData.length > 0 ? (
                                orgsData.map((orgData, index) => {
                                    const id = orgData.id
                                    const fields = [
                                        { key: "name", currentVal: orgData.name, fieldType: 'input', label: 'Organization Name', type: 'text', required: true },
                                        { key: "email", currentVal: orgData.email, fieldType: 'input', label: 'Organization Email', type: 'text', required: true },
                                        {
                                            key: "industry", currentVal: orgData.industry,
                                            fieldType: 'dropdown',
                                            label: 'Organization Industry',
                                            type: 'text',
                                            required: true,
                                            options: [
                                                { value: "Technology" }, { value: "Finance" }, { value: "Healthcare" },
                                                { value: "Manufacturing" }, { value: "Retail" }, { value: "Real Estate" },
                                                { value: "Transportation and Logistics" }, { value: "Construction" },
                                                { value: "Marketing and Advertising" }, { value: "Others" }
                                            ]
                                        },
                                        { key: "city", currentVal: orgData.city, fieldType: 'input', label: 'City', type: 'text', required: true },
                                        {
                                            key: "country", currentVal: orgData.country,
                                            fieldType: 'dropdown',
                                            label: 'Country',
                                            type: 'text',
                                            required: true,
                                            options: [
                                                { value: "PH" }, { value: "SG" }
                                            ]
                                        },
                                        { key: "address_line1", currentVal: orgData.address_line1, fieldType: 'input', label: 'Address Line 1', type: 'text', required: true },
                                        { key: "address_line2", currentVal: orgData.address_line2, fieldType: 'input', label: 'Address Line 2 (Optional)', type: 'text', required: false },
                                        { key: "postal_code", currentVal: orgData.postal_code, fieldType: 'input', label: 'Postal Code', type: 'text', required: true },
                                        { key: "state", currentVal: orgData.state, fieldType: 'input', label: 'State', type: 'text', required: true },
                                        { key: "phone", currentVal: orgData.phone, fieldType: 'input', label: "Phone", type: "tel", required: true }
                                    ]
                                    return (
                                        <>
                                            <tr id={orgData.id}>
                                                <td>{orgData.name}</td>
                                                <td>{orgData.email}</td>
                                                <td>{orgData.industry}</td>
                                                <td>{orgData.phone}</td>
                                                <td>{orgData["Number of Products"]}</td>
                                                <td className={styles.tableBtns}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <button className={styles.editBtn} onClick={() => editOrg("organization", orgData.id, fields)}>Edit</button>
                                                        <button className={orgStatus[id] ? styles.activated : styles.deactivated} onClick={() => toggleOrgStatusPopUp(orgData.id)}>
                                                            {orgStatus[id] ? <> <BsToggleOn size={20} style={{ marginRight: "0.5em" }} /> Activated  </> : <> <BsToggleOff size={20} style={{ marginRight: "0.5em" }} /> Deactivated  </>}</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <td colSpan="6" className={styles.addressDropdown}
                                                onClick={() => { toggleAddressInfo(index) }}>Address Details {isExpanded[index] ? <FaChevronUp style={{ float: 'right', marginTop: "3px" }} />
                                                    : <FaChevronDown style={{ float: 'right', marginTop: "3px" }} />}</td>
                                            {isExpanded[index] && (
                                                <tr style={{ borderBottom: "2px solid #D9D9D9" }}>
                                                    <td colSpan="6" style={{ backgroundColor: "#f9f9f9", padding: "10px" }}>
                                                        <table style={{ width: "100%", borderCollapse: "collapse", border: "2px solid #D9D9D9" }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Country</th>
                                                                    <th>State</th>
                                                                    <th>City</th>
                                                                    <th>Postal Code</th>
                                                                    <th>Address Line 1</th>
                                                                    <th>Address Line 2</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{orgData.country}</td>
                                                                    <td>{orgData.state}</td>
                                                                    <td>{orgData.city}</td>
                                                                    <td>{orgData.postal_code}</td>
                                                                    <td>{orgData.address_line1}</td>
                                                                    <td>{orgData.address_line2}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6">No organizations registered</td>
                                </tr>
                            )
                            }
                        </table >
                    </div>
                </div>
                <div className={styles.management}>
                    <div className={styles.manageDiv}>
                        <div className={styles.manageHead}><span style={{ paddingLeft: "1em" }}>Organization Management</span></div>
                        <ul>
                            <li className={styles.li}><NavLink className={styles.link} to={`/admin/${type}/view-orgs`}>View all Organizations</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link} to={`/admin/${type}/orgs/register`}>Register New Organization</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link} to={`/admin/${type}/orgs/deactivate`}>Deactivate Organization</NavLink></li>
                        </ul>
                    </div>
                    {/* <div className={styles.manageDiv}>
                        <div className={styles.manageHead}><span style={{ paddingLeft: "1em" }}>Product Management</span></div>
                        <ul>
                            <li className={styles.li}><NavLink className={styles.link}>View all Products</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link}>Register New Product</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link}>Delete Product</NavLink></li>
                        </ul>
                    </div> */}
                </div>

            </div>
        </main >
    );
};

export default AdminPage;
