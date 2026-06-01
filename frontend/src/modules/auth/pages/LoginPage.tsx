// src/modules/auth/pages/LoginPage.tsx
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.js";

export default function LoginPage() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      <h5 className="position-absolute top-0 start-0 p-3 mb-0">MeetMe</h5>
      <div
        className="d-flex flex-column gap-4 p-4 bdr-surface rounded w-100"
        style={{ maxWidth: 360 }}
      >
        <h2 className="mb-0">Inicia Sesión</h2>
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
      <small className="position-absolute bottom-0 end-0 p-3 fg-partial">
        © MeetMe 2026
      </small>
    </div>
  );
}
