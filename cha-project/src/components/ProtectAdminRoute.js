import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectAdminRoute = ({ element }) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false); // To control rendering

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            navigate('/admin/login'); // Redirect to login if no token
        } else {
            setIsAuthorized(true); // Allow rendering if token exists
        }
    }, [navigate]);

    // Render the protected component if authorized
    return isAuthorized ? element : null;
};

export default ProtectAdminRoute;
