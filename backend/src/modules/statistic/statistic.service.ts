// src/modules/statistic/statistic.service.ts
import { statisticRepository } from "./statistic.repository";
import { userRepository } from "../user/user.repository";
import { StatisticMeterType } from "../../../prisma/generated/prisma/enums";

export function statisticService() {
  // -- Repositories
  const { readById } = userRepository();
  const {
    createInteraction,
    deleteInteraction,
    readInteraction,
    readInteractionsStatus,
    readPublicStatistic,
    updateStatistic,
  } = statisticRepository();

  // -- Services
  const postLikeService = async (
    userOriginId: number,
    userDestinyId: number,
  ) => {
    return toggleInteraction(
      userOriginId,
      userDestinyId,
      StatisticMeterType.like,
    );
  };
  const postFollowService = async (
    userOriginId: number,
    userDestinyId: number,
  ) => {
    return toggleInteraction(
      userOriginId,
      userDestinyId,
      StatisticMeterType.follow,
    );
  };
  const postShareService = async (userDestinyId: number) => {
    const destiny = await readById(userDestinyId);
    if (!destiny) {
      throw new Error("Usuario no encontrado");
    }

    const item = await updateStatistic(userDestinyId);
    if (!item) {
      throw new Error("Error al compartir el perfil.");
    }

    return {
      success: true,
      message: "Usuario compartido exitosamente.",
      data: { item },
    };
  };
  const getStatisticService = async (username: string) => {
    const item = await readPublicStatistic(username);
    if (!item) {
      throw new Error("Usuario no encontrado");
    }

    return {
      success: true,
      message: "Estadisticas de usuario obtenidas exitosamente.",
      data: { item },
    };
  };
  const getInteractionStatusService = async (
    userOriginId: number,
    userDestinyId: number,
  ) => {
    const item = await readInteractionsStatus(userOriginId, userDestinyId);
    if (!item) {
      throw new Error("Error al obtener las interacciones con el usuario.");
    }

    return {
      success: true,
      message: "Interacciones con el usuario obtenidas exitosamente.",
      data: { item },
    };
  };

  // -- Helpers
  const toggleInteraction = async (
    userOriginId: number,
    userDestinyId: number,
    type: StatisticMeterType,
  ) => {
    if (userOriginId === userDestinyId) {
      throw new Error(`No puedes '${type}' tu propio perfil.`);
    }

    const destiny = await readById(userDestinyId);
    if (!destiny) {
      throw new Error("Usuario no encontrado.");
    }

    const existing = await readInteraction(userOriginId, userDestinyId, type);

    const counterField = type === StatisticMeterType.like ? "likes" : "follows";

    if (existing) {
      await deleteInteraction(existing.id, userDestinyId, counterField);

      return {
        success: true,
        message: "Interacción removida exitosamente.",
        data: { item: { active: false, type } },
      };
    }

    if (!existing) {
      await createInteraction(userOriginId, userDestinyId, type, counterField);
      return {
        success: true,
        message: "Interacción generada exitosamente.",
        data: { item: { active: true, type } },
      };
    }
  };

  // -- Exports
  return {
    postLikeService,
    postFollowService,
    postShareService,
    getStatisticService,
    getInteractionStatusService,
  };
}
