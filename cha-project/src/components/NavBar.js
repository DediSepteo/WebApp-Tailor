import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import styles from "../styles/NavBar.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

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
        var dropDown = document.getElementById("dropDown")
        var downArrow = document.getElementById("downArrow")
        var upArrow = document.getElementById("upArrow")
        var shopMenu = document.getElementById("shopMenu")
        if (dropDown) {
            dropDown.onclick = () => {
                console.log(downArrow.style.display)
                if (downArrow.style.display === "inline") {
                    downArrow.style.display = "none"
                    upArrow.style.display = "inline"
                    shopMenu.style.display = "inline"
                }
                else {
                    downArrow.style.display = "inline"
                    upArrow.style.display = "none"
                    shopMenu.style.display = "none"
                }

            }
        }

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
                            <div>
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
                                    <div id="dropDown" className={styles.dropDown}>
                                        <RiArrowDropDownLine id="downArrow" style={{ display: "inline" }} size={35} />
                                        <RiArrowDropUpLine id="upArrow" style={{ display: "none" }} size={35} />
                                    </div>
                                </div>
                                <div className={styles.shopMenu} id="shopMenu">
                                    <NavLink className={styles.sideLink}>Government</NavLink>
                                    <NavLink className={styles.sideLink}>Corporate</NavLink>
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
            </div >
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
