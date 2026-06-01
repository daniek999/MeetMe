// src/modules/auth/pages/RegisterPage.tsx
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.js";

export default function RegisterPage() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <h5 className="position-absolute top-0 start-0 p-3 mb-0">MeetMe</h5>
      <div
        className="d-flex flex-column gap-3"
        style={{ width: "100%", maxWidth: 360 }}
      >
        <div className="bg-surface d-flex flex-column gap-3 p-4 rounded">
          <h2 className="mb-0">Registrate</h2>
          <RegisterForm />
        </div>
        <div className="bg-surface d-flex flex-column gap-3 px-4 py-2 rounded">
          <p className="mb-0 small text-center">
            Ya tienes una cuenta?{" "}
            <Link className="lk lk-primary" to="/login">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
      <small className="position-absolute bottom-0 end-0 p-3 mb-0 text-muted">
        © MeetMe 2026
      </small>
    </div>
  );
}
