import React from 'react';
import styles from "../styles/AdminSideNavBar.module.css";
import { NavLink } from 'react-router-dom';


const links = [
    { name: "Manage Store", path: "/meow/1" },
    { name: "Manage Users", path: "/meow/2" },
    { name: "Manage Orders", path: "/meow/3" },
];

const AdminSideNavBar = () => {
    return (
        <aside className={styles.NavBar}>
            <span className={styles.logo}>BrandTailors Co.</span>
            <div style={{ marginTop: "10%", width: "90%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "2em" }}>
                    <li className={styles.li}><NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}>
                        Dashboard
                    </NavLink></li>
                    <div className={styles.heading}>Corporate</div>
                    {links.map((link, index) => (
                        <li className={styles.li} key={index}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                    <div className={styles.heading}>Government</div>
                    {links.map((link, index) => (
                        <li className={styles.li} key={index}>
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </div>
            </div>
        </aside >
    );
};

export default AdminSideNavBar;
