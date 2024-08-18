/**
 * A React component that redirects authenticated users to the home page if they are verified.
 * @example
 * <RedirectRoute>
 *   <ProtectedContent />
 * </RedirectRoute>
 */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const RedirectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated && user?.isVerified)
    return <Navigate to="/login" replace />;
  if (isAuthenticated && !user?.isVerified)
    return <Navigate to="/verify/email" replace />;
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;
  return children;
};

export default RedirectRoute;
