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

const AdminPage = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [orgCount, setOrgCount] = useState(0);
    const [revSum, setRevSum] = useState(0);
    const [cancelOrderID, setCancelOrderID] = useState("")
    const [showCancelPopup, setCancelPopup] = useState(false);

    const token = sessionStorage.getItem('authToken');

    const toggleCancelPopUp = (id) => {
        setCancelOrderID(id)
        setCancelPopup(!showCancelPopup); // Toggles the confirmation popup
    };

    const handleCancel = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/order/cancel/${cancelOrderID}`, {
                method: 'PUT',
            });

            if (response.ok) {
                alert("Order Cancelled!")
                window.location.reload()
            }
            else {
                console.log(response)
                alert('Failed to cancel order');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Error cancelling order');
        }
    }

    useEffect(() => {
        try {
            fetch('http://localhost:3000/api/order/ready', {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Adding Authorization Bearer Token
                    'Content-Type': 'application/json'   // Optional: you can add other headers if necessary
                }
            })
                .then(response => response.json())
                .then(data => setOrdersData(data))
                .catch(error => console.error('Error fetching orders:', error));

            // Get the total biz
            fetch('http://localhost:3000/api/org/count/', {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Adding Authorization Bearer Token
                    'Content-Type': 'application/json'   // Optional: you can add other headers if necessary
                }
            })
                .then(response => response.json())
                .then(data => {
                    setOrgCount(data.results);
                    console.log('Organization Count:', data.results); // For debugging
                })
                .catch(error => console.error('Error fetching org count:', error));

            // Get the sum of the revenue
            fetch('http://localhost:3000/api/order/revenue', {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Adding Authorization Bearer Token
                    'Content-Type': 'application/json'   // Optional: you can add other headers if necessary
                }
            })
                .then(response => response.json())
                .then(data => {
                    setRevSum(data.totalRevenue);
                    console.log("Revenue Data: ", data); // For debugging
                })
                .catch(error => console.error('Error fetching total revenue:', error));
        }
        // Get Orders
        // fetch('/api/order/get-latest-order', {
        catch {
            alert("Failed to connect to backend")
        }
    }, []);

    return (
        <main style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F1F2F7', margin: 0 }}>
            {showCancelPopup && <CustomPopUp togglePopup={toggleCancelPopUp} onConfirm={handleCancel} title="Cancel Order" text="Are you sure you want to cancel this order?" hasCancel={true} />}
            <AdminSideNavBar />
            <div className={styles.home}>
                <AdminNavBar pageName="Dashboard" />
                <div className={styles.overview}>
                    <div className={styles.card} style={{ backgroundColor: '#3F84FC' }}>
                        <span className={styles.cardHead}>Businesses</span>
                        <div className={styles.cardBase}>
                            <MdBusinessCenter className={styles.icon} />
                            <span style={{ fontSize: '1.5em', alignSelf: 'end' }}>{orgCount}</span>
                        </div>
                    </div>
                    <div className={styles.card} style={{ backgroundColor: '#1DAB47' }}>
                        <span className={styles.cardHead}>Revenue</span>
                        <div className={styles.cardBase}>
                            <FaHandHoldingUsd className={styles.icon} />
                            <span style={{ fontSize: '1.5em', alignSelf: 'end' }}>${revSum}</span>
                        </div>
                    </div>
                    <div className={styles.card} style={{ backgroundColor: '#FC413F' }}>
                        <span className={styles.cardHead}>Open Tickets</span>
                        <div className={styles.cardBase}>
                            <RiCustomerServiceFill className={styles.icon} />
                            <span style={{ fontSize: '1.5em', alignSelf: 'end' }}>12</span>
                        </div>
                    </div>
                </div>

                <div className={styles.tools}>
                    <div className={styles.activity}>
                        <div className={styles.actHead}>
                            <span style={{ paddingLeft: '1.5em' }}>Recent Activity</span>
                        </div>
                        <div className={styles.actRow}>
                            <span className={styles.time}>32 mins ago</span>
                            <span className={styles.info}>BrandTailors Co. placed an order</span>
                            <NavLink className={styles.view}>View</NavLink>
                        </div>
                        <div className={styles.actRow}>
                            <span className={styles.time}>1h ago</span>
                            <span className={styles.info}>BrandTailors Co. registered as a partner</span>
                            <NavLink className={styles.view}>View</NavLink>
                        </div>
                        <div className={styles.actRow}>
                            <span className={styles.time}>2h 10 mins ago</span>
                            <span className={styles.info}>BrandTailors Co. requested to join</span>
                            <NavLink className={styles.view}>View</NavLink>
                        </div>
                    </div>
                </div>

                <div className={styles.orderHist}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "1em" }}>
                        <div style={{ fontFamily: 'Inter', fontWeight: 'bold', alignSelf: 'flex-start' }}>Orders Ready for Tailoring</div>
                        <NavLink className={styles.link} to='/admin/dashboard/view-orders'>View All</NavLink>
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
                                {ordersData.length > 0 && (
                                    <th></th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {ordersData.length > 0 ? (
                                ordersData.map((orderData) => (
                                    <tr key={orderData.order_id}>
                                        <td>{new Date(orderData.date).toLocaleString()}</td>
                                        <td>{orderData["placed by"]}</td>
                                        <td>{`$${orderData.subtotal}`}</td>
                                        <td>{orderData.qty}</td>
                                        <td>{orderData.measurementNo}</td>
                                        <td>{orderData.status}</td>
                                        <td className={styles.tableBtns}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <NavLink className={styles.detailBtn}>Details</NavLink>
                                                <button className={styles.cancelBtn} onClick={() => toggleCancelPopUp(orderData.order_id)}>Cancel</button>
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

export default AdminPage;
