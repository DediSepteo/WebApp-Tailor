import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import './Category.css';

const categories = [
    // Corporate categories
    {
        type: 'Corporate',
        name: 'Security',
        link: '/Shop/Security',
        image: require('../assets/security.png')
    },
    {
        type: 'Corporate',
        name: 'Restaurant',
        link: '/Shop/Restaurant',
        image: require('../assets/restaurant.png')
    },
    {
        type: 'Corporate',
        name: 'Schools',
        link: '/Shop/Schools',
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Corporate',
        name: 'Construction',
        link: '/Shop/Security',
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Corporate',
        name: 'Retail',
        link: '/Shop/Restaurant',
        image: require('../assets/security.png')
    },
    {
        type: 'Corporate',
        name: 'Suits',
        link: '/Shop/Schools',
        image: require('../assets/restaurant.png')
    },

    // Government categories
    {
        type: 'Government',
        name: 'Police',
        link: '/Shop/Police',
        image: require('../assets/restaurant.png')
    },
    {
        type: 'Government',
        name: 'Army',
        link: '/Shop/Army',
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Government',
        name: 'Teacher',
        link: '/Shop/Teacher',
        image: require('../assets/security.png')
    },
    {
        type: 'Government',
        name: 'Navy',
        link: '/Shop/Navy',
        image: require('../assets/homeBanner2.png')
    },
    {
        type: 'Government',
        name: 'Nurse',
        link: '/Shop/Nurse',
        image: require('../assets/security.png')
    },
    {
        type: 'Government',
        name: 'Air Force',
        link: '/Shop/AirForce',
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
            <Footer />
        </main>
    );
}

export default Category;