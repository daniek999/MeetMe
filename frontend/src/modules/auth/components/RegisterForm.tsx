// src/modules/auth/components/RegisterForm.tsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store";
import { FormButton, FormInput } from "../../_common/FormComponents";
import { apiAuthService } from "../services/auth.service";

export default function RegisterForm() {
  // Hooks
  const { registerService } = apiAuthService();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await registerService(form);
      setAuth(data.item, data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Renders
  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
      {/* @email */}
      <FormInput
        label=""
        caption=""
        constraint=""
        name="email"
        type="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
      />
      {/* @password */}
      <FormInput
        label=""
        caption=""
        constraint=""
        name="password"
        type="password"
        placeholder="Clave"
        value={form.password}
        onChange={handleChange}
      />
      {/* @username */}
      <FormInput
        label=""
        caption=""
        constraint=""
        name="username"
        type="text"
        placeholder="Usuario"
        value={form.username}
        onChange={handleChange}
      />
      {/* !submit */}
      <FormButton
        label="Registrar"
        labelLoading="Registrando..."
        loading={loading}
        type="submit"
      />
      {/* #error.message */}
      {error && <small className="fg-error text-center">{error}</small>}
    </form>
  );
}
