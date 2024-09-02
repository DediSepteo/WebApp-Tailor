import React from 'react';
import '../styles/landing-page.css';
import '../styles/fonts.css';
import { Link } from 'react-router-dom';

const NewLandingPage = () => {
    return (
        <div className="container-fluid">
            <img
                src={require('../assets/corperate group.jpg')}
                alt="Corporate"
                className="landing-image darken-image"
            />
            <div className='img-text'>
                <h2>Corporate</h2>
                <p>
                    Business, Retail, Construction, Restaurant, Uniforms etc.
                </p>
                <button className="order-button">Order Now</button>
            </div>
            <div className="bottom-nav">
                <a href="/Home" className="bottom-nav-link">
                    No, just take me to home &#8250;
                </a>
            </div>
        </div>
    );
};

export default NewLandingPage;
