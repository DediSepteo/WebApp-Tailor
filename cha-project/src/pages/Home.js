import styles from "../styles/Home.module.css"; // Import the CSS Module
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Home = () => {
    const [loading, setLoading] = useState(true);

    const preloadImages = (imagePaths) => {
        return Promise.all(
            imagePaths.map((path) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = path;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            })
        );
    };

    useEffect(() => {
        const imagesToLoad = [
            require("../assets/homeBanner1.png"),
            require("../assets/homeBannerRight.jpg"),
        ];

        preloadImages(imagesToLoad)
            .then(() => {
                setLoading(false)
            })
            .catch((err) => console.error("Error loading images", err));
    }, []);

    if (loading)
        return (<div></div>)

    return (
        <main className={styles.main}>
            <div className={styles.banner}>
                <div className={styles.introBG} />
                <div className={styles.intro}>
                    <p className={styles.introText}>Welcome to</p>
                    <p className={styles.introBrand}>BrandTailors Co.</p>
                    <pre className={styles.introDesc}>
                        Combining tradition with {'\n'}
                        cutting-edge AI to craft bespoke {'\n'}
                        clothing that fits you perfectly.
                    </pre>
                </div>
                <div className={styles.images}>
                    {loading && (
                        <>
                            <div className={styles.leftPlaceholder} />
                            <div className={styles.rightPlaceholder} />
                        </>
                    )}

                    <img
                        src={require("../assets/homeBanner1.png")}
                        alt="Tailoring"
                        className={styles.leftImg}
                        style={{ display: loading ? 'none' : 'block' }} // Hide the image until loaded
                    />
                    <img
                        src={require("../assets/homeBannerRight.jpg")}
                        alt="Suit"
                        className={styles.rightImg}
                        style={{ display: loading ? 'none' : 'block' }} // Hide the image until loaded
                    />
                </div>
            </div>
            <div className={styles.booking}>
                <pre className={styles.bookHead}>
                    Book a consultation with us for your{"\n"}tailoring needs
                </pre>
                <pre className={styles.bookDesc}>
                    We are more than happy to assist and share with you our{"\n"}garments and the people behind them.
                </pre>
                <button className={styles.bookingButton}>
                    Book Now
                </button>
            </div>
            <div className={styles.fabrication}>
                <p className={styles.fabHead}>Fabrication For You</p>
                <p className={styles.fabSubHead}>
                    Can't figure out your perfect sizing?<br />Learn more about SnapStitch!
                </p>
                <div className={styles.fabBtnDiv}>
                    <Link to="/Shop1" className={styles.fabBtn}>
                        <img src={require("../assets/SnapstitchLogo.png")} className={styles.snapstitchLogo} />
                        Learn More
                    </Link> {/*link to corporate shop for the time being*/}
                </div>
            </div>
        </main>
    );
};
