import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // not logged in at all — send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // logged in, but wrong role for this route — send to their correct home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "admin" ? "/admin/candidates" : "/jobs"} replace />;
  }

  // logged in and allowed — show the actual page
  return children;
}

export default ProtectedRoute;