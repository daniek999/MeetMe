// src/modules/dashboard/pages/DashboardPage.tsx
import { useState } from "react";
import ProfileEditor from "../components/ProfileEditor.js";
import SocialEditor from "../components/SocialEditor.js";
import ThemeEditor from "../components/ThemeEditor.js";

export default function DashboardPage() {
  // Hooks
  const [activeTab, setActiveTab] = useState<"Perfil" | "Social" | "Tema">(
    "Perfil",
  );

  // Renders
  return (
    <main
      className="container d-flex flex-column gap-3 py-5 flex-grow-1"
      style={{ maxWidth: 720 }}
    >
      {/* Tabs */}
      <div className="d-flex flex-row gap-3 align-items-center">
        <a
          className={`lk lk-secondary rounded-0 border-0 rounded-1 ${
            activeTab === "Perfil" ? "lk-active" : ""
          }`}
          onClick={() => setActiveTab("Perfil")}
        >
          Perfil <i className="ri-user-settings-fill"></i>
        </a>

        <a
          className={`lk lk-secondary rounded-0 border-0 rounded-1 ${
            activeTab === "Social" ? "lk-active" : ""
          }`}
          onClick={() => setActiveTab("Social")}
        >
          Social <i className="ri-global-fill"></i>
        </a>

        <a
          className={`lk lk-secondary rounded-0 border-0 rounded-1 ${
            activeTab === "Tema" ? "lk-active" : ""
          }`}
          onClick={() => setActiveTab("Tema")}
        >
          Tema <i className="ri-paint-brush-fill"></i>
        </a>
      </div>
      <hr className="hr-surface my-0" />
      {/* Panel */}
      {activeTab === "Perfil" && <ProfileEditor />}
      {activeTab === "Social" && <SocialEditor />}
      {activeTab === "Tema" && <ThemeEditor />}
    </main>
  );
}
