import { StatisticMeterType } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../../prisma/lib/prisma";

export function statisticRepository() {
  const readInteraction = async (
    userOriginId: number,
    userDestinyId: number,
    type: StatisticMeterType,
  ) => {
    return await prisma.statisticMeter.findUnique({
      where: {
        userOriginId_userDestinyId_type: {
          userOriginId,
          userDestinyId,
          type,
        },
      },
    });
  };
  const createInteraction = async (
    userOriginId: number,
    userDestinyId: number,
    type: StatisticMeterType,
    counterField: "likes" | "follows",
  ) => {
    return await prisma.$transaction([
      prisma.statisticMeter.create({
        data: { userOriginId, userDestinyId, type },
      }),
      prisma.statistic.update({
        where: { userId: userDestinyId },
        data: { [counterField]: { increment: 1 } },
      }),
    ]);
  };
  const deleteInteraction = async (
    id: number,
    userId: number,
    counterField: "likes" | "follows",
  ) => {
    return await prisma.$transaction([
      prisma.statisticMeter.delete({ where: { id } }), // existing.id
      prisma.statistic.update({
        where: { userId }, // userDestinyId
        data: { [counterField]: { decrement: 1 } },
      }),
    ]);
  };
  const readInteractionsStatus = async (
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
  const readPublicStatistic = async (username: string) => {
    return await prisma.user.findUnique({
      where: { username },
      select: { statistic: true },
    });
  };
  const updateStatistic = async (userId: number) => {
    return await prisma.statistic.update({
      where: { userId },
      data: { shares: { increment: 1 } },
    });
  };

  return {
    readInteraction,
    createInteraction,
    deleteInteraction,
    readInteractionsStatus,
    readPublicStatistic,
    updateStatistic,
  };
}
