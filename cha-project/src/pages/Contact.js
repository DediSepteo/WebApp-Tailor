import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState('');

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setResponseMessage(result.message); // Success message
                setError('');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                }); // Clear form
            } else {
                setResponseMessage('');
                setError(result.error || 'Failed to send message');
            }
        } catch (err) {
            setResponseMessage('');
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>Contact Us</div>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputTitle}>
                    <span>Name</span>
                    <p>*</p>
                </div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
                <div className={styles.inputTitle}>
                    <span>Subject</span>
                    <p>*</p>
                </div>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                />
                <div className={styles.inputTitle}>
                    <span>Message</span>
                    <p>*</p>
                </div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={styles.textArea}
                />
                <button className={styles.submitButton} type="submit">
                    Submit
                </button>
            </form>
            {/* Display response or error message */}
            {responseMessage && <div className={styles.successMessage}>{responseMessage}</div>}
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};
