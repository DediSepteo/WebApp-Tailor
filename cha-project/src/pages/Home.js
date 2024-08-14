import styles from "../styles/Home.module.css"; // Import the CSS Module

export const Home = () => {
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
                    <img
                        src={require("../assets/homeBanner1.png")}
                        alt="Tailoring"
                        className={styles.leftImg}
                    />
                    <img
                        src={require("../assets/homeBanner2.png")}
                        alt="Suit"
                        className={styles.rightImg}
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
                    Find what you need - handmade custom for you
                </p>
                <div className={styles.fabBtn}>
                    <button className={styles.fabricationButton}>Shop Corporate</button>
                    <button className={styles.fabricationButton}>Shop Government</button>
                </div>
            </div>
        </main>
    );
};
