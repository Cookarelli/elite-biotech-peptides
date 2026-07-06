export type PlatformName = 'instagram' | 'youtube' | 'tiktok' | 'linkedin';

export interface InstagramConfig {
  enabled: boolean;
  accessToken?: string;
  igUserId?: string;
  apiVersion: string;
}

export interface YouTubeConfig {
  enabled: boolean;
  accessToken?: string;
  channelId?: string;
  privacyStatus: 'private' | 'unlisted' | 'public';
}

export interface TikTokConfig {
  enabled: boolean;
  accessToken?: string;
  postMode: 'DIRECT_POST' | 'MEDIA_UPLOAD';
}

export interface PlatformEnvironment {
  instagram: InstagramConfig;
  youtube: YouTubeConfig;
  tiktok: TikTokConfig;
}

function isTruthy(value?: string) {
  return value === '1' || value === 'true' || value === 'yes';
}

export function readPlatformEnvironment(env: NodeJS.ProcessEnv = process.env): PlatformEnvironment {
  return {
    instagram: {
      enabled: isTruthy(env.INSTAGRAM_ENABLED),
      accessToken: env.INSTAGRAM_ACCESS_TOKEN?.trim(),
      igUserId: env.INSTAGRAM_IG_USER_ID?.trim(),
      apiVersion: env.INSTAGRAM_API_VERSION?.trim() || 'v23.0'
    },
    youtube: {
      enabled: isTruthy(env.YOUTUBE_ENABLED),
      accessToken: env.YOUTUBE_ACCESS_TOKEN?.trim(),
      channelId: env.YOUTUBE_CHANNEL_ID?.trim(),
      privacyStatus:
        (env.YOUTUBE_DEFAULT_PRIVACY_STATUS?.trim().toLowerCase() as
          | 'private'
          | 'unlisted'
          | 'public'
          | undefined) || 'private'
    },
    tiktok: {
      enabled: isTruthy(env.TIKTOK_ENABLED),
      accessToken: env.TIKTOK_ACCESS_TOKEN?.trim(),
      postMode:
        (env.TIKTOK_POST_MODE?.trim().toUpperCase() as 'DIRECT_POST' | 'MEDIA_UPLOAD' | undefined) ||
        'DIRECT_POST'
    }
  };
}
