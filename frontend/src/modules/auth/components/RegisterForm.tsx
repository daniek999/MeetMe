// src/modules/auth/components/RegisterForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store.js";
import { apiAuthService } from "../services/auth.service.js";

import React from "react";

export default function RegisterForm() {
  // Hooks
  const { registerService } = apiAuthService();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="d-flex flex-column gap-1">
        <input
          type="email"
          name="email"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      {/* @password */}
      <div className="d-flex flex-column gap-1">
        <input
          type="password"
          name="password"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          placeholder="Clave"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      {/* @username */}
      <div className="d-flex flex-column gap-1">
        <input
          type="text"
          name="username"
          className="ipt form-control-plaintext px-3 py-1 rounded"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      {/* !submit */}
      <button
        type="submit"
        className="sw sw-primary px-3 py-1 w-100 rounded"
        disabled={loading}
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm me-2" />
        ) : null}
        {loading ? "Creando cuenta..." : <span>Registrarse</span>}
      </button>
      {/* #error.message */}
      {error && <small className="fg-error text-center">{error}</small>}
    </form>
  );
}
