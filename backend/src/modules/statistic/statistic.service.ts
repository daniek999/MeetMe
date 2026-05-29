// src/modules/statistic/statistic.service.ts
import { StatisticMeterType } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../../prisma/lib/prisma";

// ─── Servicios ────────────────────────────────────────
export function statisticService() {
  const toggleLikeService = async (
    userOriginId: number,
    userDestinyId: number,
  ) => {
    return toggleInteraction(
      userOriginId,
      userDestinyId,
      StatisticMeterType.like,
    );
  };

  const toggleFollowService = async (
    userOriginId: number,
    userDestinyId: number,
  ) => {
    return toggleInteraction(
      userOriginId,
      userDestinyId,
      StatisticMeterType.follow,
    );
  };

  // Share: no tiene unicidad, solo incrementa el contador
  const shareService = async (userDestinyId: number) => {
    const destiny = await prisma.user.findUnique({
      where: { id: userDestinyId },
    });
    if (!destiny) throw new Error("User not found");

    await prisma.statistic.update({
      where: { userId: userDestinyId },
      data: { shares: { increment: 1 } },
    });

    return { shared: true };
  };

  // Ver estadísticas de un perfil (público)
  const getStatisticService = async (username: string) => {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { statistic: true },
    });

    if (!user) throw new Error("User not found");

    return user.statistic;
  };

  // Ver si el usuario autenticado ya dio like/follow a un perfil
  const getInteractionStatusService = async (
    userOriginId: number,
    userDestinyId: number,
  ) => {
    const [like, follow] = await Promise.all([
      prisma.statisticMeter.findUnique({
        where: {
          userOriginId_userDestinyId_type: {
            userOriginId,
            userDestinyId,
            type: StatisticMeterType.like,
          },
        },
      }),
      prisma.statisticMeter.findUnique({
        where: {
          userOriginId_userDestinyId_type: {
            userOriginId,
            userDestinyId,
            type: StatisticMeterType.follow,
          },
        },
      }),
    ]);

    return {
      liked: !!like,
      followed: !!follow,
    };
  };

  return {
    toggleLikeService,
    toggleFollowService,
    shareService,
    getStatisticService,
    getInteractionStatusService,
  };
}

// ─── Helpers ──────────────────────────────────────────
const toggleInteraction = async (
  userOriginId: number,
  userDestinyId: number,
  type: StatisticMeterType,
) => {
  // Lógica compartida para like y follow (toggle)

  if (userOriginId === userDestinyId) {
    throw new Error(`You cannot ${type} your own profile`);
  }

  const destiny = await prisma.user.findUnique({
    where: { id: userDestinyId },
  });
  if (!destiny) throw new Error("User not found");

  const existing = await prisma.statisticMeter.findUnique({
    where: {
      userOriginId_userDestinyId_type: {
        userOriginId,
        userDestinyId,
        type,
      },
    },
  });

  const counterField = type === StatisticMeterType.like ? "likes" : "follows";

  // Si ya existe => quitar la interacción (toggle off)
  if (existing) {
    await prisma.$transaction([
      prisma.statisticMeter.delete({ where: { id: existing.id } }),
      prisma.statistic.update({
        where: { userId: userDestinyId },
        data: { [counterField]: { decrement: 1 } },
      }),
    ]);

    return { active: false, type };
  }

  // Si no existe => crear la interacción (toggle on)
  await prisma.$transaction([
    prisma.statisticMeter.create({
      data: { userOriginId, userDestinyId, type },
    }),
    prisma.statistic.update({
      where: { userId: userDestinyId },
      data: { [counterField]: { increment: 1 } },
    }),
  ]);

  return { active: true, type };
};
