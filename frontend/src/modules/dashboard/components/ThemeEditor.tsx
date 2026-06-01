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
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success rounded py-2 mb-0">
          Tema actualizado.
        </div>
      )}

      <div className="row g-3">
        {/* Primary Color */}
        <div className="col-md-6 d-flex flex-column gap-1">
          <label className="form-label small mb-0">Primary Color</label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="color"
              name="primaryColor"
              className="form-control form-control-color p-0 border-0 rounded-circle"
              style={{ width: 32, height: 32 }}
              value={form.primaryColor}
              onChange={handleChange}
            />
            <span className="text-muted">{form.primaryColor}</span>
          </div>
        </div>
        {/* Background Color */}
        <div className="col-md-6 d-flex flex-column gap-1">
          <label className="form-label small mb-0">Background Color</label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="color"
              name="backgroundColor"
              className="form-control form-control-color p-0 border-0 rounded-circle"
              style={{ width: 32, height: 32 }}
              value={form.backgroundColor}
              onChange={handleChange}
            />
            <span className="text-muted">{form.backgroundColor}</span>
          </div>
        </div>
        {/* Preview */}
        <div className="col-md-12 d-flex flex-column gap-1">
          <label className="form-label small mb-0">Previsualización</label>
          <p
            className="p-2 rounded text-center mb-0 fs-6"
            style={{
              backgroundColor: form.backgroundColor,
              color: form.primaryColor,
            }}
          >
            Asi es como se combinaran los colores en tu perfil.
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-sm"
        disabled={loading}
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm me-2" />
        ) : null}
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default ThemeEditor;
