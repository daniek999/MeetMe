// src/modules/statistic/statistic.controller.ts
import { Request, Response } from "express";
import { statisticService } from "./statistic.service";

export function statisticController() {
  const {
    getInteractionStatusService,
    getStatisticService,
    postFollowService,
    postLikeService,
    postShareService,
  } = statisticService();

  const toggleLike = async (req: Request, res: Response) => {
    try {
      const userDestinyId = Number(req.params.userId);
      const data = await postLikeService(req.userId!, userDestinyId);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(400).json({ message });
    }
  };
  const toggleFollow = async (req: Request, res: Response) => {
    try {
      const userDestinyId = Number(req.params.userId);
      const data = await postFollowService(req.userId!, userDestinyId);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(400).json({ message });
    }
  };
  const share = async (req: Request, res: Response) => {
    try {
      const userDestinyId = Number(req.params.userId);
      const data = await postShareService(userDestinyId);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(400).json({ message });
    }
  };
  const getStatistic = async (req: Request, res: Response) => {
    try {
      const username = String(req.params.username);
      const data = await getStatisticService(username);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(404).json({ message });
    }
  };
  const getInteractionStatus = async (req: Request, res: Response) => {
    try {
      const userDestinyId = Number(req.params.userId);
      const data = await getInteractionStatusService(
        req.userId!,
        userDestinyId,
      );
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(400).json({ message });
    }
  };

  return {
    toggleLike,
    toggleFollow,
    share,
    getStatistic,
    getInteractionStatus,
  };
}
