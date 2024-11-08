import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar';
import AdminNavBar from '../components/AdminNavBar';
import styles from '../styles/OrderDetailPage.module.css';
import CustomPopUp from '../components/CustomPopUp';
import { useLocation } from 'react-router-dom';

const OrderDetailPage = ({ }) => {
    const location = useLocation()
    const [measurementData, setMeasurementData] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [completion, setCompletion] = useState([])

    const { orderData } = location.state

    const token = sessionStorage.getItem('authToken');

    const togglePopUp = () => {
        setShowPopup(!showPopup); // Toggles the confirmation popup
    };

    useEffect(() => {
        try {
            fetch(`http://localhost:3000/api/order/measurements?order_id=${orderData.order_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Adding Authorization Bearer Token
                    'Content-Type': 'application/json'   // Optional: you can add other headers if necessary
                }
            })
                .then(response => response.json())
                .then(data => {
                    setCompletion(Array(data.length).fill(false))
                    setMeasurementData(data)
                })
                .catch(error => console.error('Error fetching orders:', error));
        }
        // Get Orders
        // fetch('/api/order/get-latest-order', {
        catch {
            alert("Failed to connect to backend")
        }
    }, []);

    useEffect(() => {
        console.log(measurementData)
    }, [measurementData])

    return (
        <main style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F1F2F7', margin: 0, overflowX: "hidden" }}>
            {showPopup && <CustomPopUp togglePopup={togglePopUp} title="Cancel Order" text="Are you sure you want to cancel this order?" hasCancel={true} />}
            <AdminSideNavBar />
            <div className={styles.home}>
                <AdminNavBar pageName={`Order Details for ${orderData["placed by"]}`} />
                <header style={{ fontFamily: "inter", fontWeight: "600", padding: "1em 0", textAlign: "center" }}>Measurement List</header>
                {measurementData.length > 0 ? (
                    <div className={styles.list}>
                        {measurementData.map((data, index) => {
                            const measurements = JSON.parse(data.measurement)
                            return (
                                <div className={styles.card}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
                                        <header className={styles.headerInfo}>
                                            <div style={{ fontSize: "1.5em" }}>{`${data.employee_name}`}</div>
                                            <div style={{ fontWeight: "1.5em", marginRight: "1.5em" }}>{`${data.product_name}`}</div>
                                        </header>
                                        <header className={styles.headerInfo} style={{ alignItems: "flex-end" }}>
                                            <div style={{ fontWeight: "200" }}>ID: {`02-6901`}</div>
                                            <div style={{ fontWeight: "200" }}>Product-ID:  {`${data.product_id}`}</div>
                                        </header>
                                    </div>
                                    <div>
                                        <header style={{ marginTop: "1.5em", fontWeight: 500, fontSize: "1.1em" }}>Measurements</header>
                                        {Object.entries(measurements).map(([key, value]) => {
                                            return (
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "2.5em" }}>
                                                    <p style={{ textDecoration: "underline" }}>{key}</p>
                                                    <p>{value}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        {console.log(completion[index])}
                                        {completion[index] ? (
                                            <div>In Progress</div>
                                        ) : (
                                            <div>Completed</div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div>No order data found</div>
                )}
            </div>
        </main >
    );
};

export default OrderDetailPage;
