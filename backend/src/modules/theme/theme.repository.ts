// src/modules/them/theme.repository.ts
import { prisma } from "../../../prisma/lib/prisma";
import { UpdateThemeInput } from "./theme.type";

export function themeRepository() {
  const readThemeByUserId = async (userId: number) => {
    return await prisma.theme.findUnique({ where: { userId } });
  };
  const updateThemeByUserId = async (
    userId: number,
    body: UpdateThemeInput,
  ) => {
    return await prisma.theme.update({
      where: { userId },
      data: { ...body },
    });
  };

  return {
    readThemeByUserId,
    updateThemeByUserId,
  };
}
