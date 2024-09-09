import React, { useState, useRef } from 'react';
import './Category.css';

const categories = [
    // Corporate categories
    {
        type: 'Corporate',
        name: 'Security',
        companies: [
            { name: 'SecurityFirm1', url: '/Corporate/SecurityFirm1' },
            { name: 'SecurityFirm2', url: '/Corporate/SecurityFirm2' }
        ],
        image: require('../assets/security.png')
    },
    {
        type: 'Corporate',
        name: 'Restaurant',
        companies: [
            { name: 'Restaurant1', url: '/Corporate/Restaurant1' },
            { name: 'Restaurant2', url: '/Corporate/Restaurant2' }
        ],
        image: require('../assets/restaurant.png')
    },
    {
        type: 'Corporate',
        name: 'Schools',
        companies: [
            { name: 'School1', url: '/Corporate/School1' },
            { name: 'School2', url: '/Corporate/School2' }
        ],
        image: require('../assets/homeBanner2.png')
    },  
    {
        type: 'Corporate',
        name: 'Construction',
        companies: [
            { name: 'GreatConstructions Co.', url: '/Corporate/GreatConstructionsCo' },
            { name: 'Build n Construct', url: '/Corporate/BuildnConstruct' }
        ],
        image: require('../assets/security.png')    
    },
    {
        type: 'Corporate',
        name: 'Retail',
        companies: [
            { name: 'Retail1', url: '/Corporate/Retail1' },
            { name: 'Retail2', url: '/Corporate/Retail2' }
        ],
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Corporate',
        name: 'Suits',
        companies: [
            { name: 'Suits1', url: '/Corporate/Suits1' },
            { name: 'Suits2', url: '/Corporate/Suits2' }
        ],
        image: require('../assets/restaurant.png')
    },

    // Government categories
    {
        type: 'Government',
        name: 'Police',
        companies: [
            { name: 'PoliceDepartment1', url: '/Government/PoliceDepartment1' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
            { name: 'PoliceDepartment2', url: '/Government/PoliceDepartment2' },
        ],
        image: require('../assets/restaurant.png')
    },
    {
        type: 'Government',
        name: 'Army',
        companies: [
            { name: 'ArmyBase1', url: '/Government/ArmyBase1' },
            { name: 'ArmyBase2', url: '/Government/ArmyBase2' }
        ],
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Government',
        name: 'Teacher',
        companies: [
            { name: 'Teacher1', url: '/Government/Teacher1' },
            { name: 'Teacher2', url: '/Government/Teacher2' }
        ],
        image: require('../assets/security.png')
    },
    {
        type: 'Government',
        name: 'Navy',
        companies: [
            { name: 'NavyBase1', url: '/Government/NavyBase1' },
            { name: 'NavyBase2', url: '/Government/NavyBase2' }
        ],
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Government',
        name: 'Nurse',
        companies: [
            { name: 'Nurse1', url: '/Government/Nurse1' },
            { name: 'Nurse2', url: '/Government/Nurse2' }
        ],
        image: require('../assets/security.png')
    },
    {
        type: 'Government',
        name: 'Air Force',
        companies: [
            { name: 'AirForceBase1', url: '/Government/AirForceBase1' },
            { name: 'AirForceBase2', url: '/Government/AirForceBase2' }
        ],
        image: require('../assets/restaurant.png')
    },
];

export const Category = ({ type }) => {
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

    const filteredCategories = categories.filter(category => category.type === type);

    return (
        <main>
            <div className="directoryContainer">
                <p className="currentPage">Shop</p>
                <div className="navLinks">
                    <a href="/Home" className="directoryLink">Home</a>
                    <a href="" className="currentLink">/{type}</a>
                </div>
            </div>
            <p className="pageTitle">Categories</p>
            <div className="categoriesContainer">
                {filteredCategories.map((category, index) => (
                    <div
                        key={index}
                        className="categoryItem"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleCategoryClick(index)}
                    >
                        <div className="imageOverlay">
                            <p className="categoryName">{category.name}</p>
                            <img
                                src={category.image}
                                alt={category.name}
                                className={`categoryImage ${hoveredIndex === index ? 'darken' : ''}`}
                            />
                        </div>
                        <div
                            className={`companyList ${hoveredIndex === index ? 'show' : ''}`}
                            ref={(el) => companyListRefs.current[index] = el}
                        >
                            {category.companies.map((company, i) => (
                                <p
                                    key={i}
                                    className="companyItem"
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
