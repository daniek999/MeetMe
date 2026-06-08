// src/modules/dashboard/components/ThemeEditor.tsx
import { apiThemeService } from "../services/theme.service";
import { useState, useEffect } from "react";
import React from "react";
import { FormButton, FormInput } from "./ProfileEditor";

export default function ThemeEditor() {
  // Hooks
  const { getThemeService, updateThemeService } = apiThemeService();
  const [form, setForm] = useState({
    primaryColor: "#000000",
    backgroundColor: "#ffffff",
    fontFamily: "Fredoka",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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

  // Renders
  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {/* @primaryColor */}
      <FormInput
        label="Texto Primario"
        caption="El color que tomara tu texto principal."
        constraint={form.primaryColor.toUpperCase()}
        name="primaryColor"
        type="color"
        value={form.primaryColor}
        onChange={handleChange}
      />

      {/* @backgroundColor */}
      <FormInput
        label="Fondo Primario"
        caption="El color que tomara tu fondo principal."
        constraint={form.backgroundColor.toUpperCase()}
        name="backgroundColor"
        type="color"
        value={form.backgroundColor}
        onChange={handleChange}
      />

      <FormInput
        label="Familia Tipográfica"
        caption="La tipografía de tu perfil."
        constraint=""
        name="fontFamily"
        type="select"
        value={form.fontFamily}
        itemArray={FONTS}
        onChange={handleChange}
      />

      {/* -Preview */}
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column">
          <label className="form-label small mb-0">Preview</label>
          <div className="d-flex flex-row justify-content-between">
            <small className="fg-partial">
              Una ojeada a como quedaria tus colores en tu perfil.
            </small>
            <small className="fg-partial text-end">¿Que te parece?</small>
          </div>
        </div>
        <div
          className="d-flex flex-column align-items-center gap-2 p-5 bdr-surface"
          style={{
            backgroundColor: form.backgroundColor,
            color: form.primaryColor,
            fontFamily: form.fontFamily,
          }}
        >
          <h4 className="mb-0">Texto Primario sobre Fondo Primario</h4>
          <p className="mb-0 p-3 bg-surface py-1">
            Texto Secundario con Fondo Secundario
          </p>
        </div>
      </div>

      {/* #error, !submit */}
      <div className="d-flex flex-row flex-wrap align-items-center gap-3">
        {error && <p className="fg-error mb-0">Error. {error}</p>}
        {success && <p className="fg-success mb-0">Cambios guardados.</p>}
        <FormButton label="Guardar" loading={loading} type="submit" />
      </div>
    </form>
  );
}

const FONTS = ["Fredoka", "Roboto", "Quicksand", "JetBrains Mono"];
