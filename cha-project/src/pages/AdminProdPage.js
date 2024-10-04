import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'
import AdminNavBar from '../components/AdminNavBar'
import styles from "../styles/AdminProdPage.module.css"
import CustomPopUp from '../components/CustomPopUp';
import { NavLink } from 'react-router-dom';


// const prodData = [
//     { "id": 1, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 },
//     { "id": 2, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 },
//     { "id": 3, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 },
//     { "id": 4, "name": "BrandTailors Co.", "employeeNo": 10, "email": "BrandTailors@gmail.com", "industry": "Healthcare", "clothingNo": 10 }
// ]

const AdminProdPage = () => {
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [prodData, setProdData] = useState([])
    const [prodDeleteID, setProdDeleteID] = useState("")

    const toggleDeletePopUp = (id) => {
        setProdDeleteID(id)
        setShowDeletePopup(!showDeletePopup); // Show popup when you want
    };

    const handleDelete = async () => {
        console.log(prodDeleteID)
        try {
            const response = await fetch(`http://localhost:3000/api/product${prodDeleteID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Product Deleted!")
                // window.location.reload()
            }
            else {
                alert('Failed to delete product');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Error deleting product');
        }
    }

    const getAll = async () => {
        try {
            fetch('http://localhost:3000/api/products/corp')
                .then(response => response.json())
                .then(data => setProdData(data))
                .catch(error => console.error('Error fetching organization:', error));

        }

        catch (error) {
            console.error('Error:', error);
            alert('Error retrieving organizations');
        }
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/product/corp/recent')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProdData(data)
            })
            .catch(error => console.error('Error fetching product:', error));
    }, []);



    return (
        <main style={{ display: 'flex', flexDirection: "row", backgroundColor: "#F1F2F7" }}>
            {showDeletePopup && (
                <CustomPopUp togglePopup={toggleDeletePopUp}
                    title="Warning"
                    text="Are you sure you want to delete this product? This action cannot be undone!"
                    hasCancel={true}
                    onConfirm={handleDelete} />
            )}
            <AdminSideNavBar />
            <div className={styles.container}>
                <AdminNavBar pageName="Manage Products (Corporate)" />
                <div className={styles.head}>
                    <div className={styles.tableDiv}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "1em" }}>
                            <div style={{ fontFamily: "Inter", fontWeight: "bold", alignSelf: "flex-start" }}>Product List</div>
                            <NavLink className={styles.link} onClick={getAll}>View All</NavLink>
                        </div>
                        <table className={styles.productTable}>
                            <tr>
                                <th>Name</th>
                                <th>Organization</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                            {prodData.length > 0 ? (
                                prodData.map((prodData) => (
                                    <tr id={prodData.prod_id}>
                                        <td>{prodData.name}</td>
                                        <td>{prodData.org_name}</td>
                                        <td>{prodData.description}</td>
                                        <td>{prodData.price}</td>
                                        <td className={styles.tableBtns}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <NavLink className={styles.editBtn}>Edit</NavLink>
                                                <button className={styles.cancelBtn} onClick={() => toggleDeletePopUp(prodData.prod_id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No products available</td>
                                </tr>
                            )
                            }

                        </table>
                    </div>
                </div>
                <div className={styles.management}>
                    <div className={styles.manageDiv}>
                        <div className={styles.manageHead}><span style={{ paddingLeft: "1em" }}>Product Management</span></div>
                        <ul>
                            <li className={styles.li}><NavLink className={styles.link} onClick={getAll}>View all Products</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link} to="/admin/corporate/products/register">Register Product</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link} to="/admin/corporate/products/registerBulk">Register Multiple Products</NavLink></li>
                            <li className={styles.li}><NavLink className={styles.link}>Delete product</NavLink></li>
                        </ul>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default AdminProdPage;
