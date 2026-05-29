// src/modules/statistic/statistic.routes.ts
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { statisticController } from "./statistic.controller.js";

const statisticRoute = Router();
const { getInteractionStatus, getStatistic, share, toggleFollow, toggleLike } =
  statisticController();

statisticRoute.get("/profile/:username", getStatistic);
statisticRoute.get("/:userId/status", authMiddleware, getInteractionStatus);
statisticRoute.post("/:userId/share", share);
statisticRoute.post("/:userId/like", authMiddleware, toggleLike);
statisticRoute.post("/:userId/follow", authMiddleware, toggleFollow);

export default statisticRoute;
