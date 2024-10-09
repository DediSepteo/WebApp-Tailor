import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar';
import AdminNavBar from '../components/AdminNavBar';
import styles from '../styles/AdminHomePage.module.css';
import { NavLink } from 'react-router-dom';

const ViewAllOrder = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10); // Display 10 orders per page

    useEffect(() => {
        fetch('http://localhost:3000/api/order/')
            .then(response => response.json())
            .then(data => setOrdersData(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    // Get current orders for the current page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = ordersData.slice(indexOfFirstOrder, indexOfLastOrder);

    // Calculate total pages
    const totalPages = Math.ceil(ordersData.length / ordersPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <main style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F1F2F7', margin: 0 }}>
            <AdminSideNavBar />

            <div className={styles.orderHist}>
                <div
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1em' }}
                >
                    <div style={{ fontFamily: 'Inter', fontWeight: 'bold', alignSelf: 'flex-start' }}>All Order History</div>
                    <NavLink to='/admin/dashboard/'>Go back</NavLink>
                </div>
                <table className={styles.orderTable}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Placed By</th>
                            <th>Quantity</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>No. of Measurements Obtained</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.length > 0 ? (
                            currentOrders.map((orderData) => (
                                <tr key={orderData.Order_ID}>
                                    <td>{orderData.order_ID}</td>
                                    <td>{new Date(orderData.Date).toLocaleString()}</td>
                                    <td>{orderData.name}</td>
                                    <td>{orderData.qty}</td>
                                    <td>{orderData.Type}</td>
                                    <td>{orderData.price}</td>
                                    <td>{orderData.measurements}</td>
                                    <td>{orderData.status}</td>
                                    <td className={styles.tableBtns}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <NavLink className={styles.detailBtn}>Details</NavLink>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No orders available</td>
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
        </main>
    );
}

export default ViewAllOrder;
