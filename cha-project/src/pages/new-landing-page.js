import React from 'react';
import '../styles/landing-page.css';
import '../styles/fonts.css';

const NewLandingPage = () => {
    console.log("part 3")

    return (
        <div className="container-fluid">
            <img
                src={require('../assets/corporate group.jpg')}
                alt="Corporate"
                className="landing-image darken-image"
            />
            <div className='img-text'>
                <h2>Corporate</h2>
                <p>
                    Business, Retail, Construction, Restaurant, Uniforms etc.
                </p>
                <a href='/shop1'>
                    <button className="order-button">Order Now</button>
                </a>
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
