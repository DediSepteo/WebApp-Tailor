import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { AiFillClockCircle } from "react-icons/ai";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import "../styles/Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="info">
                <h2 className="brand">
                    SnapStitch
                </h2>
                <div className="copyright">
                    <div>
                        Copyright © 2024 SnapStitch
                    </div>
                    <div>
                        All rights reserved
                    </div>
                </div>
            </div>
            <div className="support">
                <h3>Support</h3>
                <ul>
                    <li>Help center</li>
                    <li>Terms of service</li>
                    <li>Legal</li>
                    <li>Privacy Policy</li>
                    <li>Status</li>
                </ul>
            </div>
            <div className="contact">
                <h3>Contact Us</h3>
                <div className="location">
                    <IoLocationSharp />
                    123 Sunshine Street, Level 5, Singapore 456789
                </div>
                <div className="open_hrs">
                    <AiFillClockCircle />
                    Mon - Fri: 11am - 8pm | Sat: 11am - 6pm
                </div>
                <div className="mail">
                    <IoMail />
                    queuecut@snapstitch.com
                </div>
                <div className="tel">
                    <FaPhoneAlt />
                    +65 1234 5678
                </div>
            </div>
        </div>
    )
}

export default Footer