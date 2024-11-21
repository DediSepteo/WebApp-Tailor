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

const AdminPage = () => {
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [orgsData, setOrgsData] = useState([])
    const [orgDeleteID, setOrgDeleteID] = useState("")

    const [isExpanded, setIsExpanded] = useState([]);


    const navigate = useNavigate()

    const toggleDeletePopUp = (id) => {
        setOrgDeleteID(id)
        setShowDeletePopup(!showDeletePopup); // Show popup when you want
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/org/${orgDeleteID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Organization Deleted!")
                window.location.reload()
            }
            else {
                alert('Failed to delete organization');
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

    useEffect(() => {
        fetch(`http://localhost:3000/api/org/recent?type=${type}&limit=5`)
            .then(response => response.json())
            .then(data => {
                setOrgsData(data)
                setIsExpanded(Array(data.length).fill(false))
            })
            .catch(error => console.error('Error fetching organization:', error));
    }, [getURL]);



    return (
        <main style={{ display: 'flex', flexDirection: "row", backgroundColor: "#F1F2F7" }}>
            {showDeletePopup && (
                <CustomPopUp togglePopup={toggleDeletePopUp}
                    title="Delete Organization"
                    text="Are you sure you want to delete this Organization?"
                    hasCancel={true}
                    onConfirm={handleDelete} />
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
                                    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                                    console.log(regionNames.of("PH"))
                                    console.log(parsePhoneNumberFromString(orgData.phone, "PH").isValid())
                                    console.log(orgData, index)
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
                                                        <button className={styles.cancelBtn} onClick={() => toggleDeletePopUp(orgData.id)}>Delete</button>
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
                            <li className={styles.li}><NavLink className={styles.link}>Delete Organization</NavLink></li>
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
