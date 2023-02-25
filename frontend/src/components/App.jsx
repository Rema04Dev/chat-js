import { Routes, Route } from 'react-router-dom';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import NotFoundPage from './NotFoundPage';
import ChatHeader from './ChatHeader.jsx';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthProvider';

const App = () => (
  <AuthProvider>
    <ChatHeader />
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<ChatPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </AuthProvider>
);

export default App;
