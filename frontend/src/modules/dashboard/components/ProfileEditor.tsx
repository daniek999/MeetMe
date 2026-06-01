// src/modules/dashboard/components/ProfileEditor.tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { apiProfileService } from "../services/profile.service";
import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import React from "react";
import "quill/dist/quill.snow.css";

export default function ProfileEditor() {
  // Hooks
  const { getMyProfileService, updateProfileService } = apiProfileService();
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [form, setForm] = useState({
    displayName: "",
    bio: "",
    avatarUrl: "",
    bannerUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Escribe algo sobre ti...",
        modules: {
          toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline"],
            [{ list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });
    }
    const load = async () => {
      try {
        const user = await getMyProfileService();
        setForm({
          displayName: user.displayName ?? "",
          bio: user.bio ?? "",
          avatarUrl: user.avatarUrl ?? "",
          bannerUrl: user.bannerUrl ?? "",
        });
        if (quillInstance.current && user.content) {
          quillInstance.current.root.innerHTML = user.content;
        }
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
      const content = quillInstance.current?.root.innerHTML ?? "";
      await updateProfileService({ ...form, content });
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
        <div className="d-flex flex-row justify-content-between">
          <label className="form-label small mb-0">Nombre Público</label>
          <small className="fg-partial">{form.displayName.length}/100</small>
        </div>
        <input
          type="text"
          name="displayName"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          maxLength={100}
          value={form.displayName}
          onChange={handleChange}
        />
      </div>
      {/* @bio */}
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-row justify-content-between">
          <label className="form-label small mb-0">Bio</label>
          <small className="fg-partial">{form.bio.length}/255</small>
        </div>
        <textarea
          name="bio"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          rows={3}
          maxLength={255}
          value={form.bio}
          onChange={handleChange}
        />
      </div>
      {/* @avatarURL */}
      <div className="d-flex flex-column gap-1">
        <label className="form-label small mb-0">Avatar URL</label>
        <input
          type="url"
          name="avatarUrl"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          value={form.avatarUrl}
          onChange={handleChange}
        />
      </div>
      {/* @bannerURL */}
      <div className="d-flex flex-column gap-1">
        <label className="form-label small mb-0">Banner URL</label>
        <input
          type="url"
          name="bannerUrl"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          value={form.bannerUrl}
          onChange={handleChange}
        />
      </div>
      {/* @content */}
      <div className="d-flex flex-column gap-0">
        <label className="form-label small mb-1">Content</label>
        <div ref={quillRef} style={{ minHeight: 100 }} />
      </div>
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
