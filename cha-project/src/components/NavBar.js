import { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser, FaBars } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import { jwtDecode } from "jwt-decode";
import { CartContext } from "./CartContext";
import styles from "../styles/NavBar.module.css";

// Sample cartItems data


const NavBar = () => {
    const links = [
        { name: "Home", path: "/Home" },
        { name: "Shop", path: "/Shop1" },
        { name: "About", path: "/About" },
        { name: "Contact", path: "/Contact" },
    ];

    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [sideCartOpen, setSideCartOpen] = useState(false); // State for the side cart
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [userName, setUserName] = useState(null);
    const [isTempAccount, setIsTempAccount] = useState(false)
    const navigate = useNavigate(); // Initialize navigate

    // Side cart states
    // Load cart from localStorage (Assume it's an array of { id, size, color, quantity })
    const localStorageCart = JSON.parse(localStorage.getItem('cart') || "[]");

    // Side cart states
    const [lastValidQuantities, setLastValidQuantities] = useState(localStorageCart.map(item => item.quantity));
    const [editingIndex, setEditingIndex] = useState(null); // Track the current editing input
    const intervalRef = useRef(null); // Reference for interval
    const inputRef = useRef(null); // Reference to the current input element
    const { setUpdatedCart, quantities, setQuantities } = useContext(CartContext);
    const cart = useContext(CartContext).updatedCart
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        console.log("cart", cart)
        setLastValidQuantities(quantities); // Update last valid quantities
    }, []);


    // Function to calculate subtotal
    const calculateSubtotal = () => {
        return cart.reduce((total, item, index) => {
            return total + item.price * quantities[index];
        }, 0);
    };

    const subtotal = calculateSubtotal();

    // Update localStorage when quantities change
    const updateLocalStorageCart = (updatedQuantities) => {
        const currentLocalStorageCart = JSON.parse(localStorage.getItem('cart') || "[]");
        const updatedCart = currentLocalStorageCart.map((cartItem, index) => {
            if (updatedQuantities[index] !== undefined) {
                return { ...cartItem, quantity: updatedQuantities[index] };
            }
            return cartItem;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    const handleRemoveItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setUpdatedCart(updatedCart);
        // Transform `updatedCart` back to the original structure for localStorage
        const updatedLocalStorageCart = updatedCart.map(item => ({
            id: item.product_id || item.id,
            quantity: item.quantity,
            image: item.image
        }));
        console.log(localStorage.getItem('cart'), "sjkadjka")
        localStorage.setItem('cart', JSON.stringify(updatedLocalStorageCart));
    };

    // to make it persist 
    useEffect(() => {
        updateLocalStorageCart(quantities);
    }, [quantities]);

    // Function to handle quantity increase (max 50)
    const increaseQuantity = (index) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            if (newQuantities[index] < 50) {
                newQuantities[index] += 1;
                updateLocalStorageCart(newQuantities);
            }
            return newQuantities;
        });
    };

    // Function to handle quantity decrease (min 1)
    const decreaseQuantity = (index) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            if (newQuantities[index] > 1) {
                newQuantities[index] -= 1;
                updateLocalStorageCart(newQuantities);
            }
            return newQuantities;
        });
    };

    // Function to start auto incrementing quantity
    const startIncreasing = (index) => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => increaseQuantity(index), 200);
    };

    // Function to start auto decrementing quantity
    const startDecreasing = (index) => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => decreaseQuantity(index), 200);
    };

    // Function to stop auto incrementing/decrementing quantity
    const stopChanging = () => {
        clearInterval(intervalRef.current);
    };

    // Clear interval when the component unmounts
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    // Handle input change, enforce limits during typing
    const handleInputChange = (index, value) => {
        // Allow user to clear input but restrict value from exceeding max of 50
        if (value === '' || (!isNaN(value) && value <= 50)) {
            setQuantities(prevQuantities => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] = value === '' ? '' : parseInt(value, 10); // Allow temporary empty string or a valid number
                updateLocalStorageCart(newQuantities);
                return newQuantities;
            });
        }
    };

    // Handle input blur or Enter key press to save, ensuring non-blank values
    const handleSaveQuantity = (index) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            const currentValue = newQuantities[index];

            // Ensure the value is valid, revert to original if invalid or blank
            if (currentValue === '' || isNaN(currentValue) || currentValue < 1 || currentValue > 50) {
                newQuantities[index] = lastValidQuantities[index]; // Revert to the original quantity if invalid
            } else {
                // Update cartItems with the new valid value (if needed)
                setLastValidQuantities(newQuantities);
            }

            return newQuantities;
        });

        setEditingIndex(null); // Close the input after saving
    };

    // Handle key press (Enter key to save)
    const handleKeyPress = (e, index) => {
        if (e.key === 'Enter') {
            handleSaveQuantity(index);
        }
    };

    // Detect clicks outside of the input
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                if (editingIndex !== null) {
                    handleSaveQuantity(editingIndex); // Save quantity if clicked outside
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingIndex]);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const source = decodedToken.source
                if (source == "temporary") {
                    setIsTempAccount(true)
                }
                setUserName(decodedToken.org_name); // Ensure your token has a 'name' field
            } catch (error) {
                console.error('Invalid token:', error);
                handleLogout();
            }
        }
    }, []);

    const toggleSideNav = () => {
        setSideNavOpen(!sideNavOpen);
        if (sideCartOpen) {
            setSideCartOpen(false); // Close side cart when side nav opens
        }
    };

    const toggleSideCart = () => {
        setSideCartOpen(!sideCartOpen);
        if (sideNavOpen) {
            setSideNavOpen(false); // Close side nav when side cart opens
        }
    };

    const disableScroll = (event) => {
        event.preventDefault();
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (sideNavOpen || sideCartOpen) {
            window.addEventListener('scroll', disableScroll, { passive: false });
        } else {
            window.removeEventListener('scroll', disableScroll);
        }

        return () => {
            window.removeEventListener('scroll', disableScroll);
        };
    }, [sideNavOpen, sideCartOpen]);

    // Logout Handler
    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setUserName(null);
        navigate('/Home');
    };

    return (
        <div style={{ margin: 0, padding: 0, width: "100%" }}>
            {/* Darken Div for Side Nav and Side Cart */}
            <div
                className={styles.darkenDiv}
                style={{ opacity: sideNavOpen || sideCartOpen ? 1 : 0, width: sideNavOpen || sideCartOpen ? '100vw' : 0 }}
                onClick={() => {
                    setSideNavOpen(false);
                    setSideCartOpen(false);
                }}
            ></div>

            {/* Side Nav Bar */}
            <div className={`${styles.sideNav} ${sideNavOpen ? styles.sideNavOpen : ""}`} id="sideNav">
                <div className={styles.sideNavHead}>
                    Menu
                    <FaArrowRightLong className={styles.sideNavToggle} id="sideNavToggle" onClick={toggleSideNav} />
                </div>
                <div className={styles.sideNavLinks}>
                    {links.map((link, index) => (
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
            </div>

            <div className={`${styles.sideCart} ${sideCartOpen ? styles.sideCartOpen : ""}`} id="sideCart">
                <div className={styles.sideCartHead}>
                    <IoClose className={styles.cartIcons} onClick={toggleSideCart} />
                    Shopping Cart
                    <Link to="/shoppingcart" className={styles.cartIcons}>
                        <PiArrowBendUpRightBold />
                    </Link>
                </div>

                <div className={styles.contentWrapper}>
                    <table className={styles.tableContent}>
                        <tbody>
                            {cart.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr key={index}>
                                        <td className={styles.productRow}>
                                            <img
                                                src={item.image}// Replace with item.image_url if available
                                                alt={item.name}
                                                className={styles.productImage}
                                            />
                                            <div style={{ marginLeft: '5px' }} className={styles.productDetailsWrapper}>
                                                <p className={styles.productName}>{item.name}</p>
                                                <p className={styles.productDetails}>{item.description}</p>
                                                <p className={styles.productPrice}>₱{item.price.toFixed(2)}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.quantityContainer}>
                                                <div className={styles.quantityBox}>
                                                    <button
                                                        className={styles.quantityButton}
                                                        onClick={() => decreaseQuantity(index)}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                                <div className={styles.quantityRectangle}>
                                                    <span>{quantities[index]}</span>
                                                </div>
                                                <div className={styles.quantityBox}>
                                                    <button
                                                        className={styles.quantityButton}
                                                        onClick={() => increaseQuantity(index)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.iconWrapper}>
                                            <IoClose
                                                className={styles.closeIcon}
                                                onClick={() => handleRemoveItem(index)}
                                            />
                                        </td>
                                    </tr>)

                            })}
                        </tbody>
                    </table>
                </div>

                <div className={styles.checkoutContainer}>
                    <table className={styles.totalSum}>
                        <tr>
                            <td style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>Subtotal:</td>
                            <td style={{ fontWeight: 'bold' }}>{`$${subtotal.toFixed(2)}`}</td>
                        </tr>
                    </table>
                    <Link to='../shoppingcart'>
                        <button className={styles.checkoutBtn}>Checkout</button>
                    </Link>
                </div>
            </div>

            {/* Nav Bar */}
            <nav className={styles.navbar}>
                <Link to="/Home" className={styles.logo}>BrandTailors Co.</Link>
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
                            {isTempAccount ? (
                                <div className={styles.icons} style={{ cursor: "default" }}>
                                    <FaRegUser />
                                </div>
                            ) : (
                                <NavLink className={styles.icons} to="/profile">
                                    <FaRegUser />
                                </NavLink>
                            )}

                            <Link to="/profile" className={styles.userName}>{userName}</Link>

                            <button onClick={handleLogout} className={styles.logoutButton}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <NavLink className={styles.loginLink} to={"/login"}>
                            <span className={styles.icons}><FaRegUser /></span>
                            <span className={styles.loginText}>Login / Register</span>
                        </NavLink>
                    )}
                    {token && (
                        <span className={styles.icons} onClick={toggleSideCart} id="cart"><MdOutlineShoppingCart /></span>
                    )}
                    <FaBars className={`${styles.colNavbar} ${styles.icons}`} id="sideNavIcon" onClick={toggleSideNav} />
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
