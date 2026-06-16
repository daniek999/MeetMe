// src/modules/dashboard/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import ProfileEditor from "../components/ProfileEditor";
import SocialEditor from "../components/SocialEditor";
import ThemeEditor from "../components/ThemeEditor";
import { useAuthStore } from "../../../store/auth.store";
import { apiProfileService } from "../services/profile.api";

export default function DashboardPage() {
  // Hooks
  const { getMyProfileService } = apiProfileService();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"Perfil" | "Social" | "Tema">(
    "Perfil",
  );
  const [stat, setStats] = useState({
    follows: 0,
    likes: 0,
    shares: 0,
    views: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const user = await getMyProfileService();
        setStats({
          follows: user.statistic?.follows ?? 0,
          likes: user.statistic?.likes ?? 0,
          shares: user.statistic?.shares ?? 0,
          views: user.statistic?.views ?? 0,
        });
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renders
  if (loading) {
    return (
      <main
        className="container d-flex flex-column gap-1 py-5 flex-grow-1 justify-content-center align-items-center"
        style={{ maxWidth: 720 }}
      >
        <div className="spinner-border" />
        <p className="mb-0">Cargando...</p>
      </main>
    );
  }
  if (error) {
    return (
      <main
        className="container d-flex flex-column gap-3 py-5 flex-grow-1 justify-content-center"
        style={{ maxWidth: 720 }}
      >
        <p className="mb-0 text-center fg-error">Error: {error}</p>
      </main>
    );
  }
  return (
    <main
      className="container d-flex flex-column gap-3 py-5 flex-grow-1"
      style={{ maxWidth: 720 }}
    >
      {/* Title */}
      <div className="d-flex flex-column gap-0">
        <h3 className="mb-0">Dashboard</h3>
        <p className="mb-0 fg-partial">
          Bienvenido a tu panel{" "}
          <span className="fg-primary">{user?.username}</span>, aqui podras
          cofigurarlo todo.
        </p>
      </div>
      <hr className="hr-surface my-0" />
      {/* Stats */}
      <div className="d-flex flex-row flex-wrap gap-3">
        <div className="d-flex flex-column flex-grow-1 bdr-surface p-3 py-1">
          <small className="mb-0 fg-partial">Seguidores</small>
          <p className="mb-0 fs-5">{stat.follows}</p>
        </div>
        <div className="d-flex flex-column flex-grow-1 bdr-surface p-3 py-1">
          <small className="mb-0 fg-partial">Likes</small>
          <p className="mb-0 fs-5">{stat.likes}</p>
        </div>
        <div className="d-flex flex-column flex-grow-1 bdr-surface p-3 py-1">
          <small className="mb-0 fg-partial">Compartidos</small>
          <p className="mb-0 fs-5">{stat.shares}</p>
        </div>
        <div className="d-flex flex-column flex-grow-1 bdr-surface p-3 py-1">
          <small className="mb-0 fg-partial">Vistas</small>
          <p className="mb-0 fs-5">{stat.views}</p>
        </div>
      </div>
      <hr className="hr-surface my-0" />
      {/* Tabs */}
      <div className="d-flex flex-column gap-3 bdr-surface p-3">
        <div className="d-flex flex-row gap-3 align-items-start">
          <a
            className={`lk lk-primary rounded-0 border-0 rounded-1 ${
              activeTab === "Perfil" ? "lk-active" : ""
            }`}
            onClick={() => setActiveTab("Perfil")}
          >
            Perfil <i className="ri-user-settings-fill"></i>
          </a>
          <a
            className={`lk lk-primary rounded-0 border-0 rounded-1 ${
              activeTab === "Social" ? "lk-active" : ""
            }`}
            onClick={() => setActiveTab("Social")}
          >
            Social <i className="ri-global-fill"></i>
          </a>
          <a
            className={`lk lk-primary rounded-0 border-0 rounded-1 ${
              activeTab === "Tema" ? "lk-active" : ""
            }`}
            onClick={() => setActiveTab("Tema")}
          >
            Tema <i className="ri-paint-brush-fill"></i>
          </a>
        </div>
        {/* Panel */}
        {activeTab === "Perfil" && <ProfileEditor />}
        {activeTab === "Social" && <SocialEditor />}
        {activeTab === "Tema" && <ThemeEditor />}
      </div>
    </main>
  );
}
