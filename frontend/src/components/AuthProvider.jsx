import {
  useState, useCallback, useMemo,
} from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser || null);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${user.token}` },
  });

  // const getAuthHeaders = useMemo(() => ({
  // headers: { Authorization: `Bearer ${user.token}` },
  // }), [user.token]);

  // const getAuthHeaders = useCallback(() => ({
  // headers: { Authorization: `Bearer ${user.token}` },
  // }), [user.token]);

  const authValue = useMemo(() => ({
    user, logIn, logOut, getAuthHeaders,
  }), [user, logIn, logOut, getAuthHeaders]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
