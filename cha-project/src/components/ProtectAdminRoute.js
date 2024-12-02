import { useNavigate } from 'react-router-dom';

const ProtectAdminRoute = ({ element }) => {
    const navigate = useNavigate();

    const token = sessionStorage.getItem('authToken');

    if (!token)
        navigate('/admin/login'); // Redirect to login if no token
    else
        return element

    // // Render the protected component if authorized
    // return isAuthorized ? element : null;
};

export default ProtectAdminRoute;
