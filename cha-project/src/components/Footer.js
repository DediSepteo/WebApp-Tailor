import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { AiFillClockCircle } from "react-icons/ai";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import styles from "../styles/Footer.module.css"; // Updated import

const Footer = () => {
    return (
        <div className={styles.footer}> {/* Apply the CSS module class */}
            <div className={styles.info}> {/* Apply the CSS module class */}
                <h2 className={styles.brand}> {/* Apply the CSS module class */}
                    SnapStitch
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
                <ul>
                    <li>Help center</li>
                    <li>Terms of service</li>
                    <li>Legal</li>
                    <li>Privacy Policy</li>
                    <li>Status</li>
                </ul>
            </div>
            <div className={styles.contact}> {/* Apply the CSS module class */}
                <h3>Contact Us</h3>
                <div className={styles.location}> {/* Apply the CSS module class */}
                    <IoLocationSharp />
                    123 Sunshine Street, Level 5, Singapore 456789
                </div>
                <div className={styles.open_hrs}> {/* Apply the CSS module class */}
                    <AiFillClockCircle />
                    Mon - Fri: 11am - 8pm | Sat: 11am - 6pm
                </div>
                <div className={styles.mail}> {/* Apply the CSS module class */}
                    <IoMail />
                    queuecut@snapstitch.com
                </div>
                <div className={styles.tel}> {/* Apply the CSS module class */}
                    <FaPhoneAlt />
                    +65 1234 5678
                </div>
            </div>
        </div>
    )
}

export default Footer;
