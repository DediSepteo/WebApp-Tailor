import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Authentication.module.css';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineHome } from "react-icons/ai";
import ForgotPassword from "../components/ForgetPassword.js"

export const SnapLogin = () => {
    const [inputs, setInputs] = useState({ email: "", password: "", rememberPassword: false });
    const [showPassword, setShowPassword] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    let url = window.location.href;
    let urlObj = new URL(url);

    const params = new URLSearchParams(urlObj.search)
    const encodedOrgID = params.get('t')

    // // Remove the query string
    // let cleanUrl = url.split('?')[0];
    // window.history.replaceState({}, document.title, cleanUrl);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        inputs.encodedOrgID = encodedOrgID
        try {
            const response = await fetch('http://localhost:3000/api/login/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });

            console.log(response)
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            sessionStorage.setItem('token', data.token) || localStorage.setItem('token', data.token);// Save the token in session


            navigate('/Home'); // Redirect to Home page
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const showPopup = () => setPopupVisible(true);
    const hidePopup = () => setPopupVisible(false);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.brandContainer}>
                <p className={styles.brand}>BrandTailors<br />Co.</p>
                <p className={styles.subtitle}>- All your needs,<br />tailored just for you</p>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.homeContainer}>
                    <Link to="/Home">
                        <AiOutlineHome className={styles.homeIcon} />
                    </Link>
                    <Link to="/Home" className={styles.homeText}>Back to Home</Link>
                </div>
                <p className={styles.title}>Sign In</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.inputContainer}>
                        <input
                            type="email"
                            name="email"
                            value={inputs.email}
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={inputs.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                        <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </div>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <label>
                            <input
                                type="checkbox"
                                name="rememberPassword"
                                checked={inputs.rememberPassword}
                                onChange={handleChange}
                            />
                            Remember Password
                        </label>
                        <Link onClick={showPopup} className={styles.anchor}>
                            Forgot Password?
                        </Link>
                    </div>
                    <button className={styles.submitButton} type="submit">Sign In</button>
                    <div className={styles.separator}>or</div>
                    <button className={styles.googleButton}>
                        <FcGoogle className={styles.googleIcon} />
                        Sign In With Google
                    </button>
                    <p style={{ fontFamily: 'Montserrat-Regular' }}>
                        Don't have an account?
                        <Link to={`/snap/register?t=${encodedOrgID}`} className={styles.anchor} style={{ marginLeft: '4px', fontWeight: 'bold' }}>Sign Up</Link>
                    </p>
                </form>
                <ForgotPassword isVisible={isPopupVisible} onClose={hidePopup} />
            </div>
        </div>
    );
};