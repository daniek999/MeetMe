// src/modules/profile/services/profile.service.ts
import api from "../../../api/axios.js";
import type {
  ApiResponse,
  InteractionResult,
  InteractionStatus,
  PublicUser,
  Statistic,
} from "../../../types/index.js";

export const getPublicProfileService = async (
  username: string,
): Promise<PublicUser> => {
  const { data } = await api.get<ApiResponse<PublicUser>>(`/user/${username}`);
  return data.data.item;
};

export const getInteractionStatusService = async (
  userId: number,
): Promise<InteractionStatus> => {
  const { data } = await api.get<ApiResponse<InteractionStatus>>(
    `/statistic/${userId}/status`,
  );
  return data.data.item;
};

export const toggleLikeService = async (
  userId: number,
): Promise<InteractionResult> => {
  const { data } = await api.post<ApiResponse<InteractionResult>>(
    `/statistic/${userId}/like`,
  );
  return data.data.item;
};

export const toggleFollowService = async (
  userId: number,
): Promise<InteractionResult> => {
  const { data } = await api.post<ApiResponse<InteractionResult>>(
    `/statistic/${userId}/follow`,
  );
  return data.data.item;
};

export const shareService = async (userId: number): Promise<Statistic> => {
  const { data } = await api.post<ApiResponse<Statistic>>(
    `/statistic/${userId}/share`,
  );
  return data.data.item;
};
