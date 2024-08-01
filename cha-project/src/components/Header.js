// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importing CSS for styling

const Header = () => {
    return (
        <header className="header">
            <div className="brand">
                BrandTailors Co.
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/homepage">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
