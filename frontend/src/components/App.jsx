import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/sign-up' element={<SignUpPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default App;
