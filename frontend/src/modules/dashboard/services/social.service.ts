// src/modules/dashboard/services/social.service.ts
import api from "../../../api/axios.js";
import type { ApiResponse, Social } from "../../../types/index.js";

interface UpdateSocialInput {
  youtubeUrl?: string | null;
  twitterUrl?: string | null;
  patreonUrl?: string | null;
  discordUrl?: string | null;
  instagramUrl?: string | null;
  twitchUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
}

export function apiSocialService() {
  const getSocialService = async (): Promise<Social> => {
    const { data } = await api.get<ApiResponse<Social>>("/social");
    return data.data.item;
  };
  const updateSocialService = async (
    input: UpdateSocialInput,
  ): Promise<Social> => {
    const { data } = await api.patch<ApiResponse<Social>>("/social", input);
    return data.data.item;
  };

  return {
    getSocialService,
    updateSocialService,
  };
}
