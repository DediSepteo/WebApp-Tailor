// src/pages/ItemDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/ItemDetail.module.css';
import { IoIosArrowRoundBack } from "react-icons/io";

// Sample data array
const items = [
    {
        company: 'Suits1',
        name: 'Suit1',
        price: '$299.99',
        colour: ['Red', 'Blue', 'Green'],
        detail: 'Perfectly tailored suit with a flat one piece collar. Fabric is 100% wool.',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
    },
    {
        company: 'Suits1',
        name: 'Suit2',
        price: '$249.99',
        colour: ['Red', 'Blue', 'Green'],
        detail: 'Grey casual suit with a modern cut. Fabric is 70% wool, 30% polyester.',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
    },
    {
        company: 'Retail1',
        name: 'Retail1',
        price: '$49.99',
        colour: ['Red', 'Blue', 'Green'],
        detail: 'White polo shirt with a classic fit. Fabric is 100% pique cotton.',
        image: [
            require('../assets/security.png'),
            require('../assets/restaurant.png')
        ],
    },
    {
        company: 'GreatConstructionsCo',
        name: 'FancyConstructionUniform',
        price: '$99.99',
        colour: ['Red', 'Blue', 'Green'],
        detail: 'High visibility yellow uniform for construction work. Fabric is durable polyester. High visibility yellow uniform for construction work. Fabric is durable polyester. High visibility yellow uniform for construction work. Fabric is durable polyester. High visibility yellow uniform for construction work. Fabric is durable polyester.',
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
        name: 'SafeConstructionUniform',
        price: '$99.99',
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
    const [selectedImage, setSelectedImage] = useState(null);

    const item = items.find(item => item.company === company && item.name === name);

    useEffect(() => {
        if (item && item.colour.length > 0) {
            setSelectedColor(item.colour[0]); // Set default color to the first color in the list
        }
    }, [item]);

    if (!item) {
        return <div>Item not found</div>;
    }

    const defaultImage = item.image[0];

    return (
        <main>
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
                    <p className={styles.itemPrice}>{item.price}</p>
                    <div className={styles.separator}></div>
                    <form>
                        <div className={styles.colorSelector}>
                            Colour:
                            {item.colour.map((color, index) => (
                                <div
                                    key={index}
                                    className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                                    onClick={() => {
                                        setSelectedColor(color);
                                        console.log(`Selected color: ${color}`); // Add this line for debugging
                                    }}
                                >
                                    {color}
                                </div>
                            ))}
                        </div>
                        <p className={styles.sizeLabel}>Size:</p>
                        <div className={styles.selectWrapper}>
                            <select className={styles.selectSize} name="sizing" id="sizing">
                                <option value="" disabled selected>Please Select:</option>
                                <option value="large">Large</option>
                                <option value="medium">Medium</option>
                                <option value="small">Small</option>
                            </select>
                        </div>
                        <button className={styles.addItem} type="addItem">Add To Cart</button>
                        <p className={styles.descriptionLabel}>Description:</p>
                        <p className={styles.itemDetail}>{item.detail}</p>
                    </form>
                </div>
            </div>
        </main>
    );
};
