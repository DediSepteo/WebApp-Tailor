import React, { useState } from 'react';
import '../pages/Authentication.css';
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
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="forgetPasswordTop">
            <p className='forgetPasswordTitle'>Reset Your Password</p>
            <IoClose className="closeIcon" onClick={onClose}/>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            className="inputField"
          />
          <button className="forgetPasswordButton" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;