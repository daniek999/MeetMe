// src/modules/auth/components/LoginForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store.js";
import React from "react";
import { apiAuthService } from "../services/auth.service.js";

export default function LoginForm() {
  // Hooks
  const { loginService } = apiAuthService();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
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
      const data = await loginService(form);
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
      {/* #error.message */}
      {error && (
        <div className="alert alert-danger p-0 text-center border-0 mb-0">
          {error}
        </div>
      )}
      {/* @email */}
      <div className="d-flex flex-column gap-1">
        <label className="form-label mb-0 small">Correo</label>
        <input
          type="email"
          name="email"
          className="form-control bg-light border-0 rounded"
          placeholder="usuario@gmail.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      {/* @password */}
      <div className="d-flex flex-column gap-1">
        <label className="form-label mb-0 small">Clave</label>
        <input
          type="password"
          name="password"
          className="form-control bg-light border-0 rounded"
          placeholder="claveultrasupersecreta"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      {/* !submit */}
      <button
        type="submit"
        className="btn btn-primary w-100"
        style={{ width: "fit-content" }}
        disabled={loading}
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm me-2" />
        ) : null}
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
