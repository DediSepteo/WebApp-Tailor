import React from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import './Category.css';

const categories = [
    // Corporate categories
    {
        type: 'Corporate',
        name: 'Security',
        link: '/Corporate/Security',
        image: require('../assets/security.png')
    },
    {
        type: 'Corporate',
        name: 'Restaurant',
        link: '/Corporate/Restaurant',
        image: require('../assets/restaurant.png')
    },
    {
        type: 'Corporate',
        name: 'Schools',
        link: '/Corporate/Schools',
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Corporate',
        name: 'Construction',
        link: '/Corporate/Construction',
        image: require('../assets/security.png')
    },
    {
        type: 'Corporate',
        name: 'Retail',
        link: '/Corporate/Retail',
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Corporate',
        name: 'Suits',
        link: '/Corporate/Suits',
        image: require('../assets/restaurant.png')
    },

    // Government categories
    {
        type: 'Government',
        name: 'Police',
        link: '/Government/Police',
        image: require('../assets/restaurant.png')
    },
    {
        type: 'Government',
        name: 'Army',
        link: '/Government/Army',
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Government',
        name: 'Teacher',
        link: '/Government/Teacher',
        image: require('../assets/security.png')
    },
    {
        type: 'Government',
        name: 'Navy',
        link: '/Government/Navy',
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Government',
        name: 'Nurse',
        link: '/Government/Nurse',
        image: require('../assets/security.png')
    },
    {
        type: 'Government',
        name: 'Air Force',
        link: '/Government/AirForce',
        image: require('../assets/restaurant.png')
    },
];

export const Category = ({ type }) => {
    const filteredCategories = categories.filter(category => category.type === type);

    return (
        <main>
            <div className="directoryContainer">
                <p className="currentPage">Shop</p>
                <div className="navLinks">
                    <Link to="/Home" className="directoryLink">Home</Link>
                    <Link to="" className="directoryLink">/Shop</Link>
                    <Link to="" className="currentLink">/{type}</Link>
                </div>
            </div>
            <p className="pageTitle">Categories</p>
            <div className="categoriesContainer">
                {filteredCategories.map((category, index) => (
                    <div key={index} className="categoryItem">
                        <Link to={category.link}>
                            <p className="categoryName">{category.name}</p>
                            <img src={category.image} alt={category.name} className="categoryImage" />
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Category;
