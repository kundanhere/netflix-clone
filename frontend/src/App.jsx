import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import { useAuthStore } from "./store/authStore";
import RedirectRoute from "./components/RedirectRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SingUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 
    flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectRoute>
              <SingUpPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectRoute>
              <LoginPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/verify/email"
          element={
            <RedirectRoute>
              <EmailVerificationPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/forgot/password"
          element={
            <RedirectRoute>
              <ForgotPasswordPage />
            </RedirectRoute>
          }
        />
        <Route
          path="/reset/password/:token"
          element={
            <RedirectRoute>
              <ResetPasswordPage />
            </RedirectRoute>
          }
        />
        {/* catch all routes */}
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
