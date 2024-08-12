import { Outlet, Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css"
import "../styles/fonts.css"

const NavBar = () => {

    const links = [
        { name: "Home", path: "/home" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/" },
        { name: "Blog", path: "/" },
        { name: "Contact", path: "/" },
    ]
    return (
        <>
            <nav className="navbar">
                <div className="logo">BrandTailors Co.</div>
                <div className="links-div">
                    {links.map((link, index) => (
                        <NavLink key={index} to={link.path} exact className="link">
                            {link.name}
                        </NavLink>
                    ))}
                </div>
                <div className="login-div">
                    <div className="icons">
                        <FaRegUser />
                        <span className="login-text">Login / Register</span>
                    </div>
                    <div className="icons"><IoSearch /></div>
                    <div className="icons"><MdOutlineShoppingCart /><span style={{ fontSize: '0.9em' }}>1</span></div>
                    <div className="col-navbar icons"><FaBars /></div>
                </div>
            </nav >

            <Outlet />
        </>
    )
};

export default NavBar;