import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'
import AdminNavBar from '../components/AdminNavBar'
import styles from "../styles/AdminOrgPage.module.css"
import CustomPopUp from '../components/CustomPopUp';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// const orgData = [
//     { "id": 1, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 },
//     { "id": 2, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 },
//     { "id": 3, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 },
//     { "id": 4, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 }
// ]

const AdminPage = () => {
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [orgsData, setOrgsData] = useState([])
    const [orgCorpData, setOrgCorpData] = useState([])
    const [orgDeleteID, setOrgDeleteID] = useState("")

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

    const getAll = async () => {
        try {
            fetch('http://localhost:3000/api/org/corp')
                .then(response => response.json())
                .then(data => setOrgsData(data))
                .catch(error => console.error('Error fetching organization:', error));

        }

        catch (error) {
            console.error('Error:', error);
            alert('Error retrieving organizations');
        }
    }

    const editOrg = (category, id, fields) => {
        navigate('/admin/edit', { state: { id: id, fields: fields, category: category } })
    }

    useEffect(() => {
        // for the recent 
        fetch('http://localhost:3000/api/org/corp/recent')
            .then(response => response.json())
            .then(data => {
                const fetchEmployeeCounts = data.map(org => {
                    const id = org.org_id;
                    return fetch(`http://localhost:3000/api/emp/count?org_id=${id}`)
                        .then(response => response.json())
                        .then(empData => {
                            org.employeeNo = empData;
                            return org;
                        });
                });

                Promise.all(fetchEmployeeCounts)
                    .then(updatedOrgs => {
                        setOrgsData(updatedOrgs);
                    });
            })
            .catch(error => console.error('Error fetching organization:', error));
    }, []);



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
                <AdminNavBar pageName="Manage Organizations (Corporate)" />
                <div className={styles.head}>
                    <div className={styles.tableDiv}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "1em" }}>
                            <div style={{ fontFamily: "Inter", fontWeight: "bold", alignSelf: "flex-start" }}>Organization List</div>
                            <NavLink className={styles.link} onClick={getAll}>View All</NavLink>
                        </div>
                        <table className={styles.organizationTable}>
                            <tr>
                                <th>Name</th>
                                <th>No. of Employees</th>
                                <th>Email</th>
                                <th>Industry</th>
                                <th>No. of clothing types</th>
                            </tr>
                            {orgsData.length > 0 ? (
                                orgsData.map((orgData) => {
                                    console.log(orgData.industry)
                                    const fields = [
                                        {
                                            key: "name",
                                            fieldType: "input",
                                            label: "Organization Name",
                                            type: "text",
                                            required: true,
                                            currentVal: orgData.name,
                                        },
                                        {
                                            key: "email",
                                            fieldType: "input",
                                            label: "Organization Email",
                                            type: "text",
                                            required: true,
                                            currentVal: orgData.email
                                        },
                                        {
                                            key: "industry",
                                            fieldType: "dropdown",
                                            label: "Organization Industry",
                                            required: true,
                                            currentVal: orgData.industry,
                                            options: [{ "value": "Healthcare" }, { "value": "Construction" }, { "value": "Technology" }, { "value": "Education" }]
                                        }
                                    ]
                                    return (
                                        <tr id={orgData.org_id}>
                                            <td>{orgData.name}</td>
                                            <td>{orgData.employeeNo}</td>
                                            <td>{orgData.email}</td>
                                            <td>{orgData.industry}</td>
                                            <td>{orgData.clothingNo}</td>
                                            <td className={styles.tableBtns}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <button className={styles.editBtn} onClick={() => editOrg("organization", orgData.org_id, fields)}>Edit</button>
                                                    <button className={styles.cancelBtn} onClick={() => toggleDeletePopUp(orgData.org_id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5">No organizations registered</td>
                                </tr>
                            )
                            }

                        </table>
                    </div>
                </div>
                <div className={styles.management}>
                    <div className={styles.manageDiv}>
                        <div className={styles.manageHead}><span style={{ paddingLeft: "1em" }}>Organization Management</span></div>
                        <ul>
                            <li className={styles.li}><NavLink className={styles.link} onClick={getAll}>View all Organizations</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link} to="/admin/corporate/orgs/register">Register New Organization</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link}>Delete Organization</NavLink></li>
                        </ul>
                    </div>
                    <div className={styles.manageDiv}>
                        <div className={styles.manageHead}><span style={{ paddingLeft: "1em" }}>Product Management</span></div>
                        <ul>
                            <li className={styles.li}><NavLink className={styles.link}>View all Products</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link}>Register New Product</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link}>Delete Product</NavLink></li>
                        </ul>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default AdminPage;
