// src/modules/auth/auth.service.ts
import { authRepository } from "./auth.repository";
import { userRepository } from "../user/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginInput, RegisterInput } from "./auth.type";

export function authService() {
  // -- Repositories
  const { authRegister, authLogin } = authRepository();
  const { readByEmail, readByUsername } = userRepository();

  // -- Services
  const registerService = async (body: RegisterInput) => {
    const { username, email, password } = body;
    if (!username || !email || !password) {
      throw new Error(`Todos los campos son requeridos.`);
    }

    const existingEmail = await readByEmail(email);
    if (existingEmail) {
      throw new Error(`El correo ya esta registrado.`);
    }

    const existingUsername = await readByUsername(username);
    if (existingUsername) {
      throw new Error("El nombre de usuario ya esta registrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authRegister({ ...body, password: hashedPassword });
    if (!user) {
      throw new Error("Error al registrar al usuario.");
    }

    const token = await generateToken(user.id);
    if (!token) {
      throw new Error("Error al generar tu token.");
    }

    return {
      success: true,
      message: "Registro exitoso.",
      data: {
        item: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      },
    };
  };
  const loginService = async (body: LoginInput) => {
    const { email, password } = body;
    if (!email || !password) {
      throw new Error(`Todos los campos son requeridos.`);
    }

    const user = await authLogin({ ...body, email: email.toLowerCase() });
    if (!user) {
      throw new Error("Credenciales incorrectas.");
    }
    if (user.status !== "enabled") {
      throw new Error(`Tu cuenta esta deshabilitada.`);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Clave incorrecta.");
    }

    const token = await generateToken(user.id);
    if (!token) {
      throw new Error("Error al generar tu token.");
    }

    return {
      success: true,
      message: "Inicio de Sesión exitoso.",
      data: {
        item: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      },
    };
  };

  // -- Helpers
  const generateToken = async (userId: number) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    return jwt.sign({ id: userId }, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    } as jwt.SignOptions);
  };
  const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  // -- Exports
  return {
    registerService,
    loginService,
  };
}
