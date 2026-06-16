// src/modules/dashboard/components/ProfileEditor.tsx
import { apiProfileService } from "../services/profile.api";
import { FormButton, FormInput } from "../../_common/FormComponents";
import { useState, useEffect } from "react";

export default function ProfileEditor() {
  // Hooks
  const { getMyProfileService, updateProfileService } = apiProfileService();
  const [form, setForm] = useState({
    displayName: "",
    bio: "",
    content: "",
    avatarUrl: "",
    bannerUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  useEffect(() => {
    const load = async () => {
      try {
        const user = await getMyProfileService();
        setForm({
          displayName: user.displayName ?? "",
          bio: user.bio ?? "",
          content: user.content ?? "",
          avatarUrl: user.avatarUrl ?? "",
          bannerUrl: user.bannerUrl ?? "",
        });
      } catch {
        setError("Failed to load profile");
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateProfileService({ ...form });
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
      {/* @displayname */}
      <FormInput
        label="Nombre Público"
        caption="El nombre que aparecerá en tu perfil."
        constraint={`${form.displayName.length}/100`}
        name="displayName"
        type="text"
        maxLength={100}
        value={form.displayName}
        onChange={handleChange}
      />

      {/* @bio */}
      <FormInput
        label="Biografía"
        caption="Escribe lo más resaltante de ti."
        constraint={`${form.bio.length}/255`}
        name="bio"
        type="textarea"
        maxLength={255}
        rows={3}
        value={form.bio}
        onChange={handleChange}
      />

      {/* @avatarUrl */}
      <FormInput
        label="Avatar URL"
        caption="Ingresa tu enlace de referencia."
        constraint=".gif | .png | .jpg | .webp"
        name="avatarUrl"
        type="url"
        value={form.avatarUrl}
        onChange={handleChange}
      />

      {/* @bannerUrl */}
      <FormInput
        label="Banner URL"
        caption="Ingresa tu enlace de referencia."
        constraint=".gif | .png | .jpg | .webp"
        name="bannerUrl"
        type="url"
        value={form.bannerUrl}
        onChange={handleChange}
      />

      {/* @content */}
      <FormInput
        label="Contenido"
        caption="Escribe y cuéntanos sobre ti (Markdown o HTML)."
        constraint={`${form.content.length}/5000`}
        name="content"
        type="textarea"
        maxLength={5000}
        rows={8}
        value={form.content}
        onChange={handleChange}
      />

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
