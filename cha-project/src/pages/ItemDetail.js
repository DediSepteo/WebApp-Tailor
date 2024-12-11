import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import styles from '../styles/ItemDetail.module.css';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { CartContext } from '../components/CartContext';


export const ItemDetail = () => {
    const location = useLocation();
    const { setCart } = useContext(CartContext)
    const item = location.state?.data; // Ensure you use optional chaining or check if state exists
    const [selectedImage, setSelectedImage] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isEditing, setIsEditing] = useState(false); // To track if in editing mode
    const [lastValidQuantity, setLastValidQuantity] = useState(1); // Track last valid quantity
    const intervalRef = useRef(null); // Reference for auto increment/decrement

    useEffect(() => {
        if (addedToCart) {
            const timer = setTimeout(() => {
                setAddedToCart(false); // Hide the message after 3 seconds
            }, 3000);
            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [addedToCart]);

    const defaultImage = "https://placehold.co/430x640"

    const handleAddToCart = () => {
        setAddedToCart(true);

        const existingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        const newItem = {
            id: item.product_id,
            // Ensure that quantity is a number, if user types value, data will be string
            quantity: parseInt(quantity),
        };

        // Check if item already exists in the cart
        const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === newItem.id);

        if (existingItemIndex >= 0) {
            // If item exists, update its quantity
            existingCart[existingItemIndex].quantity += newItem.quantity;
        } else {
            // Otherwise, add the new item
            existingCart.push(newItem);
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        setCart(existingCart)

        // Reset values after submit
        setQuantity(1);
        console.log('Cart after adding item:', JSON.parse(localStorage.getItem('cart'))); // For checking
    };

    // Handle quantity increase
    const increaseQuantity = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 50));
        setLastValidQuantity(Math.min(quantity + 1, 50)); // Update last valid quantity
    };

    // Handle quantity decrease
    const decreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
        setLastValidQuantity(Math.max(quantity - 1, 1)); // Update last valid quantity
    };

    // Start auto-increment/decrement
    const startAutoChange = (isIncrease) => {
        const changeQuantity = () => {
            if (isIncrease) {
                increaseQuantity();
            } else {
                decreaseQuantity();
            }
        };
        changeQuantity();
        intervalRef.current = setInterval(changeQuantity, 200); // Change every 200ms
    };

    // Stop auto-increment/decrement
    const stopAutoChange = () => {
        clearInterval(intervalRef.current);
    };

    // Handle quantity input change with validation
    const handleInputChange = (e) => {
        const value = e.target.value;

        // Allow temporary invalid inputs (like empty string or 'e'), but don't save them as valid
        if (value === '' || (!isNaN(value) && value <= 50 && value >= 1)) {
            setQuantity(value); // Temporarily set the value to the input
        }

        // If the input is a valid number, update the last valid quantity
        if (!isNaN(value) && value >= 1 && value <= 50) {
            setLastValidQuantity(parseInt(value, 10));
        }
    };

    const handleClickQuantity = () => {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
    };

    const handleBlur = () => {
        // On blur, if the value is invalid, revert to the last valid quantity
        if (isNaN(quantity) || quantity < 1 || quantity > 50) {
            setQuantity(lastValidQuantity); // Restore last valid quantity
        } else {
            setLastValidQuantity(quantity); // If valid, update last valid quantity
        }
        setIsEditing(false); // Exit editing mode
    };

    // if (!item) {
    //     return <div>Item not found</div>;
    // }
    console.log(item)
    return (
        <main className={styles.main}>
            <div className={styles.backContainer}>
                <Link to={`/Shop1/`}>
                    <IoIosArrowRoundBack className={styles.backArrow} />
                </Link>
                <Link to={`/Shop1/`} className={styles.backLink}>Back</Link>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.imageContainer}>
                    <div className={styles.thumbnailContainer}>
                        {/* {item.image.map((image, index) => (
                            <div
                                key={index}
                                className={styles.thumbnail}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image} alt={`Thumbnail ${index + 1}`} className={styles.thumbnailImage} />
                            </div>
                        ))} */}
                        <div
                            // key={index}
                            className={styles.thumbnail}
                            onClick={() => setSelectedImage(1)}
                        >
                            <img src={"https://placehold.co/430x640"} alt={`Thumbnail ${1}`} className={styles.thumbnailImage} />
                        </div>
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src={selectedImage || defaultImage} alt={item.name} className={styles.itemImage} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>₱{item.price}</p>
                    <div className={styles.separator}></div>
                    <form>
                        <div className={styles.quantityContainer}>
                            <p className={styles.quantityTitle}>Quantity:</p>
                            <div className={styles.quantityBox}>
                                <button
                                    type="button"
                                    className={styles.quantityButton}
                                    onMouseDown={() => startAutoChange(false)}
                                    onMouseUp={stopAutoChange}
                                    onMouseLeave={stopAutoChange}
                                >
                                    -
                                </button>
                            </div>
                            {isEditing ? (
                                <input
                                    className={styles.quantityInput}
                                    type="number"
                                    value={quantity}
                                    min="1"
                                    max="50"
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    autoFocus
                                />
                            ) : (
                                <div
                                    className={styles.quantityRectangle}
                                    onClick={handleClickQuantity}
                                >
                                    {quantity}
                                </div>
                            )}
                            <div className={styles.quantityBox}>
                                <button
                                    type="button"
                                    className={styles.quantityButton}
                                    onMouseDown={() => startAutoChange(true)}
                                    onMouseUp={stopAutoChange}
                                    onMouseLeave={stopAutoChange}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button className={styles.addItem} type="button" onClick={handleAddToCart}>Add To Cart</button>
                        <p className={styles.descriptionLabel}>Description:</p>
                        <p className={styles.itemDetail}>{item.description}</p>
                    </form>
                </div>
            </div>
            <div className={`${styles.successState} ${addedToCart ? styles.show : ''}`}>
                <FaCheck className={styles.successIcon} /> Item added to cart.
            </div>
        </main>
    );
};