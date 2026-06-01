// src/modules/auth/services/auth.service.ts
import api from "../../../api/axios.js";
import type { AuthData, AuthResponse } from "../../../types/index.js";

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}
interface LoginInput {
  email: string;
  password: string;
}

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
