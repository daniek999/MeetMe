// src/modules/dashboard/components/ProfileEditor.tsx
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
        {error && <p className="fg-error mb-0">Error. {error}</p>}
        {success && <p className="fg-success mb-0">Cambios guardados.</p>}
        <FormButton label="Guardar" loading={loading} type="submit" />
      </div>
    </form>
  );
}

export function FormInput({
  label,
  caption,
  constraint,
  type,
  name,
  value,
  onChange,
  maxLength,
  rows = 3,
  itemArray,
}: {
  label: string;
  caption: string;
  constraint: string;
  type: "text" | "url" | "textarea" | "color" | "select";
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  maxLength?: number;
  rows?: number;
  itemArray?: string[];
}) {
  const isTextArea = type === "textarea";

  return (
    <div className="d-flex flex-column gap-1">
      <div className="d-flex flex-column">
        <label htmlFor={name} className="form-label small mb-0">
          {label}
        </label>
        <div className="d-flex flex-row justify-content-between">
          <small className="fg-partial">{caption}</small>
          <small className="fg-partial">{constraint}</small>
        </div>
      </div>

      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          className="ipt form-control-plaintext px-3 py-1"
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
        />
      ) : type === "color" ? (
        <input
          id={name}
          type={type}
          name={name}
          className="ipt form-control-plaintext p-0"
          maxLength={maxLength}
          value={value}
          onChange={onChange}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          className="ipt form-control-plaintext px-3 py-1"
          value={value}
          onChange={onChange}
        >
          {itemArray!.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          className="ipt form-control-plaintext px-3 py-1"
          maxLength={maxLength}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export function FormButton({
  type,
  loading,
  label,
}: {
  type: "submit" | "reset" | "button";
  loading: boolean;
  label: string;
}) {
  return (
    <button
      type={type}
      className="sw sw-primary px-3 py-1 ms-auto"
      disabled={loading}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm me-2" />
      ) : null}
      {loading ? "Guardando..." : label}
    </button>
  );
}
