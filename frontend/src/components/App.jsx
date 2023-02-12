import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, LoginPage, SignUpPage, NotFoundPage } from './pages'
import AuthContext from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

const App = () => {
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

    return (
        <>
            <AuthContext.Provider value={{ user, logIn, logOut }}>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path='/' element={<MainPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </AuthContext.Provider>
        </>
    );
};

export default App;
