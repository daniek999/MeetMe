// src/modules/dashboard/pages/DashboardPage.tsx
import { useState } from "react";
import { useAuthStore } from "../../../store/auth.store.js";
import { useNavigate } from "react-router-dom";
import ProfileEditor from "../components/ProfileEditor.js";
import SocialEditor from "../components/SocialEditor.js";
import ThemeEditor from "../components/ThemeEditor.js";

type Tab = "Perfil" | "Social" | "Tema";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Perfil");
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <section className="min-vh-100 d-flex flex-column bg-depth">
      {/* Header */}
      <header className="position-sticky top-0 z-1 py-2">
        <div className="container d-flex flex-row align-items-center">
          <h3 className="mb-0 fg-neutral">Dashboard</h3>
          <div className="ms-auto d-flex flex-row align-items-center gap-3">
            <p className="mb-0 fg-partial">@{user?.username}</p>
            <a
              className="lk lk-primary"
              onClick={() => navigate(`/meet/${user?.username}`)}
            >
              Perfil
            </a>
            <a className="lk lk-danger" onClick={handleLogout}>
              Cerrar Sesión
            </a>
          </div>
        </div>
      </header>
      {/* Contenido */}
      <div
        className="container d-flex flex-column gap-3 py-5 flex-grow-1"
        style={{ maxWidth: 720 }}
      >
        {/* Tabs */}
        <div className="d-flex flex-row gap-3 align-items-center">
          {(["Perfil", "Social", "Tema"] as Tab[]).map((tab) => (
            <button
              key={tab}
              className={`lk lk-primary bg-surface rounded-0 border-0 py-1 px-3 rounded-1 ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Panel activo */}
        <div className="bg-surface p-3 rounded">
          {activeTab === "Perfil" && <ProfileEditor />}
          {activeTab === "Social" && <SocialEditor />}
          {activeTab === "Tema" && <ThemeEditor />}
        </div>
      </div>
      {/* Navbar */}
      <footer className="position-sticky bottom-0 z-1 py-2">
        <div className="container d-flex flex-row align-items-center">
          <p className=" mb-0 small fg-partial">© MeetMe 2026</p>
          <a className="lk lk-primary ms-auto" href="#">
            Changelog
          </a>
        </div>
      </footer>
    </section>
  );
};

export default DashboardPage;
