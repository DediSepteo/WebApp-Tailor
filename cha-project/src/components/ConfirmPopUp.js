import React, { useEffect, useState } from "react";
import styles from "../styles/confirmPopUp.module.css"

const ConfirmPopUp = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleConfirm = () => {
        alert("Confirmed!");
        setShowPopup(false); // Close popup on confirm
    };

    useEffect(() => {
        if (showPopup) {

        }
    })

    return (
        <div>
            <div className={styles.darkenDiv} />
            <div>
                <div id="popup" className={styles.popupBox} style={{ display: showPopup ? "block" : "block" }}>
                    <div className={styles.popupContent}>
                        <span className={styles.head}>Confirmation Pop Up</span>
                        <p className={styles.body}>Are you sure you want to proceed?</p>
                        <div className={styles.buttonDiv}>
                            <button className={styles.cancelBtn}>Cancel</button>
                            <button>Confirm</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPopUp;
