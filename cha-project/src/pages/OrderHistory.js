import React, { useState, useEffect, useCallback } from 'react';
import ProfileSideNavBar from '../components/ProfileSideNavBar';
import styles from '../styles/OrderHistory.module.css';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export const OrderHistory = () => {
    const [selectedTab, setSelectedTab] = useState('all');
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [ongoingOrders, setOngoingOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        if (tab === 'all') {
            setOrders(allOrders);
        } else if (tab === 'ongoing') {
            setOrders(ongoingOrders);
        } else if (tab === 'cancelled') {
            setOrders(cancelledOrders);
        }
    };

    const fetchAllOrders = useCallback(async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const orgID = decodedToken.org_id;
            try {
                const response = await fetch(`http://localhost:3000/api/org/all-orders/${orgID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setAllOrders(data);
                if (selectedTab === 'all') {
                    setOrders(data);
                }
            } catch (error) {
                console.error('Error fetching all orders:', error);
            }
        }
    }, [selectedTab]);

    const fetchOngoingOrders = useCallback(async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const orgID = decodedToken.org_id;
            try {
                const response = await fetch(`http://localhost:3000/api/org/ongoing-orders/${orgID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setOngoingOrders(data);
                if (selectedTab === 'ongoing') {
                    setOrders(data);
                }
            } catch (error) {
                console.error('Error fetching ongoing orders:', error);
            }
        }
    }, [selectedTab]);

    const fetchCancelledOrders = useCallback(async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const orgID = decodedToken.org_id;
            try {
                const response = await fetch(`http://localhost:3000/api/org/cancelled-orders/${orgID}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setCancelledOrders(data);
                if (selectedTab === 'cancelled') {
                    setOrders(data);
                }
            } catch (error) {
                console.error('Error fetching cancelled orders:', error);
            }
        }
    }, [selectedTab]);

    useEffect(() => {
        fetchAllOrders();
        fetchOngoingOrders();
        fetchCancelledOrders();
    }, [fetchAllOrders, fetchOngoingOrders, fetchCancelledOrders]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return '#06C100';
            case 'Ready':
                return '#FFD940';
            case 'Cancelled':
                return '#F6393C';
            default:
                return '#F38A00';
        }
    };

    // Group orders by order_id
    const groupedOrders = orders.reduce((acc, order) => {
        if (!acc[order.order_id]) {
            acc[order.order_id] = [];
        }
        acc[order.order_id].push(order);
        return acc;
    }, {});

    const renderOrders = (orders) => {
        // Sort the order IDs in descending order
        const sortedOrderIds = Object.keys(orders).sort((a, b) => b - a);

        return (
            <div>
                {sortedOrderIds.map((orderId) => {
                    const orderGroup = orders[orderId];
                    const firstOrder = orderGroup[0]; // Get the first order to display common fields

                    return (
                        <div key={orderId} className={styles.tableWrap}>
                            <div className={styles.tableTop}>
                                <table className={styles.tableHeader}>
                                    <thead>
                                        <tr>
                                            <th className={styles.regCol}>Order Placed On</th>
                                            <th className={styles.regCol}>Grand Total</th>
                                            <th className={styles.largeCol}>Shipping To</th>
                                            <th className={styles.regCol} style={{ textAlign: 'right' }}>Order ID <span style={{ color: '#000000' }}>#{orderId}</span></th>
                                        </tr>
                                    </thead>
                                </table>
                                <table className={styles.tableHeaderContent}>
                                    <tbody>
                                        <tr>
                                            <td className={styles.regCol} style={{ color: '#000000' }}>{firstOrder.date}</td>
                                            <td className={styles.regCol} style={{ color: '#000000' }}>${firstOrder.subtotal}</td>
                                            <td className={styles.largeCol} style={{ color: '#000000' }}>{firstOrder.address_line1}</td>
                                            <td className={styles.regCol} style={{ textAlign: 'right' }}>
                                                <Link to="#" className={styles.cancelLink}>
                                                    Cancel Order
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Table Bottom: Additional Information */}
                            <div className={styles.tableBottom}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={styles.orderStatus}>Status: <span style={{ color: getStatusColor(firstOrder.status) }}>{firstOrder.status}</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderGroup.map((order) => (
                                            <tr key={order.name}>
                                                <td className={styles.productDetails}>
                                                    <img
                                                        src="https://placehold.co/430x640" // Replace with item.image_url if available
                                                        alt={order.name}
                                                        className={styles.productImage}
                                                    />
                                                    <div className={styles.productText}>
                                                        <div className={styles.productName}>{order.name || 'N/A'}</div>
                                                        <div className={styles.productDescription}>{order.description || 'N/A'}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={styles.qtyText}>x{order.qty || 'N/A'}</div>
                                                    <div className={styles.priceCalc}>
                                                        <div>Unit price: ₱{order.price || 'N/A'}</div>
                                                        <div>Total {order.qty || 'N/A'} items: ₱{order.total_price || 'N/A'}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <main className={styles.mainContainer}>
            <div className={styles.profileSideNav}>
                <ProfileSideNavBar />
            </div>
            <div className={styles.content}>
                <section>
                    <p className={styles.pageTitle}>Order History</p>
                    <div className={styles.tabContainer}>
                        <button
                            className={`${styles.tabButton} ${selectedTab === 'all' ? styles.activeTab : ''}`}
                            onClick={() => handleTabClick('all')}
                        >
                            All Orders
                        </button>
                        <button
                            className={`${styles.tabButton} ${selectedTab === 'ongoing' ? styles.activeTab : ''}`}
                            onClick={() => handleTabClick('ongoing')}
                        >
                            Ongoing Orders
                        </button>
                        <button
                            className={`${styles.tabButton} ${selectedTab === 'cancelled' ? styles.activeTab : ''}`}
                            onClick={() => handleTabClick('cancelled')}
                        >
                            Cancelled Orders
                        </button>
                    </div>
                    <div className={styles.tabContent}>
                        {selectedTab === 'all' && renderOrders(groupedOrders)}
                        {selectedTab === 'ongoing' && renderOrders(groupedOrders)}
                        {selectedTab === 'cancelled' && renderOrders(groupedOrders)}
                    </div>
                </section>
            </div>
        </main>
    );
};