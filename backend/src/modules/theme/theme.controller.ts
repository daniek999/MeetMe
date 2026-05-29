// src/modules/theme/theme.controller.ts
import { Request, Response } from "express";
import { themeService } from "./theme.service";

export function themeController() {
  const { getThemeService, updateThemeService } = themeService();

  const getTheme = async (req: Request, res: Response) => {
    try {
      const data = await getThemeService(req.userId!);
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(404).json({ message });
    }
  };
  const updateTheme = async (req: Request, res: Response) => {
    try {
      const { primaryColor, backgroundColor, fontFamily, layout } = req.body;
      const data = await updateThemeService(req.userId!, {
        primaryColor,
        backgroundColor,
        fontFamily,
        layout,
      });
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(400).json({ message });
    }
  };

  return {
    getTheme,
    updateTheme,
  };
}
