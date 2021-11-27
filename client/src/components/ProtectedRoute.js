import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store';

const ProtectedRoute = ({ children }) => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isAuthenticated) {
    return <Redirect exact to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
