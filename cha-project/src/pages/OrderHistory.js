import React, { useState } from 'react';
import ProfileSideNavBar from '../components/ProfileSideNavBar';
import styles from '../styles/OrderHistory.module.css';

export const OrderHistory = () => {
    const [selectedTab, setSelectedTab] = useState('all');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <main className={styles.mainContainer}>
            <div className={styles.profileSideNav}>
                <ProfileSideNavBar/>
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
                        {selectedTab === 'all' && <div>All Orders Content</div>}
                        {selectedTab === 'ongoing' && <div>Ongoing Orders Content</div>}
                        {selectedTab === 'cancelled' && <div>Cancelled Orders Content</div>}
                    </div>
                <div className={styles.buttonContainer}></div>
                </section>
            </div>
        </main>
    );
};