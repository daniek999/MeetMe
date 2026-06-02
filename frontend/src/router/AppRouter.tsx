// src/router/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import LoginPage from "../modules/auth/pages/LoginPage.js";
import RegisterPage from "../modules/auth/pages/RegisterPage.js";
import DashboardPage from "../modules/dashboard/pages/DashboardPage.js";
import PublicProfilePage from "../modules/profile/pages/PublicProfilePage.js";
import AuthLayout from "../layouts/AuthLayout.js";
import DashboardLayout from "../layouts/DashboardLayout.js";

const AppRouter = () => {
  return (
    <Routes>
      {/* AuthLayout - Public */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* ProfileLayout - Public */}
      <Route path="/meet/:username" element={<PublicProfilePage />} />

      {/* DashboardLayout - Private */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback - Public */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
