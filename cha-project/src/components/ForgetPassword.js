import React, { useState } from 'react';
import styles from '../styles/Authentication.module.css';
import { IoClose } from "react-icons/io5";

const ForgotPasswordPopup = ({ isVisible, onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [mouseDownInside, setMouseDownInside] = useState(false);

    // const handleMouseDown = (e) => {
    //     if (e.target.closest(`.${styles.popupContent}`)) {
    //         setMouseDownInside(true);
    //     } else {
    //         setMouseDownInside(false);
    //     }
    // };

    // const handleMouseUp = (e) => {
    //     if (!mouseDownInside && !e.target.closest(`.${styles.popupContent}`)) {
    //         onClose();
    //     }
    //     setMouseDownInside(false);
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/contact/password-reset-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(result.message); // Display success message
                setError('');
                setEmail(''); // Clear email field
            } else {
                setMessage('');
                setError(result.error || 'Failed to send reset email');
            }
        } catch (err) {
            setMessage('');
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className={styles.popupOverlay}
        >
            <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.forgetPasswordTop}>
                    <p className={styles.forgetPasswordTitle}>Reset Your Password</p>
                    <IoClose className={styles.closeIcon} onClick={onClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.inputField}
                    />
                    <button className={styles.forgetPasswordButton} type="submit">Submit</button>
                </form>
                {/* Display success or error message */}
                {message && <div className={styles.successMessage}>{message}</div>}
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        </div>
    );
};

export default ForgotPasswordPopup;
