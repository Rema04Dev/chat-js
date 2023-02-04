import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, LoginPage, SignUpPage, NotFoundPage } from './pages'
import AuthContext from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

const App = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(currentUser ? { username: currentUser.user } : null);
    const logIn = useCallback((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }, []);
    return (
        <>
            <AuthContext.Provider value={{ user, logIn }}>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path='/' element={<MainPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/sign-up' element={<SignUpPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </AuthContext.Provider>
        </>
    );
};

export default App;
