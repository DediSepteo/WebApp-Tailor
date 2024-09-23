import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/ShopItem.module.css';

const options = [
    // Clothing under each category
    {
        company: 'Suits1',
        name: 'An Extremely Long Shirt Name',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/Suits1/Suit1',
        image: require('../assets/security.png')
    },
    {
        company: 'Suits1',
        name: 'An Extremely Long Shirt Name',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton ',
        price: '$99.99',
        link: '/Shop1/Suits1/Suit2',
        image: require('../assets/security.png')
    },
    {
        company: 'Suits1',
        name: 'An Extremely Long Shirt Name',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/Suits1/Suit3',
        image: require('../assets/security.png')
    },
    {
        company: 'Suits1',
        name: 'An Extremely Long Shirt Name',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/Suit/Suit4',
        image: require('../assets/security.png')
    },
    {
        company: 'Suits2',
        name: 'An Extremely Long Shirt Name',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/Suit/Suit1',
        image: require('../assets/security.png')
    },
    /* Retail Items */
    {
        company: 'Retail1',
        name: 'Retail1',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/Retail/Retail1',
        image: require('../assets/security.png')
    },
    {
        company: 'Retail2',
        name: 'Retail2',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/Retail/Retail2',
        image: require('../assets/security.png')
    },
    /* Construction Items */
    {
        company: 'GreatConstructionsCo',
        name: 'Fancy Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton ',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/FancyConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Safe Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/SafeConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Vibrant Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/VibrantConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Ultra Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/UltraConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Mega Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/MegaConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Cool Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/CoolConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'BuildnConstruct',
        name: 'Great Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/Construction2/GreatConstructionUniform',
        image: require('../assets/security.png')
    },
];

export const Shop1Item = () => {
    const { company } = useParams();
    const filteredItems = options.filter(item => item.company === company);

    return (
        <main>
            <div className={styles.directoryContainer}>
                <p className={styles.currentPage}>Shop</p>
                <div className={styles.navLinks}>
                    <Link to="/Home" className={styles.directoryLink}>Home</Link>
                    <Link to="/Shop1" className={styles.directoryLink}>/Shop</Link>
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