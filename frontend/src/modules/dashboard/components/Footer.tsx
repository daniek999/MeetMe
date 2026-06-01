// src/modules/dashboard/components/Footer.tsx

import { useAuthStore } from "../../../store/auth.store";

export default function Footer() {
  const { user } = useAuthStore();
  return (
    <footer className="footer-container position-sticky bottom-0 z-1 py-2">
      <div className="container d-flex flex-row align-items-center gap-3">
        <small className="mb-0 fg-partial">© MeetMe 2026</small>
        <small className="mb-0 fg-partial">|</small>
        <small className="mb-0 fg-partial">{user?.username}</small>
        <a className="lk lk-primary ms-auto" href="#">
          Changelog
        </a>
      </div>
    </footer>
  );
}
