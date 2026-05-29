// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserStatus } from "../../../prisma/generated/prisma/enums";
import { userService } from "./user.service";

export function userController() {
  const {
    getMyProfileService,
    getPublicProfileService,
    updateProfileService,
    updateUserStatusService,
  } = userService();

  const getMyProfile = async (req: Request, res: Response) => {
    try {
      const data = await getMyProfileService(req.userId!);
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(404).json({ message });
    }
  };
  const getPublicProfile = async (req: Request, res: Response) => {
    try {
      const username: string = String(req.params.username);
      const data = await getPublicProfileService(String(username));
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(404).json({ message });
    }
  };
  const updateProfile = async (req: Request, res: Response) => {
    try {
      const { displayName, bio, content, avatarUrl, bannerUrl } = req.body;
      const data = await updateProfileService(req.userId!, {
        displayName,
        bio,
        content,
        avatarUrl,
        bannerUrl,
      });
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(400).json({ message });
    }
  };
  const updateUserStatus = async (req: Request, res: Response) => {
    try {
      const targetId = Number(req.params.id);
      const { status } = req.body;

      const validStatuses = Object.values(UserStatus);
      if (!validStatuses.includes(status)) {
        res.status(400).json({
          message: `Invalid status. Valid values: ${validStatuses.join(", ")}`,
        });
        return;
      }

      const data = await updateUserStatusService(targetId, status);
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(400).json({ message });
    }
  };

  return {
    getMyProfile,
    getPublicProfile,
    updateProfile,
    updateUserStatus,
  };
}
