// modules/user/userRepository.ts
import { UserStatus } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../../prisma/lib/prisma";
import { UpdateProfileInput } from "./user.type";

export function userRepository() {
  const readSelfById = async (id: number) => {
    return await prisma.user.findUnique({
      where: { id },
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
  };
  const readPublicByUsername = async (username: string) => {
    return await prisma.user.findUnique({
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
  };
  const readById = async (id: number) => {
    return await prisma.user.findFirst({
      where: { id },
    });
  };
  const readByEmail = async (email: string) => {
    return await prisma.user.findFirst({
      where: { email },
    });
  };
  const readByUsername = async (username: string) => {
    return await prisma.user.findFirst({
      where: { username },
    });
  };
  const createVisualization = async (id: number) => {
    return await prisma.statistic.update({
      where: { userId: id },
      data: { views: { increment: 1 } },
    });
  };
  const updateUser = async (id: number, body: UpdateProfileInput) => {
    return await prisma.user.update({
      where: { id },
      data: { ...body },
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
  };
  const updateUserStatus = async (id: number, status: UserStatus) => {
    return await prisma.user.update({
      where: { id },
      data: { status },
      select: { id: true, username: true, status: true },
    });
  };

  return {
    readSelfById,
    readPublicByUsername,
    createVisualization,
    updateUser,
    updateUserStatus,
    readById,
    readByEmail,
    readByUsername,
  };
}
