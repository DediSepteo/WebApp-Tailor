import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import styles from "../styles/NavBar.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";

const NavBar = () => {
    const links = [
        { name: "Home", path: "/home" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/" },
        { name: "Blog", path: "/" },
        { name: "Contact", path: "/" },
    ];


    useEffect(() => {
        var cart = document.getElementById("cart")

        if (cart) {
            cart.onclick = function () {
                const darkenRect = document.createElement("div")
                darkenRect.style.position = "absolute"
                darkenRect.style.width = "100%"
                darkenRect.style.height = "100vw"
            }
        }

    }, [])

    return (
        <>
            <div className={styles.darkenDiv}></div>
            <div className={styles.sideNav}>
                <div className={styles.sideNavHead}>Menu<FaArrowRightLong /></div>
                <div className={styles.sideNavLinks}>
                    {links.map((link, index) => (
                        link.name === "Shop" ? (
                            <div className={styles.sideShopDiv}>
                                <NavLink
                                    key={index}
                                    to={link.path}
                                    exact
                                    className={({ isActive }) =>
                                        isActive ? `${styles.sideLink} ${styles.linkActive}` : styles.sideLink
                                    }
                                >
                                    {link.name}
                                </NavLink>
                                <div>
                                    <RiArrowDropDownLine />
                                </div>
                            </div>
                        ) :
                            <NavLink
                                key={index}
                                to={link.path}
                                exact
                                className={({ isActive }) =>
                                    isActive ? `${styles.sideLink} ${styles.linkActive}` : styles.sideLink
                                }
                            >
                                {link.name}
                            </NavLink>
                    ))}
                </div>
            </div>
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
                <div className={styles.sideDiv}>
                    <NavLink className={styles.loginLink} to={"/login"}>
                        <span className={styles.icons}><FaRegUser /></span>
                        <span className={styles.loginText}>Login / Register</span>
                    </NavLink>
                    <span className={styles.icons}><IoSearch /></span>
                    <span className={styles.icons} id="cart"><MdOutlineShoppingCart /></span>
                    <div className={`${styles.colNavbar} ${styles.icons}`}>
                        <FaBars />
                    </div>
                </div>
            </nav >
        </>
    );
};




export default NavBar;
