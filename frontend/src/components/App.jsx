import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from "./pages/LoginPage";
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from "./pages/NotFoundPage";
import AuthContext from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute'
import { useCallback } from 'react';
const App = () => {
    const [user, setUser] = useState(null);
    const logIn = useCallback((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(true);
    }, []);
    return (
        <>
<<<<<<< HEAD
            <AuthContext.Provider value={{ user, logIn }}>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path='/' element={<MainPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </AuthContext.Provider>
=======
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/sign-up' element={<SignUpPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
>>>>>>> cf21866345f2bf1c11e3e592e67884498ea10845
        </>
    );
};

export default App;
