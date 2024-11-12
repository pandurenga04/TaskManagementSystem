import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import prop-types

const PrivateRoutes = ({ children }) => {
    const location = useLocation();

    if (localStorage.getItem('user')) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace />;
};

// Add prop types for validation
PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired, // Validate children prop
};

export default PrivateRoutes;
