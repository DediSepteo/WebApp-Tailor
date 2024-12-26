import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';


export const OrderCompleted = () => {

    const [isTokenValid, setIsTokenValid] = useState(false)
    const [countdown, setCountdown] = useState(4)

    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        if (!token) {
            navigate("/home")
        }
        else {
            const decodedToken = jwtDecode(token)
            const { org_id, source } = decodedToken
            if (!org_id || !source) {
                navigate('/home')
            }
            else {
                setIsTokenValid(true)
            }
        }
    }, [])

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            navigate("/home");
        }
    }, [countdown])



    return (
        isTokenValid && (
            <main style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                <div style={{ textAlign: "center", backgroundColor: "#d0e0e0", padding: "7% 2%" }}>
                    <img src={require('../assets/tick.png')}></img>
                    <h1>Order Placed Successfully!</h1>
                    <p>Thank you for your purchase. Redirecting you to the home page in {countdown} seconds...</p>
                    <Link to='/home'>Go Back to Home</Link>
                </div>
            </main >
        )
    );
};