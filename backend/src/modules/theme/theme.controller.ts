// src/modules/theme/theme.controller.ts
import { Request, Response } from "express";
import { themeService } from "./theme.service";
import { UpdateThemeInput } from "./theme.type";

export function themeController() {
  const { getThemeService, patchThemeService } = themeService();

  const findTheme = async (req: Request, res: Response) => {
    try {
      const data = await getThemeService(req.userId!);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(404).json({ message });
    }
  };
  const updateTheme = async (req: Request, res: Response) => {
    try {
      const body: UpdateThemeInput = req.body;
      const data = await patchThemeService(req.userId!, body);
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(400).json({ message });
    }
  };

  return {
    findTheme,
    updateTheme,
  };
}
