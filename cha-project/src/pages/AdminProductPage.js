import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'
import AdminNavBar from '../components/AdminNavBar'
import styles from "../styles/AdminProdPage.module.css"
import CustomPopUp from '../components/CustomPopUp';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminProductPage = () => {
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [productsData, setProductsData] = useState([])
    const [productDeleteID, setProductDeleteID] = useState("")
    const [pageTitle, setPageTitle] = useState("")

    const navigate = useNavigate()

    const toggleDeletePopUp = (id) => {
        setProductDeleteID(id)
        setShowDeletePopup(!showDeletePopup); // Show popup when you want
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/product/${productDeleteID}`, {
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
                .then(data => setProductsData(data))
                .catch(error => console.error('Error fetching organization:', error));

        }

        catch (error) {
            console.error('Error:', error);
            alert('Error retrieving organizations');
        }
    }

    const editProd = (category, id, fields) => {
        navigate('/admin/edit', { state: { id: id, fields: fields, category: category } })
    }

    const getURL = window.location.href
    console.log(getURL)

    useEffect(() => {
        const isCorpPage = getURL === "http://localhost:3001/admin/corporate/products";

        // Set the page title based on the URL
        const newPageTitle = isCorpPage ? 'Manage Products (Corporate)' : 'Manage Products (Government)';
        setPageTitle(newPageTitle); // Update the state

        // Determine which URL to fetch based on the page
        const url = isCorpPage
            ? "http://localhost:3000/api/product/corp/recent"
            : "http://localhost:3000/api/product/govt/recent";

        // Fetch product data from the correct endpoint
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProductsData(data);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [getURL]); // Re-run if the URL changes

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
                <AdminNavBar pageName={pageTitle} />
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
                            {productsData.length > 0 ? (
                                productsData.map((productData) => {
                                    const fields = [
                                        {
                                            key: "name",
                                            fieldType: "input",
                                            label: "Product Name",
                                            type: "text",
                                            required: true,
                                            currentVal: productData.name,
                                        },
                                        {
                                            key: "desc",
                                            fieldType: "textarea",
                                            label: "Product Description",
                                            type: "textarea",
                                            required: true,
                                            currentVal: productData.description
                                        },
                                        {
                                            key: "price",
                                            fieldType: "input",
                                            label: "Product Price",
                                            type: "number",
                                            required: true,
                                            currentVal: productData.price
                                        }
                                    ]
                                    return (
                                        <tr id={productData.id}>
                                            <td>{productData.name}</td>
                                            <td>{productData.org_name}</td>
                                            <td>{productData.description}</td>
                                            <td>{productData.price}</td>
                                            <td className={styles.tableBtns}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <button className={styles.editBtn} onClick={() => editProd("product", productData.id, fields)}>Edit</button>
                                                    <button className={styles.cancelBtn} onClick={() => toggleDeletePopUp(productData.id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
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

export default AdminProductPage;
