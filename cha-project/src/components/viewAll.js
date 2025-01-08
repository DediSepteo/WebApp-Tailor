import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar';
import styles from '../styles/viewAll.module.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomPopUp from "../components/CustomPopUp";
import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs"
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const ViewAll = ({ category, type, isReady }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(6); // Display 6 rows per page
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [itemDeleteID, setItemDeleteID] = useState("")
    const [orgStatus, setOrgStatus] = useState({})

    useEffect(() => {
        const updateRowsPerPage = () => {
            const screenHeight = window.innerHeight;
            if (screenHeight < 600) {
                setRowsPerPage(4);
            } else if (screenHeight < 800) {
                setRowsPerPage(6);
            } else {
                setRowsPerPage(8);
            }
        };

        updateRowsPerPage();
        window.addEventListener("resize", updateRowsPerPage);

        return () => window.removeEventListener("resize", updateRowsPerPage);
    }, []);

    const navigate = useNavigate()

    const token = sessionStorage.getItem("authToken")


    const toggleDeletePopUp = (id) => {
        setItemDeleteID(id)
        setShowDeletePopup(!showDeletePopup); // Show popup when you want
    };

    const handleDelete = async () => {
        var deleteLink = ""
        switch (category) {
            case "Order":
                deleteLink = `http://localhost:3000/api/order/cancel`
                break
            case "Organization":
                deleteLink = orgStatus[itemDeleteID] ? `http://localhost:3000/api/org/deactivate` : `http://localhost:3000/api/org/activate`
                break
            case "Product":
                deleteLink = `http://localhost:3000/api/product`;
                break
            default:
                throw new Error("Invalid category");
        }
        if (deleteLink)
            try {
                const response = await fetch(`${deleteLink}/${itemDeleteID}`, {
                    method: category == "Organization" ? "PUT" : "DELETE",
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    alert(`${category} ${category === "Organization" ? (orgStatus[itemDeleteID] ? "Deactivated" : "Activated") : "Deleted"}!`);
                    window.location.reload()
                }
                else {
                    alert(`Failed to delete ${category}`);
                }
            }
            catch (error) {
                console.error('Error:', error);
                alert('Error deleting organization');
            }
    }

    const getLink = (category, type, isReady) => {
        switch (category) {
            case "Order":
                return isReady ?
                    `http://localhost:3000/api/order/ready?type=${type || ''}` :
                    `http://localhost:3000/api/order?type=${type || ''}`;
            case "Organization":
                return `http://localhost:3000/api/org?type=${type || ''}`;
            case "Product":
                return `http://localhost:3000/api/product?type=${type || ''}`;
            default:
                throw new Error("Invalid category");
        }
    };

    const splitPhoneNumber = (phoneNumber, countryCode) => {
        const parsed = parsePhoneNumberFromString(phoneNumber, countryCode);
        if (parsed) {
            console.log(`+${parsed.countryCallingCode} ${parsed.nationalNumber}`)
            return `+${parsed.countryCallingCode} ${parsed.nationalNumber}`
        } else {
            console.log(phoneNumber, countryCode)
        }
    }

    useEffect(() => {
        const link = getLink(category, type, isReady)
        try {
            if (link) {
                fetch(link)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Server responded with error status ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(response => {
                        if (category == "Organization") {
                            var statusData = {}
                            response.forEach((item) => {
                                console.log(item)
                                statusData[item.id] = item.status == "active"
                            })
                            const formattedData = response.map((item) => {
                                const formattedPhoneNumber = splitPhoneNumber(item.phone, item.country)
                                const newItem = { ...item, phone: formattedPhoneNumber }
                                return newItem
                            })
                            setOrgStatus(statusData)
                            setData(formattedData)
                        }
                        else if (category == "Order") {
                            const formattedData = response.map((item) => {
                                console.log(item)
                                const newItem = { ...item, measurementNo: `${item.measurementNo}/${item.qty}` }
                                return newItem
                            })
                            setData(formattedData)
                        }
                        else {
                            if (Object.keys(response[0]).includes("date")) {
                                response.forEach((row) => {
                                    row.date = new Date(row.date).toLocaleString()
                                })
                            }
                            setData(response)
                        }

                    })
                    .catch(error => console.error(`Error fetching ${category}:`, error));
            }
        }
        catch {
            alert("Failed to connect to backend")
        }
    }, [])


    // Get current orders for the current page
    const indexOfLastOrder = currentPage * rowsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
    const currentDataList = data.length ? data.slice(indexOfFirstOrder, indexOfLastOrder) : 0


    // Calculate total pages
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const editItem = (category, id, fields) => {
        navigate('/admin/edit', { state: { id: id, fields: fields, category: category } })
    }

    const toDetails = (orderData) => {
        navigate('/admin/order-details', { state: { orderData: orderData } })
    }

    return (
        <main style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F1F2F7' }}>
            {showDeletePopup && (
                <CustomPopUp togglePopup={toggleDeletePopUp}
                    title={`${category == "Order" ? "Cancelling" : (category == "Organization" ? (orgStatus[itemDeleteID] ? "Deactivating" : "Activating") : "Deleting")} ${category}`}
                    text={`Are you sure you want to ${category == "Order" ? "cancel" : (category == "Organization" ? (orgStatus[itemDeleteID] ? "deactivate" : "activate") : "delete")} this ${category}?`}
                    hasCancel={true}
                    onConfirm={handleDelete} />
            )}
            <AdminSideNavBar />

            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "white", padding: "0 1em 1em 1em", width: "100%", overflowX: "auto" }}>
                <div
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1em' }}
                >
                    <div style={{ fontFamily: 'Inter', fontWeight: 'bold', alignSelf: 'center' }}>{`All ${category} List`}</div>
                    <NavLink onClick={() => navigate(-1)}>Go back</NavLink>
                </div>
                <div style={{ overflowX: "auto" }}>
                    <table className={styles.dataTable}>
                        <thead>
                            {currentDataList.length > 0 && (
                                <tr>
                                    {Object.keys(currentDataList[0]).map((header) => (
                                        <th>{header[0].toUpperCase() + header.slice(1)}</th>
                                    ))}
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {currentDataList.length > 0 ? (
                                currentDataList.map((currentData) => {
                                    const id = currentData.id
                                    var fields = []
                                    switch (category) {
                                        case ("Order"):
                                            break
                                        case ("Organization"):
                                            fields = [
                                                { key: "name", currentVal: currentData.name, fieldType: 'input', label: 'Organization Name', type: 'text', required: true },
                                                { key: "email", currentVal: currentData.email, fieldType: 'input', label: 'Organization Email', type: 'text', required: true },
                                                {
                                                    key: "industry", currentVal: currentData.industry,
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
                                                { key: "city", currentVal: currentData.city, fieldType: 'input', label: 'City', type: 'text', required: true },
                                                {
                                                    key: "country", currentVal: currentData.country,
                                                    fieldType: 'dropdown',
                                                    label: 'Country',
                                                    type: 'text',
                                                    required: true,
                                                    options: [
                                                        { value: "PH" }, { value: "SG" }
                                                    ]
                                                },
                                                { key: "address_line1", currentVal: currentData.address_line1, fieldType: 'input', label: 'Address Line 1', type: 'text', required: true },
                                                { key: "address_line2", currentVal: currentData.address_line2, fieldType: 'input', label: 'Address Line 2 (Optional)', type: 'text', required: false },
                                                { key: "postal_code", currentVal: currentData.postal_code, fieldType: 'input', label: 'Postal Code', type: 'text', required: true },
                                                { key: "state", currentVal: currentData.state, fieldType: 'input', label: 'State', type: 'text', required: true },
                                            ]
                                            break;
                                        case ("Product"):
                                            fields = [
                                                {
                                                    key: "name",
                                                    fieldType: "input",
                                                    label: "Product Name",
                                                    type: "text",
                                                    required: true,
                                                    currentVal: currentData.name,
                                                },
                                                {
                                                    key: "description",
                                                    fieldType: "textarea",
                                                    label: "Product Description",
                                                    type: "textarea",
                                                    required: true,
                                                    currentVal: currentData.description
                                                },
                                                {
                                                    key: "price",
                                                    fieldType: "input",
                                                    label: "Product Price",
                                                    type: "number",
                                                    step: "0.01",
                                                    required: true,
                                                    currentVal: currentData.price
                                                }
                                            ]
                                            break
                                        default:
                                            alert("Something went wrong")
                                            return
                                    }
                                    return (
                                        <tr >
                                            {Object.values(currentData).map((value) => {
                                                return (<td>{value}</td>)
                                            })}
                                            <td style={{ textAlign: "center", justifyContent: "center" }}>
                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    {category == "Organization" || category == "Product" ? (
                                                        <button className={styles.detailBtn} onClick={() => editItem(category, currentData.id, fields)}>Edit</button>
                                                    ) : (
                                                        <button className={styles.detailBtn} onClick={() => toDetails(currentData)}>Details</button>
                                                    )}
                                                    {category == "Organization" ? (
                                                        <button className={orgStatus[id] ? styles.activated : styles.deactivated} onClick={() => toggleDeletePopUp(id)}>
                                                            {orgStatus[id] ? (
                                                                <>
                                                                    <BsToggleOn size={20} style={{ marginRight: "0.5em" }} />Activated
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <BsToggleOff size={20} style={{ marginRight: "0.5em" }} /> Deactivated
                                                                </>
                                                            )}
                                                        </button>
                                                    ) : (
                                                        <NavLink className={styles.cancelBtn} onClick={() => toggleDeletePopUp(currentData.id)}>{category == "Order" ? "Cancel" : "Delete"}</NavLink>
                                                    )}

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8">{`No ${category} available`}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className={styles.pagination}>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                        <button
                            key={number}
                            className={`${styles.pageBtn} ${currentPage === number ? styles.active : ''}`}
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </main >
    );
}

export default ViewAll;
