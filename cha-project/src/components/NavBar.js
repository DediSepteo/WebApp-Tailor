import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
    const links = [
        { name: "Home", path: "/home" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/" },
        { name: "Blog", path: "/" },
        { name: "Contact", path: "/" },
    ];
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.logo}>BrandTailors Co.</div>
                <div className={styles.linksDiv}>
                    {links.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            exact
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
                <div className={styles.loginDiv}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span className={styles.icons}><FaRegUser /></span>
                        <span className={styles.loginText}>Login / Register</span>
                    </div>
                    <span className={styles.icons}><IoSearch /></span>
                    <span className={styles.icons}><MdOutlineShoppingCart /></span>
                    {/* <span style={{ fontSize: '0.9em' }}></span> */}
                    <div className={`${styles.colNavbar} ${styles.icons}`}>
                        <FaBars />
                    </div>
                </div>
            </nav >
        </>
    );
};

export default NavBar;
