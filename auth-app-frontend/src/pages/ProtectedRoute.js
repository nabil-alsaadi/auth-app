import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);

  if (!token) {
   
    return <Navigate to="/signin" />;
  }
 
  return children;
};

export default ProtectedRoute;
