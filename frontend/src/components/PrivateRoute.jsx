import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import routes from '../utils/routes';

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to={routes.login} />;
};

export default PrivateRoute;
