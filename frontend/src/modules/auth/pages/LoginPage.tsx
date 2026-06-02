// src/modules/auth/pages/LoginPage.tsx
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.js";

export default function LoginPage() {
  return (
    <div
      className="bg-depth d-flex flex-column gap-4 p-4 rounded w-100 shadow-lg"
      style={{ maxWidth: 360 }}
    >
      <div className="d-flex flex-column">
        <h2 className="mb-0">Accede</h2>
        <small className="fg-partial">Ingresa tus datos para acceder.</small>
      </div>
      <hr className="hr-surface my-0" />
      <LoginForm />
      <hr className="hr-surface my-0" />
      <small className="mb-0 text-center">
        No tienes una cuenta aun?{" "}
        <Link className="lk lk-primary" to="/register">
          Registrate
        </Link>
      </small>
    </div>
  );
}
