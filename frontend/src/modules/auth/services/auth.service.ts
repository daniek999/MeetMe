// src/api/auth.service.ts
import api from "../../../api/_axios";
import type { AuthData, AuthResponse } from "../../../types";

export function apiAuthService() {
  const registerService = async (input: RegisterInput): Promise<AuthData> => {
    const { data } = await api.post<AuthResponse>("/auth/register", input);
    return data.data;
  };
  const loginService = async (input: LoginInput): Promise<AuthData> => {
    const { data } = await api.post<AuthResponse>("/auth/login", input);
    return data.data;
  };

  return {
    registerService,
    loginService,
  };
}

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}
interface LoginInput {
  email: string;
  password: string;
}
