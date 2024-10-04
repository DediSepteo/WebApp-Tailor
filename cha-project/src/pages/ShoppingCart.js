import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ShoppingCart.module.css';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";

// Sample cartItems data
const cartItems = [
    {
        uni_id: 2,
        name: 'FancyConstructionUniform1',
        price: 299.99,
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
        quantity: 1,
    },
    {
        uni_id: 4,
        name: 'FancyConstructionUniform',
        price: 299.99,
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
        quantity: 1,
    },
    {
        uni_id: 5,
        name: 'SafeConstructionUniform',
        price: 999.99,
        detail: 'A suit, also called a lounge suit, business suit, dress suit, or formal suit is a set of clothes comprising a suit jacket and trousers of identical textiles.',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
        quantity: 1,
    },
];

export const ShoppingCart = () => {
    const [quantities, setQuantities] = useState(cartItems.map(item => item.quantity));
    const [editingIndex, setEditingIndex] = useState(null); // Track the current editing input
    const intervalRef = useRef(null); // Reference for interval
    const inputRef = useRef(null); // Reference to the current input element
    const [cart, setCart] = useState([]);

    // Load cart from localStorage (Assume it's an array of { id, size, color })
    const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter and map cart items by matching id (from localStorage) to uni_id (in cartItems)
    const filteredCartItems = cartItems
        .filter(item => localStorageCart.some(cartItem => cartItem.id === item.uni_id)) // Match id to uni_id
        .map(item => {
            const localCartItem = localStorageCart.find(cartItem => cartItem.id === item.uni_id); // Match by id
            return {
                ...item,
                size: localCartItem?.size || 'N/A',
                color: localCartItem?.color || 'N/A',
            };
        });

    useEffect(() => {
        setCart(filteredCartItems);
    }, []);

    // Function to calculate subtotal
    const calculateSubtotal = () => {
        return cart.reduce((total, item, index) => {
            return total + item.price * quantities[index];
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const deliveryCharge = 0; // Set to 0 for the time being
    const grandTotal = subtotal + deliveryCharge;

    // Handle item removal
    const handleRemoveItem = (index) => {
        const itemToRemove = cart[index];

        // Remove item from localStorage cart
        const updatedLocalStorageCart = localStorageCart.filter(cartItem => cartItem.id !== itemToRemove.uni_id);
        localStorage.setItem('cart', JSON.stringify(updatedLocalStorageCart));

        // Update state: remove item from cart and adjust quantities
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
        setQuantities(prevQuantities => prevQuantities.filter((_, i) => i !== index));
    };

    // Function to handle quantity increase (max 50)
    const increaseQuantity = (index) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            if (newQuantities[index] < 50) {
                newQuantities[index] += 1;
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
                newQuantities[index] = cartItems[index].quantity; // Revert to the original quantity if invalid
            } else {
                // Update cartItems with the new valid value (if needed)
                cartItems[index].quantity = Number(currentValue);
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

    return (
        <main>
            <nav className={styles.navbar}>
                <Link to="/Home" className={styles.logo}>
                    BrandTailors Co.
                </Link>
                <p className={styles.separator}>|</p>
                <p className={styles.navPage}>Shopping Cart</p>
            </nav>
            <div className={styles.main}>
                <div className={styles.backContainer}>
                    <Link to="/Home">
                        <IoIosArrowRoundBack className={styles.backArrow} />
                    </Link>
                    <Link to="/Home" className={styles.backLink}>Continue Shopping</Link>
                </div>
                <p className={styles.pageTitle}>My Cart</p>
                <div style={{ paddingBottom: '2em' }}>
                    <table className={styles.tableTop}>
                        <thead>
                            <tr>
                                <th className={styles.productCol}>Product</th>
                                <th className={styles.regCol}>Unit Price</th>
                                <th className={styles.regCol}>Quantity</th>
                                <th className={styles.regCol}>Total Price</th>
                            </tr>
                        </thead>
                    </table>
                    <table className={styles.tableContent}>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td className={styles.productRow}>
                                        <img src={item.image[0]} alt={item.name} className={styles.productImage} />
                                        <div style={{ marginLeft: '10px' }}>
                                            <p className={styles.productName}>{item.name}</p>
                                            <p className={styles.productDetails}>{item.detail}</p>
                                            <div style={{ marginTop: '5px' }}>
                                                <p className={styles.productDetails}>Size: {item.size}</p>
                                                <p className={styles.productDetails}>Colour: {item.color}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.regRow}>{`$${item.price.toFixed(2)}`}</td>
                                    <td className={styles.regRow}>
                                        <div className={styles.quantityContainer}>
                                            <div className={styles.quantityBox}
                                                onMouseDown={() => startDecreasing(index)}
                                                onMouseUp={stopChanging}
                                                onMouseLeave={stopChanging}>
                                                <button className={styles.quantityButton} onClick={() => decreaseQuantity(index)}>-</button>
                                            </div>
                                            {editingIndex === index ? (
                                                <input
                                                    ref={inputRef} // Set the input ref
                                                    className={styles.quantityInput}
                                                    type="number"
                                                    value={quantities[index]}
                                                    min="1"
                                                    max="50"
                                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                                    onBlur={() => handleSaveQuantity(index)} // Handle blur to revert value
                                                    onKeyPress={(e) => handleKeyPress(e, index)} // Handle Enter key to save
                                                />
                                            ) : (
                                                <div className={styles.quantityRectangle} onClick={() => setEditingIndex(index)}>
                                                    <span>{quantities[index]}</span>
                                                </div>
                                            )}
                                            <div className={styles.quantityBox}
                                                onMouseDown={() => startIncreasing(index)}
                                                onMouseUp={stopChanging}
                                                onMouseLeave={stopChanging}>
                                                <button className={styles.quantityButton} onClick={() => increaseQuantity(index)}>+</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.regRow}>
                                        {`$${(item.price * quantities[index]).toFixed(2)}`}
                                    </td>
                                    <td className={styles.iconWrapper}>
                                        <IoClose className={styles.closeIcon} onClick={() => handleRemoveItem(index)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.checkoutContainer}>
                    <table className={styles.totalSum}>
                        <tr>
                            <td>Subtotal:</td>
                            <td>{`$${subtotal.toFixed(2)}`}</td>
                        </tr>
                        <tr>
                            <td>Delivery:</td>
                            <td>{`$${deliveryCharge.toFixed(2)}`}</td>
                        </tr>
                        <tr>
                            <td>Grand Total:</td>
                            <td>{`$${grandTotal.toFixed(2)}`}</td>
                        </tr>
                    </table>
                    <button className={styles.checkoutBtn}>Checkout</button>
                </div>
            </div>
        </main>
    );
};
