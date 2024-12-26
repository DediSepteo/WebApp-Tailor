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
            {/* Left Section */}
            <div className={styles.leftSection}>
                <h2>Get in Touch</h2>
                <p className = {styles.p}>
                    Are you interested in partnering with us to onboard your company uniforms,
                    or would you like to learn more about our services? Our dedicated sales team
                    is here to assist you with any inquiries or provide detailed information
                    tailored to your needs. Reach out to us today, and we’ll respond promptly
                    to help you take the next step.
                </p>
            </div>

            {/* Right Section (Form) */}
            <div className={styles.rightSection}>
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Subject *</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Message *</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className={styles.textArea}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Submit
                    </button>
                </form>
                {/* Response or Error Message */}
                {responseMessage && <div className={styles.successMessage}>{responseMessage}</div>}
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        </div>
    );
};
