// src/modules/auth/pages/RegisterPage.tsx
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.js";

export default function RegisterPage() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <h5 className="position-absolute top-0 start-0 p-3 mb-0">MeetMe</h5>
      <div
        className="d-flex flex-column gap-4 p-4 bdr-surface rounded w-100"
        style={{ maxWidth: 360 }}
      >
        <h2 className="mb-0">Registrate</h2>
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
      <small className="position-absolute bottom-0 end-0 p-3 mb-0 fg-partial">
        © MeetMe 2026
      </small>
    </div>
  );
}
