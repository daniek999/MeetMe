// src/modules/user/user.type.ts

export interface UpdateProfileInput {
  displayName?: string;
  bio?: string;
  content?: string;
  avatarUrl?: string;
  bannerUrl?: string;
}
