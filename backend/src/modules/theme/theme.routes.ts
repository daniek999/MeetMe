// src/modules/theme/theme.routes.ts
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { themeController } from "./theme.controller.js";

const themeRouter = Router();
const { getTheme, updateTheme } = themeController();

themeRouter.get("/", authMiddleware, getTheme);
themeRouter.patch("/", authMiddleware, updateTheme);

export default themeRouter;
