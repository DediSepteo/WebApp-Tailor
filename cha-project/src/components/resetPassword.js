import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Authentication.module.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // We will use this token to identify the reset request
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing reset token.");
        }
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/reset-org-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Password reset successfully. Redirecting to login...");
                setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
            } else {
                setError(data.error || "Failed to reset password.");
            }
        } catch (err) {
            console.error("Error resetting password:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.formContainer}>
                <p className={styles.title}>Reset Organization's Password</p>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {message && <p className={styles.successMessage}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <input
                            type="password"
                            value={password}
                            placeholder="New Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm New Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <button
                        className={styles.submitButton}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
