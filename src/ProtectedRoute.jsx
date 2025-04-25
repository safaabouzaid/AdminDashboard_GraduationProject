import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);


  if (!token) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;
