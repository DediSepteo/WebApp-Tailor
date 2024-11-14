import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/ShoppingCart.module.css';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';


export const ShoppingCart = () => {
    const navigate = useNavigate();
    const localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [quantities, setQuantities] = useState(localStorageCart.map(item => item.quantity));
    const [lastValidQuantities, setLastValidQuantities] = useState(localStorageCart.map(item => item.quantity));
    const [editingIndex, setEditingIndex] = useState(null); // Track the current editing input
    const intervalRef = useRef(null); // Reference for interval
    const inputRef = useRef(null); // Reference to the current input element
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const localStorageCart = JSON.parse(localStorage.getItem('cart') || "[]");
        console.log(localStorageCart, 'cart token');

        // Get all item IDs and quantities from localStorageCart
        const itemIds = localStorageCart.map(item => item.id);
        const initialQuantities = localStorageCart.map(item => item.quantity || 1);
        console.log(itemIds, 'this is the itemid')

        if (itemIds.length > 0) {
            // Map over each item ID to create a fetch request for each item
            const fetchPromises = itemIds.map(id =>
                fetch(`http://localhost:3000/api/product/${id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch product with id ${id}`);
                        }
                        return response.json();
                    })
            );
            // Wait for all fetch requests to complete
            Promise.all(fetchPromises)
                .then(products => {
                    const updatedProducts = products.map((product) => {
                        console.log(product[0], "A ")
                        return product[0]
                    })
                    setCart(updatedProducts); // Set the cart with all fetched products
                    console.log(products, 'cart data');
                })
                .catch(error => {
                    console.error("Error fetching product data:", error);
                });
        } else {
            console.log("No items in cart.");
            setCart([]); // Clear cart data if no items are present
        }

        console.log("Cart details:");
        console.log("Cart ids:", itemIds);
        console.log("Cart quantities:", initialQuantities);

        setQuantities(initialQuantities);
        setLastValidQuantities(initialQuantities); // Initialize last valid quantities
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

    const handleCheckout = () => {

        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const org_id = decodedToken.org_id;

            const orderData = cart.map((item, index) => ({
                id: item.id,
                quantity: quantities[index]
            }));

            const totalQuantity = orderData.reduce((sum, item) => sum + item.quantity, 0);

            const newOrder = {
                org_id: org_id,
                qty: totalQuantity, // Total quantity extracted from orderData
                subtotal: calculateSubtotal(),
                status: "Awaiting Measurement",
                date: new Date().toISOString().slice(0, 10) // Current date in YYYY-MM-DD format
            };

            fetch('http://localhost:3000/api/order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to create order');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Order created with ID:', data.orderId);
                    localStorage.removeItem('cart');
                    setCart([]);
                    console.log(newOrder, "aaaa")
                    alert('Order successfully created!');
                })
                .catch((error) => {
                    console.error('Error during checkout:', error);
                    console.log(newOrder, "bbbbb")
                    alert('There was a problem creating your order.');
                });
        } else {
            console.error("No token found. Please log in.");
            alert("Please log in to proceed with checkout.");
        }
    };

    const testToCheckoutPage = () => {
        if (!cart.length)
            alert("Cart is empty")
        else {
            console.log(cart)
            fetch("http://localhost:3000/api/payment/checkoutSes", {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Basic c2tfdGVzdF9oUXRTSnhEWVFjZjF4SzRhekF6amdKOXc6`
                },
                body: {
                    cart: cart
                }
            })
                .then(response => response.json())
                .then(data => console.log(data))
        }
    }


    // Update localStorage when quantities change
    const updateLocalStorageCart = (updatedQuantities) => {
        const currentLocalStorageCart = JSON.parse(localStorage.getItem('cart') || "[]");
        const updatedCart = currentLocalStorageCart.map((cartItem, index) => {
            const matchedItem = cart.find(item => item.id === cartItem.id);
            if (matchedItem) {
                return { ...cartItem, quantity: updatedQuantities[index] };
            }
            return cartItem;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Handle item removal
    const handleRemoveItem = (index) => {
        // Get the item to remove
        const itemToRemove = cart[0]; // Access the product object within the nested array

        // Update the cart in localStorage
        const updatedLocalStorageCart = localStorageCart.filter(cartItem => cartItem[0]);
        localStorage.setItem('cart', JSON.stringify(updatedLocalStorageCart));

        // Update the cart state: remove the item from the nested structure
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
        setQuantities(prevQuantities => prevQuantities.filter((_, i) => i !== index));
    };


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
                                        <img src="https://placehold.co/430x640" alt={item.name} className={styles.productImage} />
                                        <div style={{ marginLeft: '10px' }}>
                                            <p className={styles.productName}>{item.name}</p>
                                            <p className={styles.productDetails}>{item.detail}</p>
                                            <div style={{ marginTop: '5px' }}>
                                                <p className={styles.productDetails}>Description: {item.description}</p>
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
                    <button className={styles.checkoutBtn} onClick={handleCheckout}>Checkout</button>
                    <button className={styles.checkoutBtn} onClick={testToCheckoutPage}>To Payment (Paymongo)</button>
                </div>
            </div>
        </main>
    );
};
