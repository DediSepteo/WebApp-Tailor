import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar';
import AdminNavBar from '../components/AdminNavBar';
import styles from '../styles/AdminHomePage.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomPopUp from '../components/CustomPopUp';

const AdminOrderPage = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [readyOrders, setReadyOrders] = useState([]);
    const [cancelOrderID, setCancelOrderID] = useState("")
    const [showCancelPopup, setCancelPopup] = useState(false);

    const navigate = useNavigate()

    const token = sessionStorage.getItem('authToken');

    const toggleCancelPopUp = (id) => {
        setCancelOrderID(id)
        setCancelPopup(!showCancelPopup); // Toggles the confirmation popup
    };

    const toDetails = (orderData) => {
        navigate('/admin/order-details', { state: { orderData: orderData } })
    }

    const handleCancel = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/order/cancel/${cancelOrderID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert("Order Cancelled!")
                window.location.reload()
            }
            else {
                alert('Failed to cancel order');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Error cancelling order');
        }
    }
    const getURL = window.location.href

    const isCorpPage = window.location.href.includes("corporate")

    const type = isCorpPage ? "corporate" : "government"

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
            fetch(`http://localhost:3000/api/order/ready?type=${type}&limit=5`, {
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
    }, [getURL]);

    return (
        <main style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F1F2F7', margin: 0 }}>
            {showCancelPopup && <CustomPopUp togglePopup={toggleCancelPopUp} onConfirm={handleCancel} title="Cancel Order" text="Are you sure you want to cancel this order?" hasCancel={true} />}
            <AdminSideNavBar />
            <div className={styles.home}>
                <AdminNavBar pageName={`Manage Orders (${type[0].toUpperCase()}${type.slice(1)})`} />

                <div className={styles.orderHist}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "1em" }}>
                        <div style={{ fontFamily: 'Inter', fontWeight: 'bold', alignSelf: 'flex-start' }}>Orders Ready For Tailoring</div>
                        <NavLink className={styles.link} to={`/admin/${type}/view-ready-orders`}>View All</NavLink>
                    </div>
                    <table className={styles.orderTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Placed By</th>
                                <th>Subtotal</th>
                                <th>Quantity</th>
                                <th>No. of Measurements Obtained</th>
                                <th>Status</th>
                                {readyOrders.length > 0 && (
                                    <th></th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {readyOrders.length > 0 ? (
                                readyOrders.map((orderData) => (
                                    <tr key={orderData.order_id}>
                                        <td>{new Date(orderData.date).toLocaleString()}</td>
                                        <td>{orderData["placed by"]}</td>
                                        <td>{`₱${orderData.subtotal}`}</td>
                                        <td>{orderData.qty}</td>
                                        <td>{orderData.measurementNo}/{orderData.qty}</td>
                                        <td>{orderData.status}</td>
                                        <td className={styles.tableBtns}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <button className={styles.detailBtn} onClick={() => { toDetails(orderData) }}>Details</button>
                                                <button className={styles.cancelBtn} onClick={() => { toggleCancelPopUp(orderData.order_id) }}>Cancel</button>
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
                        <NavLink className={styles.link} to={`/admin/${type}/view-orders`}>View All</NavLink>
                    </div>
                    <table className={styles.orderTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Placed By</th>
                                <th>Subtotal</th>
                                <th>Quantity</th>
                                <th>No. of Measurements Obtained</th>
                                <th>Status</th>
                                {recentOrders.length > 0 && (
                                    <th></th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.length > 0 ? (
                                recentOrders.map((orderData) => (
                                    <tr key={orderData.order_id}>
                                        <td>{new Date(orderData.date).toLocaleString()}</td>
                                        <td>{orderData["placed by"]}</td>
                                        <td>{`₱${orderData.subtotal}`}</td>
                                        <td>{orderData.qty}</td>
                                        <td>{orderData.measurementNo}/{orderData.qty}</td>
                                        <td>{orderData.status}</td>
                                        <td className={styles.tableBtns}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <button className={styles.detailBtn} onClick={() => { toDetails(orderData) }}>Details</button>
                                                <button className={styles.cancelBtn} onClick={() => { toggleCancelPopUp(orderData.order_id) }}>Cancel</button>
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
