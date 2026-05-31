// src/modules/user/user.service.ts
import { userRepository } from "./user.repository";
import { UserStatus } from "../../../prisma/generated/prisma/enums";
import { UpdateProfileInput } from "./user.type";

export function userService() {
  // -- Repositories
  const {
    createVisualization,
    readPublicByUsername,
    readById,
    readSelfById,
    updateUser,
    updateUserStatus,
  } = userRepository();

  // -- Services
  const getSelfProfileService = async (userId: number) => {
    const item = await readSelfById(userId);
    if (!item) {
      throw new Error("Usuario no encontrado");
    }

    return {
      success: true,
      message: "Perfil encontrado exitosamente.",
      data: { item },
    };
  };
  const getPublicProfileService = async (username: string) => {
    const item = await readPublicByUsername(username);
    if (!item) {
      throw new Error("Usuario no encontrado");
    }

    await createVisualization(item.id); // Incrementar views cada vez que se visita el perfil público

    return {
      success: true,
      message: "Usuario encontrado exitosamente.",
      data: { item },
    };
  };
  const patchUserService = async (userId: number, body: UpdateProfileInput) => {
    const { avatarUrl, bannerUrl, bio, content, displayName } = body;

    const item = await updateUser(userId, body);
    if (!item) {
      throw new Error("Error al actualiza el usuario.");
    }

    return {
      success: true,
      message: "Cuenta actualizada correctamente.",
      data: { item },
    };
  };
  const patchUserStatusService = async (
    targetId: number,
    status: UserStatus,
  ) => {
    const validStatuses = Object.values(UserStatus);
    if (!validStatuses.includes(status)) {
      throw new Error("Estado inválido.");
    }

    const verifyUser = await readById(targetId);
    if (!verifyUser) {
      throw new Error("Usuario no encontrado.");
    }

    const item = await updateUserStatus(targetId, status);
    if (!item) {
      throw new Error("Error al actualizar el estado del usuario.");
    }

    return {
      success: true,
      message: "Cuenta actualizada correctamente.",
      data: { item },
    };
  };

  // -- Exports
  return {
    getSelfProfileService,
    getPublicProfileService,
    patchUserService,
    patchUserStatusService,
  };
}
