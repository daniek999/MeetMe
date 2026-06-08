/* eslint-disable @typescript-eslint/no-unused-vars */
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
    <main
      className="container d-flex flex-column justify-content-center gap-4 flex-grow-1"
      style={{
        maxWidth: 720,
        fontFamily: profile.theme?.fontFamily,
      }}
    >
      {/* Banner */}
      <div
        className="position-relative rounded"
        style={{
          height: 360,
          backgroundImage: profile.bannerUrl
            ? `url(${profile.bannerUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Avatar */}
        <img
          src={
            profile.avatarUrl ??
            `https://ui-avatars.com/api/?name=${profile.username}&size=96`
          }
          alt={profile.username}
          className="rounded-circle position-absolute"
          width={96}
          height={96}
          style={{
            top: 16,
            right: 16,
            border: `8px solid ${theme?.backgroundColor}`,
            objectFit: "cover",
          }}
        />
        {/* Información */}
        <div
          className="position-absolute text-white p-3"
          style={{
            left: 0,
            bottom: 0,
            maxWidth: "100%",
          }}
        >
          <h4 className=" mb-0 fw-bold">
            {profile.displayName ?? `@${profile.username}`}
          </h4>
          <p className="mb-0 small fg-partial">
            {statistic?.views ?? 0} personas ya lo han encontrado
          </p>
          <p className="mb-0 small">{profile?.bio}</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="d-flex flex-row justify-content-center gap-2">
        <a
          className={`lk lk-primary rounded-pill small ${interaction?.liked ? "lk-active" : ""}`}
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
          onClick={onLike}
        >
          {statistic?.likes ?? 0} likes
        </a>
        <span className="small">•</span>
        <a
          className={`lk lk-primary rounded-pill small ${interaction?.followed ? "lk-active" : ""}`}
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
          onClick={onFollow}
        >
          {statistic?.follows ?? 0} seguidores
        </a>
        <span className="small">•</span>
        <a
          className={`lk lk-primary rounded-pill small`}
          style={{
            textDecoration: "none",
            cursor: "pointer",
          }}
          onClick={onShare}
        >
          {statistic?.shares ?? 0} compartidos
        </a>
      </div>

      {/* Contenido */}
      <div className="d-flex flex-column gap-0">
        {profile.content && (
          <div
            className="m-0"
            dangerouslySetInnerHTML={{ __html: profile.content }}
          />
        )}
      </div>

      {/* Sociales */}
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {social?.youtubeUrl && (
          <a
            href={social.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="lk lk-primary"
          >
            <i className="ri-youtube-fill"></i>
          </a>
        )}
        {social?.twitterUrl && (
          <a
            href={social.twitterUrl}
            target="_blank"
            rel="noreferrer"
            className="lk lk-primary"
          >
            <i className="ri-twitter-x-fill"></i>
          </a>
        )}
        {social?.patreonUrl && (
          <a
            href={social.patreonUrl}
            target="_blank"
            rel="noreferrer"
            className="lk lk-primary"
          >
            <i className="ri-patreon-fill"></i>
          </a>
        )}
        {social?.discordUrl && (
          <a
            href={social.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="lk lk-primary"
          >
            <i className="ri-discord-fill"></i>
          </a>
        )}
        {social?.instagramUrl && (
          <a
            href={social.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="lk lk-primary"
          >
            <i className="ri-instagram-fill"></i>
          </a>
        )}
        {social?.twitchUrl && (
          <a
            href={social.twitchUrl}
            target="_blank"
            rel="noreferrer"
            className="lk lk-primary"
          >
            <i className="ri-twitch-fill"></i>
          </a>
        )}
        {social?.linkedinUrl && (
          <a
            href={social.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="lk lk-primary"
          >
            <i className="ri-linkedin-fill"></i>
          </a>
        )}
        {social?.websiteUrl && (
          <a
            href={social.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="lk lk-primary"
          >
            <i className="ri-briefcase-4-fill"></i>
          </a>
        )}
      </div>
    </main>
  );
}
