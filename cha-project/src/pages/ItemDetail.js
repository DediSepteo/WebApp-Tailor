import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/ItemDetail.module.css';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

// Sample data array
const items = [
    {
        company: 'Suits1',
        uni_id: 1,
        name: 'Suit1',
        price: 299.99,
        colour: ['Red', 'Blue', 'Green'],
        detail: 'Perfectly tailored suit with a flat one piece collar. Fabric is 100% wool.',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
    },
    {
        company: 'Suits1',
        uni_id: 2,
        name: 'Suit2',
        price: 249.99,
        colour: ['Red', 'Blue', 'Green'],
        detail: 'Grey casual suit with a modern cut. Fabric is 70% wool, 30% polyester.',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
    },
    {
        company: 'Retail1',
        uni_id: 3,
        name: 'Retail1',
        price: 49.99,
        colour: ['Red', 'Blue', 'Green'],
        detail: 'White polo shirt with a classic fit. Fabric is 100% pique cotton.',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
    },
    {
        company: 'GreatConstructionsCo',
        uni_id: 4,
        name: 'FancyConstructionUniform',
        price: 99.99,
        colour: ['Red', 'Blue', 'Green'],
        detail: 'High visibility yellow uniform for construction work. Fabric is durable polyester. High visibility yellow uniform for construction work. Fabric is durable polyester. High visibility yellow uniform for construction work. Fabric is durable polyester.',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png'),
            require('../assets/Corporate.png'),
            require('../assets/restaurant.png'),
            require('../assets/homeBanner2.png')
        ],
    },
    {
        company: 'GreatConstructionsCo',
        uni_id: 5,
        name: 'SafeConstructionUniform',
        price: 99.99,
        colour: ['Red', 'Blue', 'Green'],
        detail: 'High visibility orange uniform for construction work. Fabric is durable polyester.',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
    },
];

export const ItemDetail = () => {
    const { company, name } = useParams();
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [sizeValid, setSizeValid] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isEditing, setIsEditing] = useState(false); // To track if in editing mode
    const [lastValidQuantity, setLastValidQuantity] = useState(1); // Track last valid quantity
    const intervalRef = useRef(null); // Reference for auto increment/decrement

    const item = items.find(item => item.company === company && item.name === name);

    useEffect(() => {
        if (item && item.colour.length > 0) {
            setSelectedColor(item.colour[0]); // Set default color to the first color in the list
        }
    }, [item]);

    useEffect(() => {
        if (addedToCart) {
            const timer = setTimeout(() => {
                setAddedToCart(false); // Hide the message after 3 seconds
            }, 3000);
            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [addedToCart]);

    const defaultImage = item.image[0];

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeValid(false);
            return;
        } else {
            setSizeValid(true);
            setAddedToCart(true);

            const newItem = {
                id: item.uni_id,
                color: selectedColor,
                size: selectedSize,
                quantity: quantity,
            };

            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            existingCart.push(newItem);
            localStorage.setItem('cart', JSON.stringify(existingCart));

            // Reset values after submit
            setSelectedColor(item.colour[0]);
            setSelectedSize('');
            setQuantity(1);

        }
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

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <main className={styles.main}>
            <div className={styles.backContainer}>
                <Link to={`/Shop1/${company}`}>
                    <IoIosArrowRoundBack className={styles.backArrow} />
                </Link>
                <Link to={`/Shop1/${company}`} className={styles.backLink}>Back</Link>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.imageContainer}>
                    <div className={styles.thumbnailContainer}>
                        {item.image.map((image, index) => (
                            <div
                                key={index}
                                className={styles.thumbnail}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image} alt={`Thumbnail ${index + 1}`} className={styles.thumbnailImage} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src={selectedImage || defaultImage} alt={item.name} className={styles.itemImage} />
                    </div>
                </div>
                <div className={styles.contents}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>${item.price}</p>
                    <div className={styles.separator}></div>
                    <form>
                        <div className={styles.colorSelector}>
                            Colour:
                            {item.colour.map((color, index) => (
                                <div
                                    key={index}
                                    className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {color}
                                </div>
                            ))}
                        </div>
                        <div className={styles.sizeContainer}>
                            <p>Size:</p>
                            {!sizeValid && <p style={{ color: 'rgb(173, 0, 0)' }}>Please select a size.</p>}
                        </div>
                        <div className={styles.selectWrapper}>
                            <select
                                className={styles.selectSize}
                                name="sizing"
                                id="sizing"
                                value={selectedSize}
                                onChange={(e) => {
                                    setSelectedSize(e.target.value);
                                    if (e.target.value) {
                                        setSizeValid(true);
                                    }
                                }}
                                required
                            >
                                <option value="" disabled>Please Select:</option>
                                <option value="Large">Large</option>
                                <option value="Medium">Medium</option>
                                <option value="Small">Small</option>
                            </select>
                        </div>
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
                        <p className={styles.itemDetail}>{item.detail}</p>
                    </form>
                </div>
            </div>
            <div className={`${styles.successState} ${addedToCart ? styles.show : ''}`}>
                <FaCheck className={styles.successIcon} /> Item added to cart.
            </div>
        </main>
    );
};