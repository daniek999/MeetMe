// src/modules/social/social.routes.ts
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { socialController } from "./social.controller.js";

const socialRouter = Router();
const { findSocial, updateSocial } = socialController();

socialRouter.get("/", authMiddleware, findSocial);
socialRouter.patch("/", authMiddleware, updateSocial);

export default socialRouter;
