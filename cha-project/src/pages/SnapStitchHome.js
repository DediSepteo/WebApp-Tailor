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
                    <p>Start Scanning</p>
                </div>
                <div style={{ display: 'flex', flexDirection: "row" }}>
                    <img src={require("../assets/phoneBodyScan.png")} />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <pre className={styles.contentHead}>
                            Find your {"\n"}
                            perfect fit with the     {"\n"}
                            press of a button
                        </pre>
                        <pre className={styles.contentDesc}>
                            Obtain your body measurements with near perfect accuracy, tailored specifically for your suits
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
                    Can't figure out your perfect sizing?<br />Learn more about SnapStitch!
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
