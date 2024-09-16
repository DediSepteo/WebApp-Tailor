import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/ShopItem.module.css';

const options = [
    // Clothing under each category
    {
        company: 'PoliceDepartment1',
        name: 'Blue Police Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop2/PoliceDepartment1/BluePoliceUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'PoliceDepartment1',
        name: 'Brown Police Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton ',
        price: '$99.99',
        link: '/Shop2/PoliceDepartment1/BrownPoliceUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'PoliceDepartment2',
        name: 'An Extremely Long Shirt Name',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop2/Suits1/Suit3',
        image: require('../assets/security.png')
    },
    /* Army Items */
    {
        company: 'ArmyBase1',
        name: 'An Extremely Long Shirt Name',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop2/Suit/Suit4',
        image: require('../assets/security.png')
    },
    {
        company: 'ArmyBase2',
        name: 'An Extremely Long Shirt Name',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop2/Suit/Suit1',
        image: require('../assets/security.png')
    },
    /* Teacher Items */
    {
        company: 'Teacher1',
        name: 'Retail1',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop2/Retail/Retail1',
        image: require('../assets/security.png')
    },
    {
        company: 'Teacher2',
        name: 'Retail2',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop2/Retail/Retail2',
        image: require('../assets/security.png')
    },
];

export const Shop2Item = () => {
    const { company } = useParams();
    const filteredItems = options.filter(item => item.company === company);

    return (
        <main>
            <div className={styles.directoryContainer}>
                <p className={styles.currentPage}>Shop</p>
                <div className={styles.navLinks}>
                    <Link to="/Home" className={styles.directoryLink}>Home</Link>
                    <Link to="/Shop2" className={styles.directoryLink}>/Shop</Link>
                    <Link to="" className={styles.currentLink}>/{company}</Link>
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {filteredItems.map((item, index) => (
                    <Link to={item.link} className={styles.categoryItem}>
                            <div className={styles.categoryImageWrapper}>
                                <img src={item.image} alt={item.name} className={styles.categoryImage} />
                            </div>
                            <div>
                                <p className={styles.categoryName}>{item.name}</p>
                                <p className={styles.categoryDetail}>{item.detail}</p>
                                <p className={styles.categoryPrice}>{item.price}</p>
                            </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}