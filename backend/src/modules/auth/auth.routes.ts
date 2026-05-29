// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();
const { login, register } = authController();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
