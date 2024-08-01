import "../styles/HomePage.css"
import "../assets/homeBanner1.png"
import "./NavBar"

export const HomePage = () => {
    return (
        <main className="main">
            <div className="banner">
                <div className="intro">
                    <h2>Welcome to BrandTailors Co.</h2>
                    <p>Combining tradition with cutting-edge AI to craft bespoke clothing that fits you perfectly.</p>
                </div>
                <div className="images">
                    <img src={require("../assets/homeBanner1.png")} alt="Tailoring" className="left-img" />
                    <img src={require("../assets/homeBanner2.png")} alt="Suit" className="right-img" />
                </div>
            </div>
        </main>
    )
}