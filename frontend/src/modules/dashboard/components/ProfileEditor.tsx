// src/modules/dashboard/components/ProfileEditor.tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { apiProfileService } from "../services/profile.service";
import { useState, useEffect } from "react";
import "quill/dist/quill.snow.css";

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
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column">
          <label htmlFor="displayName" className="form-label mb-0">
            Nombre Público
          </label>
          <small className="fg-partial small">
            El nombre que aparecera en tu perfil
          </small>
        </div>
        <input
          type="text"
          name="displayName"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          maxLength={100}
          value={form.displayName}
          onChange={handleChange}
        />
        <small className="fg-partial text-end">
          {form.displayName.length}/100
        </small>
      </div>

      {/* @bio */}
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column">
          <label htmlFor="bio" className="form-label mb-0">
            Biografía
          </label>
          <small className="fg-partial small">
            Escribe lo más resaltante de ti.
          </small>
        </div>
        <textarea
          name="bio"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          rows={3}
          maxLength={255}
          value={form.bio}
          onChange={handleChange}
        />
        <small className="fg-partial text-end">{form.bio.length}/255</small>
      </div>

      {/* @avatarURL */}
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column">
          <label htmlFor="avatarUrl" className="form-label mb-0">
            Avatar URL
          </label>
          <small className="fg-partial small">
            Ingresa el enlace / link de tu referencia y esta se cargara.
          </small>
        </div>
        <input
          type="url"
          name="avatarUrl"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          value={form.avatarUrl}
          onChange={handleChange}
        />
        <small className="fg-partial text-end">
          .gif | .png | .jpg | .webp
        </small>
      </div>

      {/* @bannerURL */}
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column">
          <label htmlFor="bannerUrl" className="form-label mb-0">
            Banner URL
          </label>
          <small className="fg-partial small">
            Ingresa el enlace / link de tu referencia y esta se cargara.
          </small>
        </div>
        <label className="form-label small mb-0"></label>
        <input
          type="url"
          name="bannerUrl"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          value={form.bannerUrl}
          onChange={handleChange}
        />
        <small className="fg-partial text-end">
          .gif | .png | .jpg | .webp
        </small>
      </div>

      {/* @content */}
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column">
          <label htmlFor="content" className="form-label mb-0">
            Contenido
          </label>
          <small className="fg-partial small">
            Escribe y cuentanos sobre ti. (Puedes usar Markdown o HTML)
          </small>
        </div>
        <textarea
          name="content"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          rows={8}
          maxLength={5000}
          value={form.content}
          onChange={handleChange}
        />
        <small className="fg-partial text-end">
          {form.content.length}/5000
        </small>
      </div>
      <hr className="hr-surface my-0" />

      {/* #error, !submit */}
      <div className="d-flex flex-row flex-wrap align-items-center gap-3">
        {error && <p className="fg-error mb-0">Error. {error}</p>}
        {success && <p className="fg-success mb-0">Cambios guardados.</p>}
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
