import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser, FaBars } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
    const links = [
        { name: "Home", path: "/home" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/" },
        { name: "Blog", path: "/" },
        { name: "Contact", path: "/" },
    ];

    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen);
        document.body.style.overflowY = sideNavOpen ? "auto" : "hidden";
    };

    const hideDropDown = () => {
        setDropDownOpen(false)
    }

    const openDropDown = () => {
        setDropDownOpen(true)
    }



    return (
        <div>
            <div
                className={styles.darkenDiv}
                id="darkenDiv"
                style={{ opacity: sideNavOpen ? 1 : 0, width: sideNavOpen ? '100vw' : 0 }}
                onClick={toggleSideNav}
            ></div>
            <div className={styles.sideNav} id="sideNav" style={{ width: sideNavOpen ? "35%" : 0, opacity: sideNavOpen ? 1 : 0 }}>
                <div className={styles.sideNavHead}>
                    Menu
                    <FaArrowRightLong className={styles.sideNavToggle} id="sideNavToggle" onClick={toggleSideNav} />
                </div>
                <div className={styles.sideNavLinks}>
                    {links.map((link, index) => (
                        link.name === "Shop" ? (
                            <div className={styles.shopDiv} id="shopLink" onMouseLeave={hideDropDown}>
                                <div className={styles.shopLink}>
                                    <span className={styles.link}>Shop</span>
                                    <div className={styles.dropDown} id="dropDown" onMouseEnter={openDropDown}>
                                        {dropDownOpen ?
                                            <RiArrowDropUpLine id="upArrow" size={35} /> :
                                            <RiArrowDropDownLine id="downArrow" size={35} />
                                        }
                                    </div>
                                </div>
                                <div className={`${styles.shopMenu} ${styles.dropDown}`} id="shopMenu"
                                    style={{
                                        opacity: dropDownOpen ? 1 : 0,
                                        marginTop: dropDownOpen ? "1em" : 0,
                                        padding: dropDownOpen ? "1em 0" : 0,
                                        height: dropDownOpen ? "auto" : 0
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: "column", gap: "0.9em" }}>
                                        <NavLink className={styles.link} style={{ fontSize: "0.9em" }}>Government</NavLink>
                                        <NavLink className={styles.shopLightLink}>Uniforms</NavLink>
                                        <NavLink className={styles.shopLightLink}>Suits</NavLink>
                                        <NavLink className={styles.shopLightLink}>Jeans</NavLink>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: "column", gap: "0.9em" }}>
                                        <NavLink className={styles.link} style={{ fontSize: "0.9em" }}>Corporate</NavLink>
                                        <NavLink className={styles.shopLightLink}>Uniforms</NavLink>
                                        <NavLink className={styles.shopLightLink}>Suits</NavLink>
                                        <NavLink className={styles.shopLightLink}>Jeans</NavLink>
                                    </div>
                                </div>
                            </div>
                        ) :
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
                    <NavLink className={styles.loginLink} to={"/Login"}>
                        <span className={styles.icons}><FaRegUser /></span>
                        <span className={styles.loginText}>Login / Register</span>
                    </NavLink>
                    <span className={styles.icons}><IoSearch /></span>
                    <span className={styles.icons} id="cart"><MdOutlineShoppingCart /></span>
                    <FaBars className={`${styles.colNavbar} ${styles.icons}`} id="sideNavIcon" onClick={toggleSideNav} />
                </div>
            </nav >
            <div className={styles.btmPad}></div>
        </div>
    );
};

export default NavBar;
