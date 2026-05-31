// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserStatus } from "../../../prisma/generated/prisma/enums";
import { userService } from "./user.service";
import { UpdateProfileInput } from "./user.type";

export function userController() {
  const {
    getSelfProfileService,
    getPublicProfileService,
    patchUserService,
    patchUserStatusService,
  } = userService();

  const findMyProfile = async (req: Request, res: Response) => {
    try {
      const data = await getSelfProfileService(req.userId!);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(404).json({ message });
    }
  };
  const findPublicProfile = async (req: Request, res: Response) => {
    try {
      const username: string = String(req.params.username);
      const data = await getPublicProfileService(String(username));
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(404).json({ message });
    }
  };
  const updateUser = async (req: Request, res: Response) => {
    try {
      const body: UpdateProfileInput = req.body;
      const data = await patchUserService(req.userId!, body);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(400).json({ message });
    }
  };
  const updateUserStatus = async (req: Request, res: Response) => {
    try {
      const targetId = Number(req.params.id);
      const { status } = req.body;

      const data = await patchUserStatusService(targetId, status);
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(400).json({ message });
    }
  };

  return {
    findMyProfile,
    findPublicProfile,
    updateUser,
    updateUserStatus,
  };
}
