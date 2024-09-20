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

    const togglePopUp = () => {
        setShowPopup(!showPopup); // Toggles the confirmation popup
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/order/')
            .then(response => response.json())
            .then(data => setOrdersData(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
        <main style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F1F2F7', margin: 0 }}>
            {showPopup && <CustomPopUp togglePopup={togglePopUp} title="Cancel Order" text="Are you sure you want to cancel this order?" hasCancel={true} />}
            <AdminSideNavBar />
            <div className={styles.home}>
                <AdminNavBar pageName="Dashboard" />
                <div className={styles.overview}>
                    <div className={styles.card} style={{ backgroundColor: '#3F84FC' }}>
                        <span className={styles.cardHead}>Businesses</span>
                        <div className={styles.cardBase}>
                            <MdBusinessCenter className={styles.icon} />
                            <span style={{ fontSize: '1.5em', alignSelf: 'end' }}>114</span>
                        </div>
                    </div>
                    <div className={styles.card} style={{ backgroundColor: '#1DAB47' }}>
                        <span className={styles.cardHead}>Revenue</span>
                        <div className={styles.cardBase}>
                            <FaHandHoldingUsd className={styles.icon} />
                            <span style={{ fontSize: '1.5em', alignSelf: 'end' }}>$25,552</span>
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
                    <div
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1em' }}
                    >
                        <div style={{ fontFamily: 'Inter', fontWeight: 'bold', alignSelf: 'flex-start' }}>Order History</div>
                        <NavLink className={styles.link}>View All</NavLink>
                    </div>
                    <table className={styles.orderTable}>
                        <thead>
                            <tr>
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
                            {ordersData.length > 0 ? (
                                ordersData.map((orderData) => (
                                    <tr key={orderData.Order_ID}>
                                        <td>{new Date(orderData.Date).toLocaleString()}</td>
                                        <td>{orderData.Org_Name}</td>
                                        <td>{orderData.Quantity}</td>
                                        <td>{orderData.Type}</td>
                                        <td>{orderData.Price}</td>
                                        <td>{orderData.MeasurementNo}</td>
                                        <td>{orderData.Status}</td>
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
        </main>
    );
};

export default AdminPage;
