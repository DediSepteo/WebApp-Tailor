import React, { useState } from 'react';
import styles from '../styles/Contact.module.css'

export const Contact = () => {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>Contact Us</div>
            <form>
                <div className={styles.inputTitle}>
                    <span>Name</span>
                    <p>*</p>
                </div>
                <input
                    type="text"
                    name="name"
                    required
                    className={styles.inputField}
                />
                <div className={styles.inputTitle}>
                    <span>Email Address</span>
                    <p>*</p>
                </div>
                <input
                    type="email"
                    name="email"
                    className={styles.inputField}
                />
                <div className={styles.inputTitle}>
                    <span>Message</span>
                    <p>*</p>
                </div>
                <textarea
                    name="message"
                    className={styles.textArea}
                />
                <button className={styles.submitButton} type="submit">Submit</button>
            </form>
        </div>
    )
}