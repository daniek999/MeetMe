// src/types/index.ts
export type UserRole = "user" | "admin";
export type UserStatus = "enabled" | "suspended" | "banned";
export type Layout = "classic" | "minimal" | "bold";

// ─── Wrapper de respuesta base ────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    item: T;
  };
}

export interface User {
  id: number;
  username: string;
  displayName?: string;
  email: string;
  bio?: string;
  content?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  social?: Social;
  statistic?: Statistic;
  theme?: Theme;
}

export interface PublicUser {
  id: number;
  username: string;
  displayName?: string;
  bio?: string;
  content?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  social?: Social;
  statistic?: Statistic;
  theme?: Theme;
}

export interface Social {
  id: number;
  userId: number;
  youtubeUrl?: string;
  twitterUrl?: string;
  patreonUrl?: string;
  discordUrl?: string;
  instagramUrl?: string;
  twitchUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Statistic {
  id: number;
  userId: number;
  views: number;
  likes: number;
  follows: number;
  shares: number;
}

export interface Theme {
  id: number;
  userId: number;
  primaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  layout: Layout; /** Eliminar */
  updatedAt?: string;
}

export interface InteractionStatus {
  liked: boolean;
  followed: boolean;
}

export interface InteractionResult {
  active: boolean;
  type: "like" | "follow";
}

export interface AuthItem {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface AuthData {
  item: AuthItem;
  token: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}
