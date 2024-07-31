import { Outlet, Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import "../styles/NavBar.css"
import "../styles/fonts.css"

const NavBar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="logo">BrandTailors Co.</div>
                <div className="links-div">
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/">Shop</Link>
                    <Link className="link" to="/">About</Link>
                    <Link className="link" to="/">Blog</Link>
                    <Link className="link" to="/">Contact</Link>
                </div>
                <div className="login-div">
                    <div>
                        <FaRegUser />
                        <span style={{ position: "relative", top: "-2px", marginLeft: "5px" }}>Login / Register</span>
                    </div>
                    <div><IoSearch /></div>
                    <div><MdOutlineShoppingCart />1</div>
                </div>
            </nav >

            <Outlet />
        </>
    )
};

export default NavBar;