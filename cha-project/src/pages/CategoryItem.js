import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/CategoryItem.module.css';

const options = [
    // Clothing under each category
    {
        type: 'Suits',
        name: 'Black Polo Tee',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Suit/Suit1',
        image: require('../assets/security.png')
    },
    {
        type: 'Suits',
        name: 'An Extremely Long Shirt Name',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton Black tailored polo in flat one piece collar. Fabric is 100% pique cotton Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Suit/Suit2',
        image: require('../assets/security.png')
    },
    {
        type: 'Suits',
        name: 'Suit3',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Suit/Suit3',
        image: require('../assets/security.png')
    },
    {
        type: 'Suits',
        name: 'Suit4',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Suit/Suit4',
        image: require('../assets/security.png')
    },
    {
        type: 'Suits',
        name: 'Suit5',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Suit/Suit1',
        image: require('../assets/security.png')
    },
    /* Retail Items */
    {
        type: 'Retail',
        name: 'Retail1',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Retail/Retail1',
        image: require('../assets/suit4.png')
    },
    {
        type: 'Retail',
        name: 'Retail2',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Retail/Retail2',
        image: require('../assets/suit3.png')
    },
    /* Construction Items */
    {
        type: 'Construction',
        name: 'Construction1',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton ',
        price: '$99.99',
        link: '/Shop/Construction/Construction1',
        image: require('../assets/suit3.png')
    },
    {
        type: 'Construction',
        name: 'Construction2',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Construction/Construction2',
        image: require('../assets/suit3.png')
    },
    {
        type: 'Construction',
        name: 'Construction3',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Construction/Construction3',
        image: require('../assets/suit3.png')
    },
    {
        type: 'Construction',
        name: 'Construction4',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Construction/Construction4',
        image: require('../assets/suit3.png')
    },
    {
        type: 'Construction',
        name: 'Construction5',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Construction/Construction5',
        image: require('../assets/suit3.png')
    },
    {
        type: 'Construction',
        name: 'Construction6',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Construction/Construction6',
        image: require('../assets/suit3.png')
    },
    {
        type: 'Construction',
        name: 'Construction7',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop/Construction/Construction7',
        image: require('../assets/suit3.png')
    },
];

export const CategoryItem = () => {
    const { type } = useParams();
    const filteredItems = options.filter(item => item.type === type);

    return (
        <main>
            <div className={styles.directoryContainer}>
                <p className={styles.currentPage}>Shop</p>
                <div className={styles.navLinks}>
                    <Link to="/Home" className={styles.directoryLink}>Home</Link>
                    <Link to="" className={styles.directoryLink}>/Shop</Link>
                    <Link to="/Corporate" className={styles.directoryLink}>/Corporate</Link>
                    <Link to="" className={styles.currentLink}>/{type}</Link>
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {filteredItems.map((item, index) => (
                    <div className={styles.categoryItem}>
                        <Link to={item.link} className={styles.itemLink}>
                            <div className={styles.categoryImageWrapper}>
                                <img src={item.image} alt={item.name} className={styles.categoryImage} />
                            </div>
                            <div>
                                <p className={styles.categoryName}>{item.name}</p>
                                <p className={styles.categoryDetail}>{item.detail}</p>
                                <p className={styles.categoryPrice}>{item.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}