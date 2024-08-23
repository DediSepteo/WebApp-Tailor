import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import './Category.css';

const categories = [
    {
        name: 'Security',
        link: '/Shop/Security',
        image: require('../assets/security.png')
    },
    {
        name: 'Restaurant',
        link: '/Shop/Restaurant',
        image: require('../assets/restaurant.png')
    },
    {
        name: 'Schools',
        link: '/Shop/Schools',
        image: require('../assets/homeBanner2.png')
    },
    {
        name: 'Construction',
        link: '/Shop/Security',
        image: require('../assets/homeBanner2.png')
    },
    {
        name: 'Retail',
        link: '/Shop/Restaurant',
        image: require('../assets/security.png')
    },
    {
        name: 'Suits',
        link: '/Shop/Schools',
        image: require('../assets/restaurant.png')
    },
];

export const Category = () => {
    return (
        <main>
            <div className="directoryContainer">
                <p className="currentPage">Shop</p>
                <div className="navLinks">
                    <Link to="/Home" className="directoryLink">Home</Link>
                    <Link to="/Shop" className="directoryLink">/Shop</Link>
                    <Link to="" className="currentLink">/Corporate</Link>
                </div>
            </div>
            <p className="pageTitle">Categories</p>
            <div className="categoriesContainer">
                {categories.map((category, index) => (
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
