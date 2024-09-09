import React from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'
import AdminNavBar from '../components/AdminNavBar'
import styles from "../styles/AdminPage.module.css"
import ConfirmPopUp from '../components/ConfirmPopUp';
import { MdBusinessCenter } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { RiCustomerServiceFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const ordersData = [
    { "id": 1, "date": "Sat, 10 January 2025 08:24:17 AM", "placedBy": "BrandTailors Co.", "quantity": 10, "type": "corporate", "price": "$266.67", "measurementNo": "10/10", "status": "Delivered" },
    { "id": 2, "date": "Sat, 10 January 2025 08:24:17 AM", "placedBy": "Long Long Long Long Brand Name", "quantity": 10, "type": "Government", "price": "$100000", "measurementNo": "10/10", "status": "Delivered" },
    { "id": 3, "date": "Sat, 10 January 2025 08:24:17 AM", "placedBy": "BrandTailors Co.", "quantity": 10, "type": "corporate", "price": "$266.67", "measurementNo": "10/10", "status": "Delivered" },
    { "id": 4, "date": "Sat, 10 January 2025 08:24:17 AM", "placedBy": "BrandTailors Co.", "quantity": 10, "type": "corporate", "price": "$266.67", "measurementNo": "6/10", "status": "Awaiting Measurements" }
]

const AdminPage = () => {
    return (
        <main style={{ display: 'flex', flexDirection: "row", backgroundColor: "#F1F2F7" }}>
            <ConfirmPopUp />
            <AdminSideNavBar />
            <div className={styles.home}>
                <AdminNavBar />
                <div className={styles.overview}>
                    <div className={styles.card} style={{ backgroundColor: "#3F84FC" }}>
                        <span className={styles.cardHead}>Businesses</span>
                        <div className={styles.cardBase}><MdBusinessCenter className={styles.icon} /><span style={{ fontSize: "1.5em", alignSelf: "end" }}>114</span></div>
                    </div>
                    <div className={styles.card} style={{ backgroundColor: "#1DAB47" }}>
                        <span className={styles.cardHead}>Revenue</span>
                        <div className={styles.cardBase}><FaHandHoldingUsd className={styles.icon} /><span style={{ fontSize: "1.5em", alignSelf: "end" }}>$25,552</span></div>
                    </div>
                    <div className={styles.card} style={{ backgroundColor: "#FC413F" }}>
                        <span className={styles.cardHead}>Open Tickets</span>
                        <div className={styles.cardBase}><RiCustomerServiceFill className={styles.icon} /><span style={{ fontSize: "1.5em", alignSelf: "end" }}>12</span></div>
                    </div>
                </div>
                <div className={styles.tools}>
                    <div className={styles.activity}>
                        <div className={styles.actHead}><span style={{ paddingLeft: "1.5em" }}>Recent Activity</span></div>
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
                    <div style={{ fontFamily: "Inter", fontWeight: "bold", alignSelf: "flex-start", padding: "1em" }}>Order History</div>
                    <table className={styles.orderTable}>
                        <tr>
                            <th>Date</th>
                            <th>Placed By</th>
                            <th>Quantity</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>No. of Measurements Obtained</th>
                            <th>Status</th>
                        </tr>
                        {ordersData.map((orderData) => (
                            <tr>
                                <td>{orderData.date}</td>
                                <td>{orderData.placedBy}</td>
                                <td>{orderData.quantity}</td>
                                <td className={styles.type}>{orderData.type}</td>
                                <td>{orderData.price}</td>
                                <td>{orderData.measurementNo}</td>
                                <td>{orderData.status}</td>
                                <td className={styles.tableBtns}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <NavLink className={styles.detailBtn}>Details</NavLink>
                                        <button className={styles.cancelBtn}>Cancel</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </main>
    );
};

export default AdminPage;
