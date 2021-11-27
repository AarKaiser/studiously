import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Redirect exact to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
