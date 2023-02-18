import { Routes, Route } from 'react-router-dom';
import { MainPage, LoginPage, SignUpPage, NotFoundPage } from './pages'
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthProvider';
import SocketProvider from './SocketProvider';
import ChatHeader from './pages/blocks/ChatHeader.jsx';
const App = () => {
    return (
        <>
            <AuthProvider>
                <SocketProvider>
                    <ChatHeader />
                    <Routes>
                        <Route element={<PrivateRoute />}>
                            <Route path='/' element={<MainPage />} />
                        </Route>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/signup' element={<SignUpPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </SocketProvider>

            </AuthProvider>
        </>
    );
};

export default App;
