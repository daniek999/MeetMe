// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { authService } from "./auth.service";

export function authController() {
  const { loginService, registerService } = authService();

  const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      const data = await registerService({ username, email, password });
      res.status(201).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(400).json({ message });
    }
  };
  const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      const data = await loginService({ email, password });
      res.status(200).json(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      res.status(400).json({ message });
    }
  };

  return {
    register,
    login,
  };
}
