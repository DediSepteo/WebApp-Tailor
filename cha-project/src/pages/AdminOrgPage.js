import React, { useState } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'
import AdminNavBar from '../components/AdminNavBar'
import styles from "../styles/AdminOrgPage.module.css"
import ConfirmPopUp from '../components/ConfirmPopUp';
import { NavLink } from 'react-router-dom';

const companyData = [
    { "id": 1, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 },
    { "id": 2, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 },
    { "id": 3, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 },
    { "id": 4, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 }
]

const AdminPage = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopUp = () => {
        setShowPopup(!showPopup); // Show popup when you want
    };


    return (
        <main style={{ display: 'flex', flexDirection: "row", backgroundColor: "#F1F2F7" }}>
            {showPopup && (
                <ConfirmPopUp togglePopup={togglePopUp} />
            )}
            <AdminSideNavBar />
            <div className={styles.container}>
                <AdminNavBar pageName="Manage Organizations (Corporate)" />
                <div className={styles.head}>
                    <div className={styles.tableDiv}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "1em" }}>
                            <div style={{ fontFamily: "Inter", fontWeight: "bold", alignSelf: "flex-start" }}>Company List</div>
                            <NavLink className={styles.link}>View All</NavLink>
                        </div>
                        <table className={styles.companyTable}>
                            <tr>
                                <th>Name</th>
                                <th>No. of Employees</th>
                                <th>Email</th>
                                <th>Industry</th>
                                <th>No. of clothing types</th>
                            </tr>
                            {companyData.map((companyData) => (
                                <tr>
                                    <td>{companyData.name}</td>
                                    <td>{companyData.employeeNo}</td>
                                    <td>{companyData.email}</td>
                                    <td>{companyData.industry}</td>
                                    <td>{companyData.clothingNo}</td>
                                    <td className={styles.tableBtns}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <NavLink className={styles.editBtn}>Edit</NavLink>
                                            <button className={styles.cancelBtn} onClick={togglePopUp}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
                <div className={styles.management}>
                    <div className={styles.manageDiv}>
                        <div className={styles.manageHead}><span style={{ paddingLeft: "1em" }}>Company Management</span></div>
                        <ul>
                            <li className={styles.li}><NavLink className={styles.link}>View all Companies</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link}>Register New Company</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link}>Delete Company</NavLink></li>
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
