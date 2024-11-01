import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar';
import styles from '../styles/viewAll.module.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomPopUp from "../components/CustomPopUp";

const ViewAll = ({ category, type, isReady, deleteLink, deleteTitle, deleteText }) => {
    console.log(type)
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10); // Display 10 rows per page
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [itemDeleteID, setItemDeleteID] = useState("")

    const navigate = useNavigate()

    const toggleDeletePopUp = (id) => {
        setItemDeleteID(id)
        setShowDeletePopup(!showDeletePopup); // Show popup when you want
    };

    const handleDelete = async () => {
        console.log(deleteLink)
        try {
            const response = await fetch(`${deleteLink}${itemDeleteID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert(`${category} Deleted!`)
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

    useEffect(() => {
        var link = ""
        switch (category) {
            case ("Order"):
                if (type) {
                    if (isReady)
                        link = `http://localhost:3000/api/order/ready?type=${type}`
                    else
                        link = `http://localhost:3000/api/order?type=${type}`
                }
                else {
                    link = `http://localhost:3000/api/order/ready`
                }
                break
            case ("Organization"):
                link = `http://localhost:3000/api/org?type=${type}`
                break
            case ("Product"):
                link = `http://localhost:3000/api/product?type=${type}`
                break
            default:
                alert("Something went wrong")
                return
        }
        try {
            if (link) {
                console.log(link)
                fetch(link)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Server responded with error status ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(response => {
                        if (Object.keys(response[0]).includes("date")) {
                            response.forEach((row) => {
                                row.date = new Date(row.date).toLocaleString()
                            })
                        }
                        setData(response)
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

    return (
        <main style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F1F2F7' }}>
            {showDeletePopup && (
                <CustomPopUp togglePopup={toggleDeletePopUp}
                    title={deleteTitle}
                    text={deleteText}
                    hasCancel={true}
                    onConfirm={handleDelete} />
            )}
            <AdminSideNavBar />

            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "white", padding: "0 1em 1em 1em", width: "88%" }}>
                <div
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1em' }}
                >
                    <div style={{ fontFamily: 'Inter', fontWeight: 'bold', alignSelf: 'flex-start' }}>{`All ${category} List`}</div>
                    <NavLink onClick={() => navigate(-1)}>Go back</NavLink>
                </div>
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
                                return (
                                    <tr >
                                        {Object.values(currentData).map((value) => {
                                            return (<td>{value}</td>)
                                        })}
                                        <td style={{ textAlign: "center", justifyContent: "center" }}>
                                            <div style={{ display: "flex" }}>
                                                <NavLink className={styles.detailBtn}>Details</NavLink>
                                                <NavLink className={styles.cancelBtn} onClick={() => toggleDeletePopUp(currentData.id)}>{category == "Order" ? "Cancel" : "Delete"}</NavLink>
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
