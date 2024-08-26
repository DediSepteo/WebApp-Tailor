import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { AiFillClockCircle } from "react-icons/ai";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import styles from "../styles/Footer.module.css"; // Updated import

const Footer = () => {
    return (
        <footer className={styles.footer}> {/* Apply the CSS module class */}
            <div className={styles.info}> {/* Apply the CSS module class */}
                <h2 className={styles.brand}> {/* Apply the CSS module class */}
                    BrandTailors Co.
                </h2>
                <div className={styles.copyright}> {/* Apply the CSS module class */}
                    <div>
                        Copyright © 2024 SnapStitch
                    </div>
                    <div>
                        All rights reserved
                    </div>
                </div>
            </div>
            <div className={styles.support}> {/* Apply the CSS module class */}
                <h3>Support</h3>
                <li>Help center</li>
                <li>Terms of service</li>
                <li>Legal</li>
                <li>Privacy Policy</li>
                <li>Status</li>
            </div>
            <div className={styles.contact}> {/* Apply the CSS module class */}
                <h3>Contact Us</h3>
                <li><IoLocationSharp />123 Sunshine Street, Level 5, Singapore 456789</li>
                <li><AiFillClockCircle />Mon - Fri: 11am - 8pm | Sat: 11am - 6pm</li>
                <li><IoMail />queuecut@snapstitch.com</li>
                <li><FaPhoneAlt />+65 1234 5678</li>
            </div>
        </footer>
    )
}

export default Footer;
