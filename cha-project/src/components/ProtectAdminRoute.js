import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectAdminRoute = ({ element }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            navigate('/admin/login'); // Redirect to login if no token
        }
    }, [navigate]);

    const token = sessionStorage.getItem('authToken');
    return token ? element : null; // Render the protected component if authorized
};

export default ProtectAdminRoute;
