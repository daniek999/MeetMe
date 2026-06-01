// src/modules/dashboard/components/SocialEditor.tsx
import { useState, useEffect } from "react";
import {
  getSocialService,
  updateSocialService,
} from "../services/social.service.js";

const SOCIAL_FIELDS = [
  { name: "youtubeUrl", label: "YouTube" },
  { name: "twitterUrl", label: "Twitter/X" },
  { name: "patreonUrl", label: "Patreon" },
  { name: "discordUrl", label: "Discord" },
  { name: "instagramUrl", label: "Instagram" },
  { name: "twitchUrl", label: "Twitch" },
  { name: "linkedinUrl", label: "LinkedIn" },
  { name: "websiteUrl", label: "Website" },
] as const;
type SocialForm = Record<(typeof SOCIAL_FIELDS)[number]["name"], string>;

export default function SocialEditor() {
  // Hooks
  const [form, setForm] = useState<SocialForm>({
    youtubeUrl: "",
    twitterUrl: "",
    patreonUrl: "",
    discordUrl: "",
    instagramUrl: "",
    twitchUrl: "",
    linkedinUrl: "",
    websiteUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  useEffect(() => {
    const load = async () => {
      try {
        const social = await getSocialService();
        setForm({
          youtubeUrl: social.youtubeUrl ?? "",
          twitterUrl: social.twitterUrl ?? "",
          patreonUrl: social.patreonUrl ?? "",
          discordUrl: social.discordUrl ?? "",
          instagramUrl: social.instagramUrl ?? "",
          twitchUrl: social.twitchUrl ?? "",
          linkedinUrl: social.linkedinUrl ?? "",
          websiteUrl: social.websiteUrl ?? "",
        });
      } catch {
        setError("Failed to load social links");
      }
    };
    load();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Enviar null para campos vacíos para limpiarlos en BD
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v.trim() === "" ? null : v]),
      );
      await updateSocialService(payload);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {/* @youtubeUrl, @twitterUrl, @patreonUrl, @discordUrl, @instagramUrl, @twitchUrl, @linkedinUrl, @websiteUrl */}
      {SOCIAL_FIELDS.map(({ name, label }) => (
        <div className="d-flex flex-column gap-1" key={name}>
          <label className="form-label small mb-0">{label}</label>
          <input
            type="url"
            name={name}
            className="ipt form-control-plaintext px-3 py-1 rounded"
            placeholder={`https://...`}
            value={form[name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <hr className="hr-surface my-0" />
      {/* #error, !submit */}
      <div className="d-flex flex-row flex-wrap align-items-center gap-3">
        {error && (
          <p className="fg-error mb-0">Error al guardar los cambios. {error}</p>
        )}
        {success && (
          <p className="fg-success mb-0">Cambios guardados correctamente.</p>
        )}
        <button
          type="submit"
          className="sw sw-primary px-3 py-1 rounded ms-auto"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2" />
          ) : null}
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
