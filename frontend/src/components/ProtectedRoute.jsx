/**
 * A React component that provides protected routes for authenticated users.
 * It checks if the user is authenticated and if their email is verified.
 * If the user is not authenticated, it redirects to the login page.
 * If the user's email is not verified, it redirects to the email verification page.
 *
 * children - Components to be rendered within the protected route.
 * @example
 * <ProtectedRoute>
 *   <PrivateComponent />
 * </ProtectedRoute>
 */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  // if user is not authenticated then redirect to the login page
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // if user's email is not verified then redirect to the email verification page
  if (!user.isVerified) return <Navigate to="/verify/email" replace />;
  return children;
};

export default ProtectedRoute;
