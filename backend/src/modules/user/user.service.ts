// src/modules/user/user.service.ts
import { UserStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../../prisma/lib/prisma";
import { UpdateProfileInput } from "./user.type";

// ─── Tipos ────────────────────────────────────────────

// ─── Servicios ────────────────────────────────────────
export function userService() {
  const getMyProfileService = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        displayName: true,
        email: true,
        bio: true,
        content: true,
        avatarUrl: true,
        bannerUrl: true,
        role: true,
        status: true,
        createdAt: true,
        social: true,
        statistic: true,
        theme: true,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  };

  // Perfil público de cualquier usuario por username
  const getPublicProfileService = async (username: string) => {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
        content: true,
        avatarUrl: true,
        bannerUrl: true,
        social: true,
        statistic: true,
        theme: true,
      },
    });

    if (!user) throw new Error("User not found");

    // Incrementar views cada vez que se visita el perfil público
    await prisma.statistic.update({
      where: { userId: user.id },
      data: { views: { increment: 1 } },
    });

    return user;
  };

  // Actualizar perfil propio
  const updateProfileService = async (
    userId: number,
    input: UpdateProfileInput,
  ) => {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { ...input },
      select: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
        content: true,
        avatarUrl: true,
        bannerUrl: true,
      },
    });

    return user;
  };

  // Cambiar status de un usuario (solo admin)
  const updateUserStatusService = async (
    targetId: number,
    status: UserStatus,
  ) => {
    const user = await prisma.user.findUnique({ where: { id: targetId } });
    if (!user) throw new Error("User not found");

    const updated = await prisma.user.update({
      where: { id: targetId },
      data: { status },
      select: { id: true, username: true, status: true },
    });

    return updated;
  };

  return {
    getMyProfileService,
    getPublicProfileService,
    updateProfileService,
    updateUserStatusService,
  };
}
