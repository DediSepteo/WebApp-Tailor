import React, { useState } from 'react';
import styles from '../styles/Authentication.module.css';
import { IoClose } from "react-icons/io5";

const ForgotPasswordPopup = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password reset requested for:', email);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.forgetPasswordTop}>
            <p className={styles.forgetPasswordTitle}>Reset Your Password</p>
            <IoClose className={styles.closeIcon} onClick={onClose}/>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
          <button className={styles.forgetPasswordButton} type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;