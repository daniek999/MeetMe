// src/middlewares/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Autorización no proporcionada.",
      data: null,
    });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({
      success: false,
      message: "Formato de token inválido.",
      data: null,
    });
  }

  const [type, token] = parts;
  if (type !== "Bearer") {
    return res.status(401).json({
      success: false,
      message: "Formato de autorizacion inválido.",
      data: null,
    });
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { id: number };
    req.userId = decoded.id;
  } catch {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado.",
      data: null,
    });
  } finally {
    next();
  }
};
