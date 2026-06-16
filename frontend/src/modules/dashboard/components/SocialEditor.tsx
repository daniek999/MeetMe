// src/modules/dashboard/components/SocialEditor.tsx
import { apiSocialService } from "../services/social.api";
import { FormButton, FormInput } from "../../_common/FormComponents";
import { useState, useEffect } from "react";

export default function SocialEditor() {
  // Hooks
  const { getSocialService, updateSocialService } = apiSocialService();
  const [form, setForm] = useState<{
    youtubeUrl: string;
    twitterUrl: string;
    patreonUrl: string;
    discordUrl: string;
    instagramUrl: string;
    twitchUrl: string;
    linkedinUrl: string;
    websiteUrl: string;
  }>({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
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

  // Renders
  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {/* @youtubeUrl, @twitterUrl, @patreonUrl, @discordUrl, @instagramUrl, @twitchUrl, @linkedinUrl, @websiteUrl */}
      {SOCIAL_FIELDS.map(({ name, label, caption }) => (
        <FormInput
          label={label}
          caption={caption}
          constraint=""
          name={name}
          type="url"
          value={form[name]}
          onChange={handleChange}
          key={name}
        />
      ))}
      {/* #error, !submit */}
      <div className="d-flex flex-row flex-wrap align-items-center gap-3">
        <FormButton
          label="Guardar"
          labelLoading="Guardando..."
          loading={loading}
          type="submit"
        />
        {error && <p className="fg-error mb-0">Error. {error}</p>}
        {success && <p className="fg-success mb-0">Cambios guardados.</p>}
      </div>
    </form>
  );
}

const SOCIAL_FIELDS = [
  { name: "youtubeUrl", label: "YouTube", caption: "Tus videazos del yutuz." },
  { name: "twitterUrl", label: "X", caption: "Anteriormente twitter." },
  { name: "patreonUrl", label: "Patreon", caption: "Dame dinero." },
  { name: "discordUrl", label: "Discord", caption: "..." },
  { name: "instagramUrl", label: "Instagram", caption: "Pasen IG." },
  { name: "twitchUrl", label: "Twitch", caption: "Estrims." },
  { name: "linkedinUrl", label: "LinkedIn", caption: "Chamba." },
  { name: "websiteUrl", label: "Website", caption: "Tu propia web personal." },
] as const;
