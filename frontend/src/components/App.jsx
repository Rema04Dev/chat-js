import { Routes, Route } from 'react-router-dom';
import { MainPage, LoginPage, SignUpPage, NotFoundPage } from './pages'
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthProvider';
import ChatHeader from './ChatHeader.jsx';
const App = () => {
    return (
        <>
            <AuthProvider>
                <ChatHeader />
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path='/' element={<MainPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </AuthProvider>
        </>
    );
};

export default App;
