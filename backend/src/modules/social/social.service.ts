// src/modules/social/social.service.ts
import { prisma } from "../../../prisma/lib/prisma";
import { UpdateSocialInput } from "./social.type";

// ─── Servicios ────────────────────────────────────────
export function socialService() {
  const getSocialService = async (userId: number) => {
    const social = await prisma.social.findUnique({ where: { userId } });
    if (!social) throw new Error("Social not found");
    return social;
  };

  const updateSocialService = async (
    userId: number,
    input: UpdateSocialInput,
  ) => {
    const social = await prisma.social.update({
      where: { userId },
      data: { ...input },
    });
    return social;
  };

  return {
    getSocialService,
    updateSocialService,
  };
}
