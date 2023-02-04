import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from "./pages/LoginPage";
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
            <AuthContext.Provider value={{ user, logIn }}>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path='/' element={<MainPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </AuthContext.Provider>
        </>
    );
};

export default App;
