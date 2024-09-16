import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/Category.module.css';

const categories = [
    // Government categories
    {
        type: 'Government',
        name: 'Police',
        companies: [
            { name: 'PoliceDepartment1', url: '/Shop2/PoliceDepartment1' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Shop2/PoliceDepartment2' },
        ],
        image: require('../assets/restaurant.png')
    },
    {
        type: 'Government',
        name: 'Army',
        companies: [
            { name: 'ArmyBase1', url: '/Shop2/ArmyBase1' },
            { name: 'ArmyBase2', url: '/Shop2/ArmyBase2' }
        ],
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Government',
        name: 'Teacher',
        companies: [
            { name: 'Teacher1', url: '/Shop2/Teacher1' },
            { name: 'Teacher2', url: '/Shop2/Teacher2' }
        ],
        image: require('../assets/security.png')
    },
    {
        type: 'Government',
        name: 'Navy',
        companies: [
            { name: 'NavyBase1', url: '/Shop2/NavyBase1' },
            { name: 'NavyBase2', url: '/Shop2/NavyBase2' }
        ],
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Government',
        name: 'Nurse',
        companies: [
            { name: 'Nurse1', url: '/Shop2/Nurse1' },
            { name: 'Nurse2', url: '/Shop2/Nurse2' }
        ],
        image: require('../assets/security.png')
    },
    {
        type: 'Government',
        name: 'Air Force',
        companies: [
            { name: 'AirForceBase1', url: '/Shop2/AirForceBase1' },
            { name: 'AirForceBase2', url: '/Shop2/AirForceBase2' }
        ],
        image: require('../assets/restaurant.png')
    },
];

export const GovtShop = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const companyListRefs = useRef([]);

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
                <div className="navLinks">
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
}
