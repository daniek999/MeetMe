// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { authService } from "./auth.service";
import { RegisterInput } from "./auth.type";

export function authController() {
  const { loginService, registerService } = authService();

  const register = async (req: Request, res: Response) => {
    try {
      const body: RegisterInput = req.body;
      const data = await registerService(body);
      return res.status(201).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(400).json({ message });
    }
  };
  const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const data = await loginService({ email, password });
      return res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(400).json({ message });
    }
  };

  return {
    register,
    login,
  };
}
