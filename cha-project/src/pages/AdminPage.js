import React from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'
import AdminNavBar from '../components/AdminNavBar'
import styles from "../styles/AdminPage.module.css"
import { MdBusinessCenter } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { RiCustomerServiceFill } from "react-icons/ri";

const AdminPage = () => {
    return (
        <main style={{ display: 'flex', flexDirection: "row", backgroundColor: "#F1F2F7" }}>
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

                </div>
            </div>


        </main>
    );
};

export default AdminPage;
