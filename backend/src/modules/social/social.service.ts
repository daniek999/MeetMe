// src/modules/social/social.service.ts
import { socialRepository } from "./social.repository";
import { UpdateSocialInput } from "./social.type";

export function socialService() {
  // -- Repositories
  const { readSocialByUserId, updateSocialByUserId } = socialRepository();

  // -- Services
  const getSocialService = async (userId: number) => {
    const item = await readSocialByUserId(userId);
    if (!item) {
      throw new Error("Social no encontrado.");
    }

    return {
      success: true,
      message: "Sociales actualizado correctamente..",
      data: { item },
    };
  };
  const patchSocialService = async (
    userId: number,
    body: UpdateSocialInput,
  ) => {
    const item = await updateSocialByUserId(userId, body);
    if (!item) {
      throw new Error("Error al actualizar el social.");
    }

    return {
      success: true,
      message: "Sociales actualizado correctamente..",
      data: { item },
    };
  };

  // -- Exports
  return {
    getSocialService,
    patchSocialService,
  };
}
