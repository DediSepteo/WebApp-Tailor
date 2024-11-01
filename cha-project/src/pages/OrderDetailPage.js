import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar';
import AdminNavBar from '../components/AdminNavBar';
import styles from '../styles/AdminHomePage.module.css';
import ConfirmPopUp from '../components/CustomPopUp';
import { MdBusinessCenter } from 'react-icons/md';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { RiCustomerServiceFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import CustomPopUp from '../components/CustomPopUp';

const AdminOrderPage = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [readyOrders, setReadyOrders] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const token = sessionStorage.getItem('authToken');

    const togglePopUp = () => {
        setShowPopup(!showPopup); // Toggles the confirmation popup
    };

    const isCorpPage = window.location.href.includes("corporate")

    const type = isCorpPage ? "Corporate" : "Government"

    useEffect(() => {
        try {
            fetch(`http://localhost:3000/api/order/get-latest-order?type=${type}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Adding Authorization Bearer Token
                    'Content-Type': 'application/json'   // Optional: you can add other headers if necessary
                }
            })
                .then(response => response.json())
                .then(data => setRecentOrders(data))
                .catch(error => console.error('Error fetching orders:', error));
            fetch(`http://localhost:3000/api/order/ready?type=${type}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Adding Authorization Bearer Token
                    'Content-Type': 'application/json'   // Optional: you can add other headers if necessary
                }
            })
                .then(response => response.json())
                .then(data => setReadyOrders(data))
                .catch(error => console.error('Error fetching orders:', error));
        }
        // Get Orders
        // fetch('/api/order/get-latest-order', {
        catch {
            alert("Failed to connect to backend")
        }
    }, []);

    return (
        <main style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F1F2F7', margin: 0 }}>
            {showPopup && <CustomPopUp togglePopup={togglePopUp} title="Cancel Order" text="Are you sure you want to cancel this order?" hasCancel={true} />}
            <AdminSideNavBar />
            <div className={styles.home}>
                <AdminNavBar pageName="Dashboard" />

                <div className={styles.orderHist}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "1em" }}>
                        <div style={{ fontFamily: 'Inter', fontWeight: 'bold', alignSelf: 'flex-start' }}>Orders Ready For Tailoring</div>
                        <NavLink className={styles.link} to='/admin/dashboard/view-orders'>View All</NavLink>
                    </div>
                    <table className={styles.orderTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Placed By</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>No. of Measurements Obtained</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {readyOrders.length > 0 ? (
                                readyOrders.map((orderData) => (
                                    <tr key={orderData.Order_ID}>
                                        <td>{new Date(orderData.Date).toLocaleString()}</td>
                                        <td>{orderData.name}</td>
                                        <td>{`$${orderData.price}`}</td>
                                        <td>{orderData.qty}</td>
                                        <td>{orderData.measurementNo}</td>
                                        <td>{orderData.status}</td>
                                        <td className={styles.tableBtns}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <NavLink className={styles.detailBtn}>Details</NavLink>
                                                <button className={styles.cancelBtn} onClick={togglePopUp}>Cancel</button>
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
                </div>
                <div className={styles.orderHist}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "1em" }}>
                        <div style={{ fontFamily: 'Inter', fontWeight: 'bold', alignSelf: 'flex-start' }}>Latest Order History</div>
                        <NavLink className={styles.link} to='/admin/dashboard/view-orders'>View All</NavLink>
                    </div>
                    <table className={styles.orderTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Placed By</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>No. of Measurements Obtained</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.length > 0 ? (
                                recentOrders.map((orderData) => (
                                    <tr key={orderData.Order_ID}>
                                        <td>{new Date(orderData.Date).toLocaleString()}</td>
                                        <td>{orderData.name}</td>
                                        <td>{`$${orderData.price}`}</td>
                                        <td>{orderData.qty}</td>
                                        <td>{orderData.measurementNo}</td>
                                        <td>{orderData.status}</td>
                                        <td className={styles.tableBtns}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <NavLink className={styles.detailBtn}>Details</NavLink>
                                                <button className={styles.cancelBtn} onClick={togglePopUp}>Cancel</button>
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
                </div>
            </div>
        </main >
    );
};

export default AdminOrderPage;
