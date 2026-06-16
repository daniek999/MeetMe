// src/api/profile.service.ts
import api from "../../../api/_axios";
import type { ApiResponse, User } from "../../../types";

export function apiProfileService() {
  const getMyProfileService = async (): Promise<User> => {
    const { data } = await api.get<ApiResponse<User>>("/user/me");
    return data.data.item;
  };
  const updateProfileService = async (
    input: UpdateProfileInput,
  ): Promise<User> => {
    const { data } = await api.patch<ApiResponse<User>>("/user/me", input);
    return data.data.item;
  };

  return {
    getMyProfileService,
    updateProfileService,
  };
}

interface UpdateProfileInput {
  displayName?: string;
  bio?: string;
  content?: string;
  avatarUrl?: string;
  bannerUrl?: string;
}
