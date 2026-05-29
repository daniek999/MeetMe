// src/middlewares/role.middleware.ts
import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma/lib/prisma";
import { UserRole } from "../../prisma/generated/prisma/enums";

export const roleMiddleware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { role: true, status: true },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    if (user.status !== "enabled") {
      res.status(403).json({ message: `Account is ${user.status}` });
      return;
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({ message: "Insufficient permissions" });
      return;
    }

    next();
  };
};
