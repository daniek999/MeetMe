// src/layouts/DashboardLayout.tsx
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function DashboardLayout() {
  // Hooks
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  // Handlers
  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  // Renders
  return (
    <section className="min-vh-100 d-flex flex-column">
      <header className="header-container py-2">
        <div className="container d-flex flex-row align-items-center gap-3">
          <h2 className="mb-0 fg-neutral me-auto">
            Meet<span className="fg-gradient">Me</span>
          </h2>
          <Link
            className="lk lk-primary"
            to={`/meet/${user?.username}`}
            target="_blank"
          >
            {user?.username} <i className="ri-external-link-line"></i>
          </Link>
          <a className="lk lk-primary" onClick={handleLogout}>
            Salir <i className="ri-logout-box-r-line"></i>
          </a>
        </div>
      </header>
      <Outlet />
      <footer className="footer-container py-2">
        <div className="container d-flex flex-row align-items-center gap-3">
          <small className="mb-0 fg-partial text-center w-100">
            <i className="ri-copyright-line"></i> MeetMe 2026
          </small>
        </div>
      </footer>
    </section>
  );
}
