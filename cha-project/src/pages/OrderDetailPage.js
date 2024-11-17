import React, { useState, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar';
import AdminNavBar from '../components/AdminNavBar';
import styles from '../styles/OrderDetailPage.module.css';
import CustomPopUp from '../components/CustomPopUp';
import { useLocation, useNavigate } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import { NavLink } from 'react-router-dom';

const OrderDetailPage = ({ }) => {
    const location = useLocation()
    const [measurementData, setMeasurementData] = useState([])
    const [showMarkAllPopup, setShowMarkAllPopup] = useState(false);
    const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
    const [completion, setCompletion] = useState([])

    const orderData = location.state?.orderData

    const navigate = useNavigate()

    const token = sessionStorage.getItem('authToken');

    const toggleMarkAllPopUp = () => {
        setShowMarkAllPopup(!showMarkAllPopup); // Toggles the confirmation popup
    };

    const toggleDeliveryPopUp = () => {
        setShowDeliveryPopup(!showDeliveryPopup);
    }

    const toggleCompletionStatus = (index) => {
        setCompletion(completion.map((status, i) => (i === index ? !status : status)))
    }

    const setAllCompleted = () => {
        setCompletion(completion.map((status) => !status))
    }

    const handleSubmit = () => {
        const isAllComplete = completion.every((status) => {
            return status
        })
        console.log(isAllComplete)
        if (!isAllComplete)
            alert("One or more orders are not complete.")
        else {
            alert("Delivery Process begins here")
        }
    }

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

    return (
        <main style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#F1F2F7', margin: 0, overflowX: "hidden" }}>
            {showDeliveryPopup && <CustomPopUp togglePopup={toggleDeliveryPopUp} title="Begin Delivery Process" text="Are you sure you want to begin the delivery process? All orders have to be completed in order to begin the delivery process"
                hasCancel={true} onConfirm={handleSubmit} />}
            {showMarkAllPopup && <CustomPopUp togglePopup={toggleMarkAllPopUp} title="Mark all as Complete" text="Are you sure you want to mark all orders as completed?"
                hasCancel={true} onConfirm={setAllCompleted} />}
            <AdminSideNavBar />
            <div className={styles.home}>
                <AdminNavBar pageName={`Order Details for ${orderData["placed by"]}`} />
                <header style={{}}>
                    <NavLink className={styles.backBtn} onClick={(e) => { e.preventDefault(); navigate(-1) }}>Go back</NavLink>
                    <div style={{ fontFamily: "inter", fontWeight: "600", padding: "1em 0", textAlign: "center" }}>Measurement List</div>
                </header>
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
                                    <div style={{ marginTop: "1em" }}>
                                        {completion[index] ? (
                                            <div className={styles.completionBtn} style={{ backgroundColor: "#18FF4E" }} onClick={() => toggleCompletionStatus(index)}>
                                                <div className={styles.checkbox}><TiTick /></div>
                                                <div style={{ textAlign: "center", userSelect: "none" }}>Completed</div>
                                            </div>
                                        ) : (
                                            <div className={styles.completionBtn} style={{ backgroundColor: "#DDDDDD" }} onClick={() => toggleCompletionStatus(index)}>
                                                <div className={styles.checkbox}></div>
                                                <div style={{ textAlign: "center", userSelect: "none" }}>In Progress</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                ) : (
                    <div>No order data found</div>
                )}
                <div className={styles.markAllComplete} onClick={toggleDeliveryPopUp}>Begin Delivery Process</div>
                <div className={styles.markAllComplete} onClick={toggleMarkAllPopUp}>Mark/Unmark all as completed</div>
            </div>
        </main >
    );
};

export default OrderDetailPage;
