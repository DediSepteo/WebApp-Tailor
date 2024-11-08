import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';  // Import jwt-decode library
import styles from '../styles/ShopCategory.module.css';

// const categories = [
//     // Corporate categories
//     {
//         type: 'Corporate',
//         name: 'Security',
//         companies: [
//             { name: 'SecurityFirm1', url: '/Shop1/SecurityFirm1' },
//             { name: 'SecurityFirm2', url: '/Shop1/SecurityFirm2' }
//         ],
//         image: require('../assets/security.png')
//     },
//     {
//         type: 'Corporate',
//         name: 'Restaurant',
//         companies: [
//             { name: 'Restaurant1', url: '/Shop1/Restaurant1' },
//             { name: 'Restaurant2', url: '/Shop1/Restaurant2' }
//         ],
//         image: require('../assets/restaurant.png')
//     },
//     {
//         type: 'Corporate',
//         name: 'Schools',
//         companies: [
//             { name: 'School1', url: '/Shop1/School1' },
//             { name: 'School2', url: '/Shop1/School2' }
//         ],
//         image: require('../assets/homeBanner2.png')
//     },  
//     {
//         type: 'Corporate',
//         name: 'Construction',
//         companies: [
//             { name: 'GreatConstructions Co.', url: '/Shop1/GreatConstructionsCo' },
//             { name: 'Build n Construct', url: '/Shop1/BuildnConstruct' }
//         ],
//         image: require('../assets/security.png')    
//     },
//     {
//         type: 'Corporate',
//         name: 'Retail',
//         companies: [
//             { name: 'Retail1', url: '/Shop1/Retail1' },
//             { name: 'Retail2', url: '/Shop1/Retail2' }
//         ],
//         image: require('../assets/homeBanner2.png')
//     },
//     {
//         type: 'Corporate',
//         name: 'Suits',
//         companies: [
//             { name: 'Suits1', url: '/Shop1/Suits1' },
//             { name: 'Suits2', url: '/Shop1/Suits2' }
//         ],
//         image: require('../assets/restaurant.png')
//     },
// ];


export const CorporateShop = () => {
    const [categories, setCategories] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const companyListRefs = useRef([]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            const decodedToken = jwtDecode(token);
            const org_id = decodedToken.org_id;  // Assuming org_id is a field in the token payload

            // Fetch products based on org_id
            fetch(`http://localhost:3000/api/product/org/${org_id}`)
                .then(response => response.json())
                .then(data => {
                    setCategories(data);  // Set categories based on fetched data
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        } else {
            console.error('No token found in localStorage');
        }
    }, []);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
        if (companyListRefs.current[index]) {
            companyListRefs.current[index].scrollTop = 0;
        }
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleClick = (url, index, e) => {
        if (companyListRefs.current[index]?.classList.contains('show')) {
            window.location.href = url;
        } else {
            e.stopPropagation();
        }
    };

    const handleCategoryClick = (index) => {
        if (hoveredIndex === index) {
            setHoveredIndex(null);
        } else {
            setHoveredIndex(index);
        }
    };

    return (
        <main>
            <div className={styles.directoryContainer}>
                <p className={styles.currentPage}>Shop</p>
                <div className={styles.navLinks}>
                    <Link to="/Home" className={styles.directoryLink}>Home</Link>
                    <Link to="" className={styles.currentLink}>/Shop</Link>
                </div>
            </div>
            <p className={styles.pageTitle}>Categories</p>
            <div className={styles.categoriesContainer}>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={styles.categoryItem}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleCategoryClick(index)}
                    >
                        <div className={styles.imageOverlay}>
                            <p className={styles.categoryName}>{category.name}</p>
                            <img
                                src={category.image}
                                alt={category.name}
                                className={`${styles.categoryImage} ${hoveredIndex === index ? 'darken' : ''}`}
                            />
                        </div>
                        <div
                            className={`${styles.companyList} ${hoveredIndex === index ? 'show' : ''}`}
                            ref={(el) => companyListRefs.current[index] = el}
                        >
                            {category.companies.map((company, i) => (
                                <p
                                    key={i}
                                    className={styles.companyItem}
                                    onClick={(e) => handleClick(company.url, index, e)}
                                >
                                    {company.name}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};
