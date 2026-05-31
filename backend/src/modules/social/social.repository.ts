// src/modules/social/social.repository.ts
import { prisma } from "../../../prisma/lib/prisma";
import { UpdateSocialInput } from "./social.type";

export function socialRepository() {
  const readSocialByUserId = async (userId: number) => {
    return await prisma.social.findUnique({ where: { userId } });
  };
  const updateSocialByUserId = async (
    userId: number,
    body: UpdateSocialInput,
  ) => {
    return await prisma.social.update({
      where: { userId },
      data: { ...body },
    });
  };

  return {
    readSocialByUserId,
    updateSocialByUserId,
  };
}
