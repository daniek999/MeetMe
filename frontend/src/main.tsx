import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ui/styles/bs5-override.css";
import "./ui/styles/index.css";
// import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
);
