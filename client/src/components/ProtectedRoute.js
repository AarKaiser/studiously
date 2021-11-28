import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../store';

const ProtectedRoute = ({ children, page }) => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isAuthenticated) {
    return (
      <Redirect
        exact
        to={`/login?fallback=${page.url}&&pageName=${page.name}`}
      />
    );
  } else {
    return children;
  }
};

export default ProtectedRoute;
