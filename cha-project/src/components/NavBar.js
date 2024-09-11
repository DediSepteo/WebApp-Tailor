import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser, FaBars } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
    const links = [
        { name: "Home", path: "/home" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/about" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ];

    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.name); // Ensure your token has a 'name' field
            } catch (error) {
                console.error('Invalid token:', error);
                // Optionally, handle invalid token by logging out the user
                handleLogout();
            }
        }
    }, []);

    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen);
    };

    const hideDropDown = () => {
        setDropDownOpen(false);
    };

    const openDropDown = () => {
        setDropDownOpen(true);
    };

    const disableScroll = (event) => {
        event.preventDefault();
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (sideNavOpen) {
            window.addEventListener('scroll', disableScroll, { passive: false });
        } else {
            window.removeEventListener('scroll', disableScroll);
        }

        return () => {
            window.removeEventListener('scroll', disableScroll);
        };
    }, [sideNavOpen]);

    // Logout Handler
    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Remove token from sessionStorage
        localStorage.removeItem('token')
        setUserName(null); // Clear userName state
        navigate('/Home'); // Redirect to Home page or Login page
    };

    return (
        <div style={{ margin: 0, padding: 0, width: "100%" }}>
            <div
                className={styles.darkenDiv}
                id="darkenDiv"
                style={{ opacity: sideNavOpen ? 1 : 0, width: sideNavOpen ? '100vw' : 0 }}
                onClick={toggleSideNav}
            ></div>
            {/* Side Nav Bar */}
            <div className={`${styles.sideNav} ${sideNavOpen ? styles.sideNavOpen : ""}`} id="sideNav">
                <div className={styles.sideNavHead}>
                    Menu
                    <FaArrowRightLong className={styles.sideNavToggle} id="sideNavToggle" onClick={toggleSideNav} />
                </div>
                <div className={styles.sideNavLinks}>
                    {links.map((link, index) => (
                        link.name === "Shop" ? (
                            <div className={styles.shopDiv} id="shopLink" onMouseLeave={hideDropDown} key={index}>
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
                                        <NavLink className={styles.link} style={{ fontSize: "0.9em" }} to="/shop/government" onClick={toggleSideNav}>Government</NavLink>
                                        <NavLink className={styles.shopLightLink} to="/shop/uniforms" onClick={toggleSideNav}>Uniforms</NavLink>
                                        <NavLink className={styles.shopLightLink} to="/shop/suits" onClick={toggleSideNav}>Suits</NavLink>
                                        <NavLink className={styles.shopLightLink} to="/shop/jeans" onClick={toggleSideNav}>Jeans</NavLink>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: "column", gap: "0.9em" }}>
                                        <NavLink className={styles.link} style={{ fontSize: "0.9em" }} to="/shop/corporate" onClick={toggleSideNav}>Corporate</NavLink>
                                        <NavLink className={styles.shopLightLink} to="/shop/uniforms" onClick={toggleSideNav}>Uniforms</NavLink>
                                        <NavLink className={styles.shopLightLink} to="/shop/suits" onClick={toggleSideNav}>Suits</NavLink>
                                        <NavLink className={styles.shopLightLink} to="/shop/jeans" onClick={toggleSideNav}>Jeans</NavLink>
                                    </div>
                                </div>
                            </div>
                        ) :
                            <NavLink
                                key={index}
                                to={link.path}
                                exact
                                className={({ isActive }) =>
                                    isActive ? `${styles.link}` : styles.link
                                }
                                onClick={toggleSideNav}
                            >
                                {link.name}
                            </NavLink>
                    ))}
                </div>
            </div >
            {/* Nav Bar */}
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
                    {userName ? (
                        <div className={styles.userContainer}>
                            <span className={styles.icons}><FaRegUser /></span>
                            <span className={styles.userName}>{userName}</span>
                            <button onClick={handleLogout} className={styles.logoutButton}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <NavLink className={styles.loginLink} to={"/Login"}>
                            <span className={styles.icons}><FaRegUser /></span>
                            <span className={styles.loginText}>Login / Register</span>
                        </NavLink>
                    )}
                    <span className={styles.icons}><IoSearch /></span>
                    <span className={styles.icons} id="cart"><MdOutlineShoppingCart /></span>
                    <FaBars className={`${styles.colNavbar} ${styles.icons}`} id="sideNavIcon" onClick={toggleSideNav} />
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
