import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar';
import styles from '../styles/viewAll.module.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ViewAll = (params) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10); // Display 10 rows per page

    const navigate = useNavigate()
    const category = params.category
    const type = params.type
    const headers = params.headers
    console.log(type)

    useEffect(() => {
        var link = ""
        switch (category) {
            case ("Order"):
                link = `http://localhost:3000/api/order?type=${type}`
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
                fetch(link)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Server responded with error status ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (Object.keys(data[0]).includes("Date")) {
                            data.forEach((row) => {
                                row.Date = new Date(row.Date).toLocaleString()
                            })
                        }
                        if (category == "Organization") {
                            const fetchCounts = data.map(org => {
                                const id = org.org_id;
                                return fetch(`http://localhost:3000/api/product/count?org_id=${id}`)
                                    .then(response => response.json())
                                    .then(count => {
                                        org.productNo = count
                                        return org
                                    })
                            });
                            Promise.all(fetchCounts)
                                .then(updatedOrgs => {
                                    setData(updatedOrgs);
                                });
                        }
                        else {
                            setData(data)
                        }
                    })
                    .catch(error => console.error(`Error fetching ${category}:`, error));
            }
        }
        catch {
            alert("Failed to connect to backend")
        }
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data])

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
                        <tr>
                            {Object.keys(headers).map((header) => {
                                return (
                                    <th>
                                        {header}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {currentDataList.length > 0 ? (
                            currentDataList.map((currentData) => (
                                <tr >
                                    {Object.values(headers).map((value) => {
                                        return (<td>{currentData[value]}</td>)
                                    })}
                                    <td style={{ textAlign: "center" }}>
                                        <NavLink className={styles.detailBtn}>Details</NavLink>
                                    </td>
                                </tr>
                            ))
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
