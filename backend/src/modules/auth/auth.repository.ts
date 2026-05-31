// modules/auth/authRepository.ts
import { prisma } from "../../../prisma/lib/prisma";
import { LoginInput, RegisterInput } from "./auth.type";

export function authRepository() {
  const authRegister = async (body: RegisterInput) => {
    const { username, email, password } = body;

    return await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          username,
          email: email.toLowerCase(),
          password: password,
        },
      });

      await tx.social.create({ data: { userId: newUser.id } });
      await tx.statistic.create({ data: { userId: newUser.id } });
      await tx.theme.create({ data: { userId: newUser.id } });

      return newUser;
    });
  };
  const authLogin = async (body: LoginInput) => {
    const { email, password } = body;

    return await prisma.user.findUnique({
      where: { email },
    });
  };

  return {
    authLogin,
    authRegister,
  };
}
