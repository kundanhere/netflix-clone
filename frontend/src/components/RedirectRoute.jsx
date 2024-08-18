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

  // If authenticated and user is verified, redirect to home page
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RedirectRoute;
