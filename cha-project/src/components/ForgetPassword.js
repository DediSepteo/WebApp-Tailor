import React, { useState } from 'react';
import styles from '../styles/Authentication.module.css';
import { IoClose } from "react-icons/io5";

const ForgotPasswordPopup = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [mouseDownInside, setMouseDownInside] = useState(false);

  const handleMouseDown = (e) => {
    if (e.target.closest(`.${styles.popupContent}`)) {
      setMouseDownInside(true);
    } else {
      setMouseDownInside(false);
    }
  };

  const handleMouseUp = (e) => {
    if (!mouseDownInside && !e.target.closest(`.${styles.popupContent}`)) {
      onClose();
    }
    setMouseDownInside(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password reset requested for:', email);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className={styles.popupOverlay}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
