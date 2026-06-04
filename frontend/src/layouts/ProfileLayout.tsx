import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PublicUser } from "../types";
import { getPublicProfileService } from "../modules/profile/services/profile.services";

export default function ProfileLayout() {
  // Hooks
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  useEffect(() => {
    if (!username) return;

    const load = async () => {
      try {
        const data = await getPublicProfileService(username);
        setProfile(data);
      } catch {
        setError("Profile not found");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [username]);

  // Renders
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" />
      </div>
    );
  }
  if (error || !profile) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center gap-3">
        <h5 className="text-muted">Profile not found</h5>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => navigate("/")}
        >
          Go home
        </button>
      </div>
    );
  }

  // Renders
  return (
    <section
      className="min-vh-100 d-flex flex-column"
      style={{
        background: profile.theme?.backgroundColor,
        color: profile.theme?.primaryColor,
      }}
    >
      <header
        className="header-container position-sticky top-0 z-1 py-2"
        style={{
          borderBottom: `1px solid ${profile.theme?.backgroundColor}`,
        }}
      >
        <div className="container d-flex flex-row align-items-center gap-3">
          <h2 className="mb-0 fg-neutral me-auto">
            <span
              style={{
                color: ` ${profile.theme?.primaryColor}`,
              }}
            >
              Meet
            </span>
            <span className="fg-gradient">{profile.displayName}</span>
          </h2>
        </div>
      </header>

      <Outlet />

      <footer
        className="footer-container position-sticky bottom-0 z-1 py-2"
        style={{
          borderBottom: `1px solid ${profile.theme?.backgroundColor}`,
        }}
      >
        <div className="container d-flex flex-row align-items-center gap-2">
          <small className="mb-0 fg-partial">© MeetMe 2026</small>
          <a className="lk lk-primary ms-auto small" href="#">
            Changelog <i className="ri-hourglass-fill"></i>
          </a>
        </div>
      </footer>
    </section>
  );
}
