import React, { useState, useEffect } from 'react';
import styles from '../styles/EditProfileInfo.module.css';
import { IoClose } from "react-icons/io5";

const EditProfileInfo = ({ isVisible, onClose, fieldToEdit, initialValue, userId }) => {
    const [value, setValue] = useState(initialValue || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [mouseDownInside, setMouseDownInside] = useState(false);

    // Title and input configuration based on the field
    const titleMap = {
        name: 'Change Name',
        email: 'Change Email',
        phone: 'Change Phone Number',
        address_line1: 'Change Address',
        industry: 'Change Industry',
        password: 'Change Password',
    };

    const title = titleMap[fieldToEdit] || '';
    const inputType = fieldToEdit === 'password' ? 'password' : 'text';
    const placeholder = fieldToEdit === 'password'
        ? 'Enter new password'
        : `Enter new ${fieldToEdit}`;

    useEffect(() => {
        if (isVisible) {
            setValue(initialValue || '');
            setCurrentPassword(''); // Reset current password
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

        // Verify password if editing the email
        if (fieldToEdit === 'email' && currentPassword) {
            try {
                const verifyResponse = await fetch('http://localhost:3000/api/org/verify-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ org_id: userId, currentPassword }),
                });

                if (!verifyResponse.ok) {
                    const verifyResult = await verifyResponse.json();
                    alert(`Password verification failed: ${verifyResult.error || 'Unknown error'}`);
                    return;
                }
            } catch (error) {
                console.error('Error verifying password:', error);
                alert('Failed to verify password. Please try again.');
                return;
            }
        }

        // Proceed with the update
        try {
            const payload = { [fieldToEdit]: value };
            const response = await fetch(`http://localhost:3000/api/org/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
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
                    <input
                        type={inputType}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                        className={styles.inputField}
                    />
                    {fieldToEdit === 'password' && (
                        <>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className={styles.inputField}
                            />
                        </>
                    )}
                    {(fieldToEdit === 'email' || fieldToEdit === 'password') && (
                        <>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className={styles.inputField}
                            />
                        </>
                    )}
                    <div className={styles.inputUnderline}></div>
                    <button className={styles.forgetPasswordButton} type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileInfo;
