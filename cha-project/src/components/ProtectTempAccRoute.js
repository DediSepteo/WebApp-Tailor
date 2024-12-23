import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const ProtectTempAccRoute = ({ element }) => {
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token')
        const decodedToken = jwtDecode(token);
        const source = decodedToken.source
        if (!token) {
            navigate('/home'); // Redirect to login if no token
        }
        else if (source != "organization") {
            navigate('/home');
        }
        else {
            setIsAllowed(true)
        }
    }, [navigate]);
    return isAllowed ? element : null; // Render the protected component if authorized
};

export default ProtectTempAccRoute;
