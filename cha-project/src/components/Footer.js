import React, { useEffect } from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { AiFillClockCircle } from "react-icons/ai";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import styles from "../styles/Footer.module.css"; // Updated import

const Footer = ({ isContentShort }) => {
    return (
        <footer className={styles.footer} style={{ position: isContentShort ? 'absolute' : 'static', bottom: isContentShort ? 0 : 'auto' }}>
            <div className={styles.info}>
                <h2 className={styles.brand}>
                    BrandTailors Co.
                </h2>
                <div className={styles.copyright}>
                    <div>
                        Copyright © 2024 BrandTailors Co.
                    </div>
                    <div>
                        All rights reserved
                    </div>
                </div>
            </div>
            <div className={styles.support}>
                <ul>
                    <li className={styles.listHeader}>Support</li>
                    <li>Help center</li>
                    <li>Terms of service</li>
                    <li>Legal</li>
                    <li>Privacy Policy</li>
                    <li>Status</li>
                </ul>
            </div>
            <div className={styles.contact}>
                <ul>
                    <li className={styles.listHeader}>Contact Us</li>
                    <li><IoLocationSharp className={styles.icons} />123 Sunshine Street, Level 5, Singapore 456789</li>
                    <li><AiFillClockCircle className={styles.icons} />Mon - Fri: 11am - 8pm | Sat: 11am - 6pm</li>
                    <li><IoMail className={styles.icons} />queuecut@snapstitch.com</li>
                    <li><FaPhoneAlt className={styles.icons} />+65 1234 5678</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
