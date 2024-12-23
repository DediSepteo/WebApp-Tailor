import styles from "../styles/SnapStitchHome.module.css"; // Import the CSS Module
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const SnapStitchHome = () => {

    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <div className={styles.navBar}>
                    <p className={styles.brand}>
                        <img src={require("../assets/SnapstitchLogo.png")} className={styles.SnapStitchLogo} />
                        SnapStitch
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-evenly", width: "70%", }}>
                    <img src={require("../assets/phoneBodyScan.png")} />
                    <div style={{ textAlign: "start" }}>
                        <pre className={styles.contentHead}>
                            Find your<br />
                            perfect fit with the<br />
                            press of a button
                        </pre>
                        <pre className={styles.contentDesc}>
                            Obtain your body measurements {"\n"}
                            with near perfect accuracy, {"\n"}
                            tailored specifically for your suits
                        </pre>
                        <button className={styles.learnMoreBtn}>
                            Learn more
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.fabrication}>
                <p className={styles.fabHead}>Fabrication For You</p>
                <p className={styles.fabSubHead}>
                    We deeply value and protect your privacy<br />No photos will be taken at any point during the process, ensuring your peace of mind and maintaining your confidentiality throughout.
                </p>
                <div className={styles.fabBtnDiv}>
                    <Link to="/Shop1" className={styles.fabBtn}>
                        Learn More
                    </Link> {/*link to corporate shop for the time being*/}
                </div>
            </div>
        </main>
    );
};
