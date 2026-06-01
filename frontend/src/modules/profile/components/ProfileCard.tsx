// src/modules/profile/components/ProfileCard.tsx
import type { InteractionStatus, PublicUser } from "../../../types";

interface Props {
  profile: PublicUser;
  interaction: InteractionStatus | null;
  isOwn: boolean;
  isAuthenticated: boolean;
  onLike: () => void;
  onFollow: () => void;
  onShare: () => void;
}

export default function ProfileCard({
  profile,
  interaction,
  isOwn,
  isAuthenticated,
  onLike,
  onFollow,
  onShare,
}: Props) {
  const { statistic, social, theme } = profile;

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundColor: theme?.backgroundColor ?? "#ffffff",
        color: theme?.primaryColor ?? "#000000",
      }}
    >
      {/* Banner */}
      <div
        className="w-100"
        style={{
          height: 200,
          backgroundImage: profile.bannerUrl
            ? `url(${profile.bannerUrl})`
            : "none",
          backgroundColor: theme?.primaryColor ?? "#000000",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="container py-4 d-flex flex-column gap-4"
        style={{ maxWidth: 720 }}
      >
        {/* Avatar + info */}
        <div className="d-flex gap-3">
          <img
            src={
              profile.avatarUrl ??
              `https://ui-avatars.com/api/?name=${profile.username}&size=96`
            }
            alt={profile.username}
            className="rounded"
            width={154}
            height={154}
            style={{ objectFit: "cover" }}
          />
          <div className="d-flex flex-column gap-3 mb-0">
            <div className="d-flex flex-column">
              <h4 className="fw-bold mb-0">
                {profile.displayName ?? `@${profile.username}`}
              </h4>
              <p className="mb-0 small">@{profile.username}</p>
            </div>
            {profile.bio && <p className="mb-0">{profile.bio}</p>}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="d-flex gap-4 mb-0">
          <p className="d-flex flex-row align-items-center gap-2 mb-0">
            {statistic?.likes ?? 0}
            <i className="ri-star-fill"></i>
          </p>
          <p className="d-flex flex-row align-items-center gap-2 mb-0">
            <span>{statistic?.follows ?? 0}</span>
            <i className="ri-team-fill"></i>
          </p>
          <p className="d-flex flex-row align-items-center gap-2 mb-0">
            <span>{statistic?.views ?? 0}</span>
            <i className="ri-eye-fill"></i>
          </p>
          <p className="d-flex flex-row align-items-center gap-2 mb-0">
            <span>{statistic?.shares ?? 0}</span>
            <i className="ri-share-fill"></i>
          </p>
        </div>

        {/* Acciones — solo si no es el dueño */}
        {!isOwn && (
          <div className="d-flex flex-row align-items-center gap-2">
            {isAuthenticated ? (
              <div className="d-flex flex-row flex-wrap gap-3">
                <button
                  className={`btn btn-sm ${interaction?.liked ? "btn-danger" : "btn-outline-secondary"}`}
                  onClick={onLike}
                >
                  {interaction?.liked ? "Conocido" : "Conocer"}
                </button>
                <button
                  className={`btn btn-sm ${interaction?.followed ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={onFollow}
                >
                  {interaction?.followed ? "Siguiendo" : "Seguir"}
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={onShare}
                >
                  Compartir
                </button>
              </div>
            ) : (
              <small className="fst-italic">
                <a href="/login" style={{ textDecoration: "none" }}>
                  Inicia Sesión
                </a>{" "}
                para interactuar y probar caracteristicas!
              </small>
            )}
          </div>
        )}

        {/* Contenido */}
        {profile.content && (
          <div
            className="m-0"
            dangerouslySetInnerHTML={{ __html: profile.content }}
          />
        )}

        {/* Redes Sociales */}
        {social && (
          <div className="d-flex flex-wrap gap-3">
            {social.youtubeUrl && (
              <a
                href={social.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="fs-5 d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 32,
                  height: 32,
                  background: theme?.primaryColor ?? "#000000",
                  color: theme?.backgroundColor ?? "#FFFFFF",
                  textDecoration: "none",
                }}
              >
                <i className="ri-youtube-fill"></i>
              </a>
            )}
            {social.twitterUrl && (
              <a
                href={social.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-dark"
              >
                Twitter/X
              </a>
            )}
            {social.patreonUrl && (
              <a
                href={social.patreonUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-warning"
              >
                Patreon
              </a>
            )}
            {social.discordUrl && (
              <a
                href={social.discordUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                Discord
              </a>
            )}
            {social.instagramUrl && (
              <a
                href={social.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-danger"
              >
                Instagram
              </a>
            )}
            {social.twitchUrl && (
              <a
                href={social.twitchUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-secondary"
              >
                Twitch
              </a>
            )}
            {social.linkedinUrl && (
              <a
                href={social.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                LinkedIn
              </a>
            )}
            {social.websiteUrl && (
              <a
                href={social.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="fs-5 d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 32,
                  height: 32,
                  background: theme?.primaryColor ?? "#000000",
                  color: theme?.backgroundColor ?? "#FFFFFF",
                  textDecoration: "none",
                }}
              >
                <i className="ri-briefcase-4-fill"></i>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
