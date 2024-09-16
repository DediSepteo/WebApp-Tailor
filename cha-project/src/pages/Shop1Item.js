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
        name: 'Yellow Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton ',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/YellowConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Orange Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/OrangeConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Red Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/RedConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Green Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/GreenConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Blue Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/BlueConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'GreatConstructionsCo',
        name: 'Brown Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/GreatConstructionsCo/BrownConstructionUniform',
        image: require('../assets/security.png')
    },
    {
        company: 'BuildnConstruct',
        name: 'Grey Construction Uniform',
        detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
        price: '$99.99',
        link: '/Shop1/Construction2/GreyConstructionUniform',
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