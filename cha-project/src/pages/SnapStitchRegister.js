import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/Authentication.module.css';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";

export const SnapRegister = () => {
    const [inputs, setInputs] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [encodedOrgID, setEncodedOrgID] = useState(null)


    useEffect(() => {
        let url = window.location.href;
        let urlObj = new URL(url);

        const params = new URLSearchParams(urlObj.search)
        setEncodedOrgID(params.get('t'))

        // // Remove the query string
        // let cleanUrl = url.split('?')[0];
        // window.history.replaceState({}, document.title, cleanUrl);
    }, [])


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        inputs.org_id = encodedOrgID
        try {
            const response = await fetch('http://localhost:3000/api/emp/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            alert("Sign up Successful!")
            // navigate('/Home'); // Redirect to Home page
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                <p className={styles.title}>Sign Up</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="name"
                            value={inputs.name}
                            placeholder="Name"
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                    </div>
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
                    <div className={styles.inputContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={inputs.confirmPassword}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required
                            className={styles.inputField}
                        />
                        <div className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </div>
                    </div>
                    <button className={styles.submitButton} type="submit">Continue</button>
                    <p style={{ fontFamily: 'Montserrat-Regular' }}>
                        Already have an account?
                        <Link to={`/snap/login?t=${encodedOrgID}`} className={styles.anchor} style={{ marginLeft: '4px', fontWeight: 'bold' }}>Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
