import React, { useEffect, useState } from "react";
import styles from "../styles/confirmPopUp.module.css"

const CustomPopUp = ({ togglePopup, title, text, hasCancel }) => {

    const handleConfirm = () => {
        togglePopup()
        alert("Confirmed!");
    };

    const handleCancel = () => {
        togglePopup()
        alert("Cancelled!");
    }

    return (
        <div>
            <div className={styles.darkenDiv} />
            <div>
                <div id="popup" className={styles.popupBox}>
                    <div className={styles.popupContent}>
                        <span className={styles.head}>{title}</span>
                        <p className={styles.body}>{text}</p>
                        <div className={styles.buttonDiv}>
                            {hasCancel && (
                                <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
                            )}
                            <button className={styles.confirmBtn} onClick={handleConfirm}>Confirm</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomPopUp;
