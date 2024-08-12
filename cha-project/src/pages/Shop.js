import "../styles/Home.css"
import "./NavBar"

export const Shop = () => {
    return (
        <main className="main">
            <div className="banner">
                <div className="introBG" />
                <div className="intro">
                    <p className="introText">Welcome to</p>
                    <p className="introBrand">BrandTailors Co.</p>
                    <pre className="introDesc">Combining tradition with {'\n'}cutting-edge AI to craft bespoke {'\n'}clothing that fits you perfectly.</pre>
                </div>
                <div className="images">
                    <img src={require("../assets/homeBanner1.png")} alt="Tailoring" className="left-img" />
                    <img src={require("../assets/homeBanner2.png")} alt="Suit" className="right-img" />
                </div>
            </div>
            <div className="booking">
                <pre className="bookHead">Book a consultation with us for your{"\n"}tailoring needs</pre>
                <pre className="bookDesc">We are more than happy to assist and share with you our{"\n"}garments and the people behind them.</pre>
                <button>
                    Book Now
                </button>
            </div>
            <div className="fabrication">
                <p className="fabHead">Fabrication For You</p>
                <p className="fabSubHead">Find what you need - handmade custom for you</p>
                <div className="fab-btn">
                    <button>Shop Corporate</button>
                    <button>Shop Government</button>
                </div>
            </div>
        </main>
    )
}