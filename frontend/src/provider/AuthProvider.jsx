import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import prop-types

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        setUser(userInfo);
    }, []);
    
    const authInfo = {
        user,
        setUser,
    };
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

// Add prop types for validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate children prop
};

export default AuthProvider;


