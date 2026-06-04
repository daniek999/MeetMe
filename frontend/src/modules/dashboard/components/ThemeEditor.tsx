// src/modules/dashboard/components/ThemeEditor.tsx
import { useState, useEffect } from "react";
import {
  getThemeService,
  updateThemeService,
} from "../services/theme.service.js";

const ThemeEditor = () => {
  // Hooks
  const [form, setForm] = useState({
    primaryColor: "#000000",
    backgroundColor: "#ffffff",
    fontFamily: "Inter",
    layout: "classic",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  useEffect(() => {
    const load = async () => {
      try {
        const theme = await getThemeService();
        setForm({
          primaryColor: theme.primaryColor,
          backgroundColor: theme.backgroundColor,
          fontFamily: theme.fontFamily,
          layout: theme.layout,
        });
      } catch {
        setError("Failed to load theme");
      }
    };
    load();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateThemeService(form);
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
      {/* @primaryColor */}
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column">
          <label className="form-label small mb-0">Texto Primario</label>
          <small className="fg-partial">
            El color que tomara tu texto principal.
          </small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <input
            type="color"
            name="primaryColor"
            className="ipt form-control-plaintext p-0 rounded"
            value={form.primaryColor}
            onChange={handleChange}
          />
        </div>
        <small className="fg-partial text-end">
          {form.primaryColor.toUpperCase()}
        </small>
      </div>

      {/* @backgroundColor */}
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column">
          <label className="form-label small mb-0">Fondo Primario</label>
          <small className="fg-partial">
            El color que tomara tu fondo principal.
          </small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <input
            type="color"
            name="backgroundColor"
            className="ipt form-control-plaintext p-0 rounded"
            value={form.backgroundColor}
            onChange={handleChange}
          />
        </div>
        <small className="fg-partial text-end">
          {form.backgroundColor.toUpperCase()}
        </small>
      </div>

      {/* -Preview */}
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column">
          <label className="form-label small mb-0">Preview</label>
          <small className="fg-partial">
            Una ojeada a como quedaria tus colores en tu perfil.
          </small>
        </div>
        <div
          className="d-flex flex-column align-items-center gap-2 rounded p-4 bdr-surface"
          style={{
            backgroundColor: form.backgroundColor,
            color: form.primaryColor,
          }}
        >
          <h4 className="mb-0">Texto Primario sobre Fondo Primario</h4>
          <p className="mb-0 p-3 bg-surface py-1">
            Texto Secundario con Fondo Secundario
          </p>
        </div>
        <small className="fg-partial text-end">¿Que te parece?</small>
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
};

export default ThemeEditor;
