import React, { useState, useEffect } from 'react';
import styles from '../styles/EditProfileInfo.module.css';
import { IoClose } from "react-icons/io5";

const EditProfileInfo = ({ isVisible, onClose, fieldToEdit, initialValue, userId }) => {
    const [value, setValue] = useState(initialValue || '');
    const [mouseDownInside, setMouseDownInside] = useState(false);

    // Determine title and input type based on the field being edited
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

    // Update the input value whenever initialValue changes
    useEffect(() => {
        if (isVisible) {
            setValue(initialValue || '');
        }
    }, [initialValue, fieldToEdit, isVisible]);

    const handleMouseDown = (e) => {
        // Check if the mouse is down inside the popup content
        if (e.target.closest(`.${styles.popupContent}`)) {
            setMouseDownInside(true);
        } else {
            setMouseDownInside(false);
        }
    };

    const handleMouseUp = (e) => {
        // Close popup only if mouseDown was outside and mouseUp is also outside
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

        try {
            const payload = { [fieldToEdit]: value };
            console.log("Payload:", payload);

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
                    <input
                        type={inputType}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                        className={styles.inputField}
                    />
                    <div className={styles.inputUnderline}></div>
                    <button className={styles.forgetPasswordButton} type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileInfo;
