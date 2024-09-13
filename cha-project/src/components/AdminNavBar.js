import React from 'react';
import styles from "../styles/AdminNavBar.module.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { LuUserCircle2 } from "react-icons/lu";

const AdminNavBar = ({ pageName }) => {
        const handleLogout = () => {
        sessionStorage.removeItem('token')
    }
    return (
        <div className={styles.NavBar}>
            <div className={styles.container}>
                <span className={styles.name}>{pageName}</span>
                <div className={styles.loginDiv}>
                    <NavLink className={styles.profile} to="/admin/1"><LuUserCircle2 /></NavLink>
                    <NavLink onClick={handleLogout} className={styles.logout} to='/admin/login'>Logout</NavLink>
                </div>
            </div>
        </div>
    );
};

export default AdminNavBar;
