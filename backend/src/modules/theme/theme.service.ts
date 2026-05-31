// src/modules/theme/theme.service.ts
import { themeRepository } from "./theme.repository";
import { UpdateThemeInput } from "./theme.type";

export function themeService() {
  // -- Repositories
  const { readThemeByUserId, updateThemeByUserId } = themeRepository();

  // -- Services
  const getThemeService = async (userId: number) => {
    const item = await readThemeByUserId(userId);
    if (!item) {
      throw new Error("Tema no encontrado.");
    }

    return {
      success: true,
      message: "Tema obtenido correctamente.",
      data: { item },
    };
  };
  const patchThemeService = async (userId: number, body: UpdateThemeInput) => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (body.primaryColor && !hexRegex.test(body.primaryColor)) {
      throw new Error("Invalid primaryColor format. Use HEX (e.g. #ff0000)");
    }
    if (body.backgroundColor && !hexRegex.test(body.backgroundColor)) {
      throw new Error("Invalid backgroundColor format. Use HEX (e.g. #ffffff)");
    }

    const validLayouts = ["classic", "minimal", "bold"];
    if (body.layout && !validLayouts.includes(body.layout)) {
      throw new Error(
        `Invalid layout. Valid values: ${validLayouts.join(", ")}`,
      );
    }

    const item = await updateThemeByUserId(userId, body);
    if (!item) {
      throw new Error("No se pudo actualizar el tema.");
    }

    return {
      success: true,
      message: "Tema actualizado correctamente.",
      data: { item },
    };
  };

  // -- Exports
  return {
    getThemeService,
    patchThemeService,
  };
}
