import React from 'react';
import styles from "../styles/AdminNavBar.module.css";
import { NavLink } from 'react-router-dom';
import { LuUserCircle2 } from "react-icons/lu";

const AdminNavBar = ({ pageName }) => {
    return (
        <div className={styles.NavBar}>
            <div className={styles.container}>
                <span className={styles.name}>{pageName}</span>
                <div className={styles.loginDiv}>
                    <NavLink className={styles.profile} to="/meow/1"><LuUserCircle2 /></NavLink>
                    <span className={styles.logout}>Logout</span>
                </div>

            </div>
        </div>
    );
};

export default AdminNavBar;
