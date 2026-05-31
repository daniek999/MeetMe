// src/middlewares/role.middleware.ts
import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma/lib/prisma";
import { UserRole } from "../../prisma/generated/prisma/enums";
import { userRepository } from "../modules/user/user.repository";

export const roleMiddleware = (roles: UserRole[]) => {
  const { readById } = userRepository();

  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) {
      return res.status(401).json({
        status: false,
        message: "No Autorizado.",
        data: null,
      });
    }

    const user = await readById(req.userId);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Usuario no econtrado.",
        data: null,
      });
    }
    if (user.status !== "enabled") {
      return res.status(403).json({
        status: false,
        message: "La cuenta no esta habilitada.",
        data: null,
      });
    }
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        status: false,
        message: "Rol inválido.",
        data: null,
      });
    }

    next();
  };
};
