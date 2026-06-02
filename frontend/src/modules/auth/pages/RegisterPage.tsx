// src/modules/auth/pages/RegisterPage.tsx
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.js";

export default function RegisterPage() {
  return (
    <div
      className="bg-depth d-flex flex-column gap-4 p-4 bdr-surface rounded w-100"
      style={{ maxWidth: 360 }}
    >
      <div className="d-flex flex-column">
        <h2 className="mb-0">Registrate</h2>
        <small className="fg-partial">
          Ingresa tus datos para una nueva cuenta.
        </small>
      </div>
      <hr className="hr-surface my-0" />
      <RegisterForm />
      <hr className="hr-surface my-0" />
      <small className="mb-0 text-center">
        Ya tienes una cuenta?{" "}
        <Link className="lk lk-primary" to="/login">
          Inicia Sesión
        </Link>
      </small>
    </div>
  );
}
