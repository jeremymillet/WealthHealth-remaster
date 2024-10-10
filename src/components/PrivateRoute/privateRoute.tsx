import { Navigate, Outlet, } from 'react-router-dom';
import useAuthContext from '../../context/hook/useAuthContext';



const PrivateRoute = () => {
  const {isLogin} = useAuthContext();
  

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