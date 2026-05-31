// src/modules/user/user.routes.ts
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { userController } from "./user.controller.js";

const userRouter = Router();
const { findMyProfile, findPublicProfile, updateUser, updateUserStatus } =
  userController();

userRouter.get("/me", authMiddleware, findMyProfile);
userRouter.get("/:username", findPublicProfile);
userRouter.patch("/me", authMiddleware, updateUser);
userRouter.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateUserStatus,
);

export default userRouter;
