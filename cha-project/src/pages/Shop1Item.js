import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Import jwt-decode

import styles from '../styles/ShopItem.module.css';

// const options = [
//     // Clothing under each category
//     {
//         company: 'Suits1',
//         name: 'An Extremely Long Shirt Name',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/Suits1/Suit1',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'Suits1',
//         name: 'An Extremely Long Shirt Name',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton ',
//         price: 99.99,
//         link: '/Shop1/Suits1/Suit2',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'Suits1',
//         name: 'An Extremely Long Shirt Name',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/Suits1/Suit3',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'Suits1',
//         name: 'An Extremely Long Shirt Name',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/Suit/Suit4',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'Suits2',
//         name: 'An Extremely Long Shirt Name',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/Suit/Suit1',
//         image: require('../assets/security.png')
//     },
//     /* Retail Items */
//     {
//         company: 'Retail1',
//         name: 'Retail1',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/Retail/Retail1',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'Retail2',
//         name: 'Retail2',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/Retail/Retail2',
//         image: require('../assets/security.png')
//     },
//     /* Construction Items */
//     {
//         company: 'GreatConstructionsCo',
//         name: 'Fancy Construction Uniform',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton ',
//         price: 99.99,
//         link: '/Shop1/GreatConstructionsCo/FancyConstructionUniform',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'GreatConstructionsCo',
//         name: 'Safe Construction Uniform',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/GreatConstructionsCo/SafeConstructionUniform',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'GreatConstructionsCo',
//         name: 'Vibrant Construction Uniform',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/GreatConstructionsCo/VibrantConstructionUniform',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'GreatConstructionsCo',
//         name: 'Ultra Construction Uniform',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/GreatConstructionsCo/UltraConstructionUniform',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'GreatConstructionsCo',
//         name: 'Mega Construction Uniform',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/GreatConstructionsCo/MegaConstructionUniform',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'GreatConstructionsCo',
//         name: 'Cool Construction Uniform',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/GreatConstructionsCo/CoolConstructionUniform',
//         image: require('../assets/security.png')
//     },
//     {
//         company: 'BuildnConstruct',
//         name: 'Great Construction Uniform',
//         detail: 'Black tailored polo in flat one piece collar. Fabric is 100% pique cotton',
//         price: 99.99,
//         link: '/Shop1/Construction2/GreatConstructionUniform',
//         image: require('../assets/security.png')
//     },
// ];

const placeholderImg = "https://placehold.co/430x640"

export const Shop1Item = () => {
    const [products, setProducts] = useState([]);
    const [companyFromSession, setCompanyFromSession] = useState('');

    //const filteredItems = options.filter(item => item.company === company); idk whats this lol @jav

    useEffect(() => {
        // Retrieve token from sessionStorage
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const orgName = decodedToken.org_name;
                const org_id = decodedToken.org_id;
                console.log('Organization Name from Token:', orgName);
                console.log('org id', org_id)
                setCompanyFromSession(orgName);

                // Fetch products using the org_name
                fetch(`http://localhost:3000/api/product/${org_id}`)
                    .then(response => response.json())
                    .then(data => {
                        setProducts(data);  // Store fetched products
                    })
                    .catch(error => {
                        console.error('Error fetching products:', error);
                    });
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.error('No token found in sessionStorage');
        }
    }, []);

    return (
        <main>
            <div className={styles.directoryContainer}>
                <p className={styles.currentPage}>Shop</p>
                <div className={styles.navLinks}>
                    <Link to="/Home" className={styles.directoryLink}>Home</Link>
                    <Link to="/Shop1" className={styles.directoryLink}>/Shop</Link>
                    <Link to="" className={styles.currentLink}>/{companyFromSession}</Link>
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {products.map((item, index) => (
                    <Link to={item.link} className={styles.categoryItem} key={index}>
                        <div className={styles.categoryImageWrapper}>
                            <img
                                src={item.image || placeholderImg}  // Use placeholder if image is missing
                                alt={item.name}
                                className={styles.categoryImage}
                            />
                        </div>
                        <div>
                            <p className={styles.categoryName}>{item.name}</p>
                            <p className={styles.categoryDetail}>{item.description}</p>
                            <p className={styles.categoryPrice}>${item.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}