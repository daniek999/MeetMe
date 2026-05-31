// src/modules/social/social.controller.ts
import { Request, Response } from "express";
import { socialService } from "./social.service";
import { UpdateSocialInput } from "./social.type";

export function socialController() {
  const { getSocialService, patchSocialService } = socialService();

  const findSocial = async (req: Request, res: Response) => {
    try {
      const data = await getSocialService(req.userId!);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(404).json({ message });
    }
  };
  const updateSocial = async (req: Request, res: Response) => {
    try {
      const body: UpdateSocialInput = req.body;
      const data = await patchSocialService(req.userId!, body);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(400).json({ message });
    }
  };

  return {
    findSocial,
    updateSocial,
  };
}
