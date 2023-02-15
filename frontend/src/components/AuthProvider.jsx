import { useState, useCallback } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(currentUser ? currentUser : null);

    const logIn = useCallback((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }, []);

    const logOut = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
    }, []);

    const getAuthHeaders = () => ({
        headers: { 'Authorization': `Bearer ${user.token}` }
    });

    return (
        <AuthContext.Provider value={{ user, logIn, logOut, getAuthHeaders }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;