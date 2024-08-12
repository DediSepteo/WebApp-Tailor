// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'; // Importing CSS for styling
import { FaRegUser } from "react-icons/fa6";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                BrandTailors Co.
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><Link to="/Login"> <FaRegUser /> Login / Register</Link></li>
                    <li><Link to="/About">About</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
