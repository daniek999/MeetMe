// src/api/statistic.service.ts
import api from "../../../api/_axios";
import type {
  ApiResponse,
  InteractionResult,
  InteractionStatus,
  PublicUser,
  Statistic,
} from "../../../types/index";

export function apiStatisticService() {
  const getPublicProfileService = async (
    username: string,
  ): Promise<PublicUser> => {
    const { data } = await api.get<ApiResponse<PublicUser>>(
      `/user/${username}`,
    );
    return data.data.item;
  };
  const getInteractionStatusService = async (
    userId: number,
  ): Promise<InteractionStatus> => {
    const { data } = await api.get<ApiResponse<InteractionStatus>>(
      `/statistic/${userId}/status`,
    );
    return data.data.item;
  };
  const toggleLikeService = async (
    userId: number,
  ): Promise<InteractionResult> => {
    const { data } = await api.post<ApiResponse<InteractionResult>>(
      `/statistic/${userId}/like`,
    );
    return data.data.item;
  };
  const toggleFollowService = async (
    userId: number,
  ): Promise<InteractionResult> => {
    const { data } = await api.post<ApiResponse<InteractionResult>>(
      `/statistic/${userId}/follow`,
    );
    return data.data.item;
  };
  const shareService = async (userId: number): Promise<Statistic> => {
    const { data } = await api.post<ApiResponse<Statistic>>(
      `/statistic/${userId}/share`,
    );
    return data.data.item;
  };

  return {
    getPublicProfileService,
    getInteractionStatusService,
    toggleLikeService,
    toggleFollowService,
    shareService,
  };
}
