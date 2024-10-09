import { useContext } from 'react';
import { Navigate, Outlet, } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';



const PrivateRoute = () => {
  const loginContext = useContext(LoginContext);
    const { isLogin } = loginContext;

  const isAuthenticated = () => {
    return isLogin === true;
  };

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/"/>
  );
};

export default PrivateRoute;