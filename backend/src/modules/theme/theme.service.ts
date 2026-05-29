// src/modules/theme/theme.service.ts
import { prisma } from "../../../prisma/lib/prisma";
import { UpdateThemeInput } from "./theme.type";

// ─── Tipos ────────────────────────────────────────────

// ─── Servicios ────────────────────────────────────────
export function themeService() {
  const getThemeService = async (userId: number) => {
    const theme = await prisma.theme.findUnique({ where: { userId } });
    if (!theme) throw new Error("Theme not found");
    return theme;
  };
  const updateThemeService = async (
    userId: number,
    input: UpdateThemeInput,
  ) => {
    // Validar formato HEX si se envían colores
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;

    if (input.primaryColor && !hexRegex.test(input.primaryColor)) {
      throw new Error("Invalid primaryColor format. Use HEX (e.g. #ff0000)");
    }

    if (input.backgroundColor && !hexRegex.test(input.backgroundColor)) {
      throw new Error("Invalid backgroundColor format. Use HEX (e.g. #ffffff)");
    }

    const validLayouts = ["classic", "minimal", "bold"];
    if (input.layout && !validLayouts.includes(input.layout)) {
      throw new Error(
        `Invalid layout. Valid values: ${validLayouts.join(", ")}`,
      );
    }

    const theme = await prisma.theme.update({
      where: { userId },
      data: { ...input },
    });

    return theme;
  };

  return {
    getThemeService,
    updateThemeService,
  };
}
