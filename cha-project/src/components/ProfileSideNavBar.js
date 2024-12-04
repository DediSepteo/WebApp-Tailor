import React from 'react';
import styles from "../styles/ProfileSideNavBar.module.css";
import { NavLink } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { MdOutlineSupervisorAccount } from "react-icons/md";


const Links = [
    { name: "Back Home", path: "/home", icon: <IoMdArrowRoundBack /> },
    { name: "My Profile", path: "/profile", icon: <FaUser /> },
    { name: "Order History", path: "/orderhistory", icon: <FaHistory /> },
    { name: "Temporary Account", path: "/tempacc", icon: <MdOutlineSupervisorAccount /> },
];

const ProfileSideNavBar = () => {
    return (
        <aside className={styles.NavBar}>
            <div style={{ marginTop: "8%", width: "95%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "2em" }}>
                    {Links.map((link, index) => (
                        <li className={styles.li} key={index}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                                }
                            >
                                <span style={{ marginRight: "0.8em", fontSize: "1em" }}>{link.icon}</span>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ProfileSideNavBar;
