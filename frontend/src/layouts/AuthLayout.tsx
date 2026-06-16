// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import "../ui/styles/layouts.css";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="animated-bg">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="position-relative min-vh-100 z-1 d-flex align-items-center justify-content-center">
        <h2 className="position-absolute top-0 start-0 p-3 mb-0 w-100">
          <i className="ri-user-smile-fill"></i> MeetMe
        </h2>
        <Outlet />
        <small className="position-absolute bottom-0 end-0 p-3 w-100 text-end">
          © MeetMe 2026
        </small>
      </div>
    </div>
  );
}
