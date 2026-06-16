// src/api/theme.service.ts
import api from "../../../api/_axios";
import type { ApiResponse, Theme } from "../../../types";

export function apiThemeService() {
  const getThemeService = async (): Promise<Theme> => {
    const { data } = await api.get<ApiResponse<Theme>>("/theme");
    return data.data.item;
  };
  const updateThemeService = async (
    input: UpdateThemeInput,
  ): Promise<Theme> => {
    const { data } = await api.patch<ApiResponse<Theme>>("/theme", input);
    return data.data.item;
  };

  return {
    getThemeService,
    updateThemeService,
  };
}

interface UpdateThemeInput {
  primaryColor?: string | null;
  backgroundColor?: string | null;
  fontFamily?: string | null;
  layout?: string | null;
}
