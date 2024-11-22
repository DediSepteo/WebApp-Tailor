import React, { useState, useEffect } from 'react';
import styles from '../styles/EditProfileInfo.module.css';
import { IoClose } from "react-icons/io5";

const EditProfileInfo = ({ isVisible, onClose, fieldToEdit, initialValue, userId }) => {
    const [value, setValue] = useState(initialValue || ''); // New value (name, email, password, etc.)
    const [currentPassword, setCurrentPassword] = useState(''); // For email change validation (optional)
    const [confirmPassword, setConfirmPassword] = useState(''); // For confirm new password
    const [mouseDownInside, setMouseDownInside] = useState(false);

    const title = fieldToEdit === 'name' ? 'Change Name' : 
                  fieldToEdit === 'email' ? 'Change Email' :
                  fieldToEdit === 'phone' ? 'Change Phone Number' :
                  fieldToEdit === 'address' ? 'Change Address' :
                  fieldToEdit === 'industry' ? 'Change Industry' :
                  fieldToEdit === 'password' ? 'Change Password' : '';

    useEffect(() => {
        if (isVisible) {
            setValue(initialValue || '');
            setCurrentPassword(''); // Reset on visibility change
            setConfirmPassword(''); // Reset confirm password
        }
    }, [initialValue, fieldToEdit, isVisible]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!fieldToEdit || !userId) {
            alert('Missing field or user ID');
            return;
        }

        // Password-specific validation
        if (fieldToEdit === 'password') {
            if (!currentPassword.trim()) {
                alert('Please enter your current password.');
                return;
            }
            if (!value.trim()) {
                alert('Please enter a new password.');
                return;
            }
            if (value !== confirmPassword) {
                alert('New passwords do not match. Please try again.');
                return;
            }
        }

        // Email-specific validation (confirm password)
        if (fieldToEdit === 'email' && currentPassword.trim() === '') {
            alert('Please enter your password to confirm changes.');
            return;
        }

        try {
            const payload = fieldToEdit === 'password'
                ? { currentPassword, newPassword: value } // Include current password and new password
                : fieldToEdit === 'email'
                ? { email: value, password: currentPassword } // Include current password for email change
                : { [fieldToEdit]: value }; // For other fields

            // Replace with your actual backend URL
            const response = await fetch(`http://localhost:3000/api/org/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Profile updated successfully');
                onClose(); // Close modal
            } else {
                const errorData = await response.json();
                alert(`Failed to update profile: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred. Please try again.');
        }
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
                    <p className={styles.editingTitle}>{title}</p>
                    <IoClose className={styles.closeIcon} onClick={onClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    {fieldToEdit === 'password' && (
                        <>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className={styles.inputField}
                            />
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className={styles.inputField}
                            />
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={styles.inputField}
                            />
                        </>
                    )}
                    {fieldToEdit === 'email' && (
                        <>
                            <input
                                type="email"
                                placeholder="Enter new email"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className={styles.inputField}
                            />
                            <input
                                type="password"
                                placeholder="Enter your password to confirm"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className={styles.inputField}
                            />
                        </>
                    )}
                    {fieldToEdit !== 'password' && fieldToEdit !== 'email' && (
                        <input
                            type="text"
                            placeholder={`Enter new ${fieldToEdit}`}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    )}
                    <div className={styles.inputUnderline}></div>
                    <button className={styles.forgetPasswordButton} type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileInfo;
