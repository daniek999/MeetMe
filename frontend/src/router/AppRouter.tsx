// src/router/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import LoginPage from "../modules/auth/pages/LoginPage.js";
import RegisterPage from "../modules/auth/pages/RegisterPage.js";
import DashboardPage from "../modules/dashboard/pages/DashboardPage.js";
import PublicProfilePage from "../modules/profile/pages/PublicProfilePage.js";

const AppRouter = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/meet/:username" element={<PublicProfilePage />} />

      {/* Privadas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
