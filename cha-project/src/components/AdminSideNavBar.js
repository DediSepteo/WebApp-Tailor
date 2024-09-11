import React from 'react';
import styles from "../styles/AdminSideNavBar.module.css";
import { NavLink } from 'react-router-dom';


const corpLinks = [
    { name: "Manage Organizations", path: "/admin/corporate/orgs" },
    { name: "Manage Products", path: "/admin/corporate/products" },
    { name: "Manage Orders", path: "/admin/corporate/3" },
];

const govLinks = [
    { name: "Manage Organizations", path: "/admin/government/orgs" },
    { name: "Manage Products", path: "/admin/government/products" },
    { name: "Manage Orders", path: "/admin/government/3" }
]

const AdminSideNavBar = () => {
    return (
        <aside className={styles.NavBar}>
            <span className={styles.logo}>BrandTailors Co.</span>
            <div style={{ marginTop: "10%", width: "90%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "2em" }}>
                    <li className={styles.li}>
                        <NavLink className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link} to={"/admin/dashboard"}>
                            Dashboard
                        </NavLink>
                    </li>
                    <div className={styles.heading}>Corporate</div>
                    {corpLinks.map((link, index) => (
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
                    {govLinks.map((link, index) => (
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
