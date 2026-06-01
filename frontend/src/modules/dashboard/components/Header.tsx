// src/modules/dashboard/components/Header.tsx
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store";

export default function Header() {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <header className="header-container position-sticky top-0 z-1 py-2">
      <div className="container d-flex flex-row align-items-center gap-3">
        <h3 className="mb-0 fg-neutral me-auto">
          Meet<span className="fg-primary">MyPanel</span>
        </h3>
        <a
          className="lk lk-primary"
          onClick={() => navigate(`/meet/${user?.username}`)}
        >
          Visualizar
        </a>
        <a className="lk lk-primary" onClick={handleLogout}>
          Salir
        </a>
      </div>
    </header>
  );
}
