// src/modules/profile/pages/PublicProfilePage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store.js";
import ProfileCard from "../components/ProfileCard.js";
import type { InteractionStatus, PublicUser } from "../../../types/index.js";
import {
  getInteractionStatusService,
  getPublicProfileService,
  shareService,
  toggleFollowService,
  toggleLikeService,
} from "../services/profile.services.js";

const PublicProfilePage = () => {
  // Hooks
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { isAuthenticated, user: authUser } = useAuthStore();
  const [profile, setProfile] = useState<PublicUser | null>(null);
  const [interaction, setInteraction] = useState<InteractionStatus | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isOwn = authUser?.username === username;

  // Handlers
  useEffect(() => {
    if (!username) return;

    const load = async () => {
      try {
        const data = await getPublicProfileService(username);
        setProfile(data);

        // Cargar estado de interacción si está autenticado y no es su propio perfil
        if (isAuthenticated && authUser?.username !== username) {
          const status = await getInteractionStatusService(data.id);
          setInteraction(status);
        }
      } catch {
        setError("Profile not found");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [username, isAuthenticated, authUser]);
  const handleLike = async () => {
    if (!profile) return;
    const result = await toggleLikeService(profile.id);
    setInteraction((prev) => (prev ? { ...prev, liked: result.active } : prev));
    setProfile((prev) =>
      prev?.statistic
        ? {
            ...prev,
            statistic: {
              ...prev.statistic,
              likes: prev.statistic.likes + (result.active ? 1 : -1),
            },
          }
        : prev,
    );
  };
  const handleFollow = async () => {
    if (!profile) return;
    const result = await toggleFollowService(profile.id);
    setInteraction((prev) =>
      prev ? { ...prev, followed: result.active } : prev,
    );
    setProfile((prev) =>
      prev?.statistic
        ? {
            ...prev,
            statistic: {
              ...prev.statistic,
              follows: prev.statistic.follows + (result.active ? 1 : -1),
            },
          }
        : prev,
    );
  };
  const handleShare = async () => {
    if (!profile) return;
    const updatedStatistic = await shareService(profile.id);
    await navigator.clipboard.writeText(window.location.href);
    setProfile((prev) =>
      prev ? { ...prev, statistic: updatedStatistic } : prev,
    );
  };

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
  return (
    <ProfileCard
      profile={profile}
      interaction={interaction}
      isOwn={isOwn}
      isAuthenticated={isAuthenticated}
      onLike={handleLike}
      onFollow={handleFollow}
      onShare={handleShare}
    />
  );
};

export default PublicProfilePage;
