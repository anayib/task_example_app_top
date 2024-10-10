import { Navigate } from "react-router-dom";

function ProtectedRoute({element}) {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return isAuthenticated ? element : <Navigate to='/login' />
}

export default ProtectedRoute;