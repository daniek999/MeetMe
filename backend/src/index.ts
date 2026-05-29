// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./modules/auth/auth.routes.js";
import userRouter from "./modules/user/user.routes.js";
import socialRouter from "./modules/social/social.routes.js";
import themeRouter from "./modules/theme/theme.routes.js";
import statisticRoute from "./modules/statistic/statistic.routes.js";

const app = express();
const PORT = process.env.PORT ?? 3002;
dotenv.config({ quiet: true });

// ─── Middlewares globales ─────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Rutas ────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/social", socialRouter);
app.use("/api/theme", themeRouter);
app.use("/api/statistic", statisticRoute);

// ─── Health check ─────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Server running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
