// src/modules/social/social.controller.ts
import { Request, Response } from "express";
import { socialService } from "./social.service";

// ─── Servicios ────────────────────────────────────────
export function socialController() {
  const { getSocialService, updateSocialService } = socialService();

  const getSocial = async (req: Request, res: Response) => {
    try {
      const data = await getSocialService(req.userId!);
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(404).json({ message });
    }
  };
  const updateSocial = async (req: Request, res: Response) => {
    try {
      const {
        youtubeUrl,
        twitterUrl,
        patreonUrl,
        discordUrl,
        instagramUrl,
        twitchUrl,
        linkedinUrl,
        websiteUrl,
      } = req.body;

      const data = await updateSocialService(req.userId!, {
        youtubeUrl,
        twitterUrl,
        patreonUrl,
        discordUrl,
        instagramUrl,
        twitchUrl,
        linkedinUrl,
        websiteUrl,
      });
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(400).json({ message });
    }
  };

  return {
    getSocial,
    updateSocial,
  };
}
