// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../../prisma/lib/prisma";
import { LoginInput, RegisterInput } from "./auth.type";

// ─── Servicios ────────────────────────────────────────
export function authService() {
  const registerService = async (input: RegisterInput) => {
    const { username, email, password } = input;

    // Verificar duplicados
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existing) {
      const field = existing.email === email ? "email" : "username";
      throw new Error(`That ${field} is already taken`);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario + registros relacionados en una transacción
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          username,
          email: email.toLowerCase(),
          password: passwordHash,
        },
      });

      await tx.social.create({ data: { userId: newUser.id } });
      await tx.statistic.create({ data: { userId: newUser.id } });
      await tx.theme.create({ data: { userId: newUser.id } });

      return newUser;
    });

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  };
  const loginService = async (input: LoginInput) => {
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    if (user.status !== "enabled") {
      throw new Error(`Account is ${user.status}`);
    }

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  };

  return {
    registerService,
    loginService,
  };
}

// ─── Helpers ──────────────────────────────────────────
const generateToken = (userId: number): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  return jwt.sign({ id: userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  } as jwt.SignOptions);
};
