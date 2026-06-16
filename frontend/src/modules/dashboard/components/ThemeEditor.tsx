// src/modules/dashboard/components/ThemeEditor.tsx
import { apiThemeService } from "../services/theme.api";
import {
  FormButton,
  FormInput,
  FormPreview,
} from "../../_common/FormComponents";
import { useState, useEffect } from "react";

export default function ThemeEditor() {
  // Hooks
  const { getThemeService, updateThemeService } = apiThemeService();
  const [form, setForm] = useState({
    primaryColor: "#000000",
    backgroundColor: "#ffffff",
    fontFamily: "Fredoka",
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
      <FormPreview
        caption="Una ojeada a como quedaria tus colores en tu perfil."
        form={form}
        label="Preview"
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

const FONTS = [
  "Fredoka",
  "Roboto",
  "Quicksand",
  "JetBrains Mono",
  "Nunito",
  "Share Tech Mono",
];
