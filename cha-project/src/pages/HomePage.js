import "../styles/HomePage.css"

export const HomePage = () => {
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
        </main>
    )
}