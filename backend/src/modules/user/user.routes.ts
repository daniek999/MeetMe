// src/modules/user/user.routes.ts
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { userController } from "./user.controller.js";

const userRouter = Router();
const { getMyProfile, getPublicProfile, updateProfile, updateUserStatus } =
  userController();

userRouter.get("/me", authMiddleware, getMyProfile);
userRouter.get("/:username", getPublicProfile);
userRouter.patch("/me", authMiddleware, updateProfile);
userRouter.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserStatus,
);

export default userRouter;
