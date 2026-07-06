import axios, { type AxiosInstance } from 'axios';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import type { PlatformEnvironment, PlatformName } from './config';

export interface PublishJob {
  id: string;
  platform: PlatformName;
  scheduledAt: string;
  contentId: string;
  dryRun?: boolean;
  title: string;
  description?: string;
  caption?: string;
  mediaType?: string;
  mediaUrl?: string;
  sourceFilePath?: string;
  externalReferenceUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface PublishResult {
  platform: PlatformName;
  externalId?: string;
  externalUrl?: string;
  success: boolean;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsRequest {
  platform: PlatformName;
  externalId?: string;
  externalUrl?: string;
  publishedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsSnapshot {
  platform: PlatformName;
  externalId?: string;
  fetchedAt: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  profileVisits?: number;
  linkClicks?: number;
  conversions?: number;
  revenue?: number;
  ctr?: number;
  raw?: Record<string, unknown>;
}

export interface AdapterHealth {
  platform: PlatformName;
  enabled: boolean;
  configured: boolean;
  mode: 'live' | 'stub';
  issues: string[];
}

export interface PlatformAdapter {
  platform: PlatformName;
  getHealth(): AdapterHealth;
  publish(job: PublishJob): Promise<PublishResult>;
  fetchAnalytics(request: AnalyticsRequest): Promise<AnalyticsSnapshot | null>;
}

class PlatformAdapterError extends Error {
  constructor(
    message: string,
    readonly code: 'blocked' | 'config' | 'unsupported' | 'request',
    readonly retryable: boolean,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'PlatformAdapterError';
  }
}

function createJsonClient(baseURL: string, token: string): AxiosInstance {
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    timeout: 30_000
  });
}

function normalizeCount(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function inferInstagramMediaKind(job: PublishJob) {
  const hint = (job.mediaType ?? '').toLowerCase();
  const source = (job.mediaUrl ?? '').toLowerCase();

  if (hint.includes('video') || hint.includes('reel') || /\.mp4($|\?)/.test(source) || /\.mov($|\?)/.test(source)) {
    return 'video';
  }

  return 'image';
}

function inferMimeType(filePath: string) {
  const extension = extname(filePath).toLowerCase();
  if (extension === '.mp4') return 'video/mp4';
  if (extension === '.mov') return 'video/quicktime';
  if (extension === '.m4v') return 'video/x-m4v';
  return 'application/octet-stream';
}

function buildYouTubeExternalUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function buildInstagramExternalUrl(permalink?: string, mediaId?: string) {
  return permalink ?? (mediaId ? `https://www.instagram.com/p/${mediaId}/` : undefined);
}

export class StubPlatformClient implements PlatformAdapter {
  readonly platform: PlatformName;

  constructor(platform: PlatformName) {
    this.platform = platform;
  }

  getHealth(): AdapterHealth {
    return {
      platform: this.platform,
      enabled: false,
      configured: false,
      mode: 'stub',
      issues: ['Platform adapter is not configured.']
    };
  }

  async publish(job: PublishJob): Promise<PublishResult> {
    return {
      platform: job.platform,
      success: true,
      externalId: `stub-${job.platform}-${job.id}`,
      metadata: {
        scheduledAt: job.scheduledAt,
        stub: true
      }
    };
  }

  async fetchAnalytics(request: AnalyticsRequest): Promise<AnalyticsSnapshot | null> {
    return {
      platform: request.platform,
      externalId: request.externalId,
      fetchedAt: new Date().toISOString(),
      raw: { stub: true }
    };
  }
}

export class InstagramAdapter implements PlatformAdapter {
  readonly platform = 'instagram' as const;
  private readonly config;
  private readonly client?: AxiosInstance;

  constructor(environment: PlatformEnvironment['instagram']) {
    this.config = environment;
    if (environment.accessToken) {
      this.client = createJsonClient('https://graph.instagram.com', environment.accessToken);
    }
  }

  getHealth(): AdapterHealth {
    const issues: string[] = [];
    if (!this.config.enabled) issues.push('INSTAGRAM_ENABLED is false.');
    if (!this.config.accessToken) issues.push('Missing INSTAGRAM_ACCESS_TOKEN.');
    if (!this.config.igUserId) issues.push('Missing INSTAGRAM_IG_USER_ID.');

    return {
      platform: this.platform,
      enabled: this.config.enabled,
      configured: issues.length === 0,
      mode: issues.length === 0 ? 'live' : 'stub',
      issues
    };
  }

  async publish(job: PublishJob): Promise<PublishResult> {
    const health = this.getHealth();
    if (!health.configured || !this.client || !this.config.igUserId) {
      throw new PlatformAdapterError(health.issues.join(' '), 'config', false);
    }

    if (!job.mediaUrl) {
      throw new PlatformAdapterError('Instagram publishing requires a public mediaUrl.', 'blocked', false);
    }

    if (job.dryRun) {
      return {
        platform: this.platform,
        success: true,
        externalId: `dryrun-instagram-${job.id}`,
        metadata: { dryRun: true, mediaUrl: job.mediaUrl }
      };
    }

    const mediaKind = inferInstagramMediaKind(job);
    const params = new URLSearchParams();
    params.set('caption', job.caption ?? job.description ?? '');
    if (mediaKind === 'video') {
      params.set('media_type', 'REELS');
      params.set('video_url', job.mediaUrl);
    } else {
      params.set('image_url', job.mediaUrl);
    }

    const createResponse = await this.client.post(
      `/${this.config.apiVersion}/${this.config.igUserId}/media`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const creationId = createResponse.data?.id as string | undefined;
    if (!creationId) {
      throw new PlatformAdapterError('Instagram media container creation did not return an id.', 'request', true, {
        response: createResponse.data
      });
    }

    const publishParams = new URLSearchParams();
    publishParams.set('creation_id', creationId);
    const publishResponse = await this.client.post(
      `/${this.config.apiVersion}/${this.config.igUserId}/media_publish`,
      publishParams.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const mediaId = publishResponse.data?.id as string | undefined;
    let permalink: string | undefined;
    if (mediaId) {
      const permalinkResponse = await this.client.get(`/${this.config.apiVersion}/${mediaId}`, {
        params: {
          fields: 'permalink'
        }
      });
      permalink = permalinkResponse.data?.permalink;
    }

    return {
      platform: this.platform,
      success: true,
      externalId: mediaId,
      externalUrl: buildInstagramExternalUrl(permalink, mediaId),
      metadata: {
        creationId
      }
    };
  }

  async fetchAnalytics(request: AnalyticsRequest): Promise<AnalyticsSnapshot | null> {
    const health = this.getHealth();
    if (!health.configured || !this.client || !request.externalId) {
      return null;
    }

    const response = await this.client.get(`/${this.config.apiVersion}/${request.externalId}/insights`, {
      params: {
        metric: 'views,likes,comments,shares,reach'
      }
    });

    const values = Array.isArray(response.data?.data) ? response.data.data : [];
    const metrics = new Map<string, number>();
    for (const entry of values) {
      metrics.set(entry.name, normalizeCount(entry.values?.[0]?.value));
    }

    return {
      platform: this.platform,
      externalId: request.externalId,
      fetchedAt: new Date().toISOString(),
      views: metrics.get('views') ?? metrics.get('reach') ?? 0,
      likes: metrics.get('likes') ?? 0,
      comments: metrics.get('comments') ?? 0,
      shares: metrics.get('shares') ?? 0,
      raw: response.data
    };
  }
}

export class TikTokAdapter implements PlatformAdapter {
  readonly platform = 'tiktok' as const;
  private readonly config;
  private readonly client?: AxiosInstance;

  constructor(environment: PlatformEnvironment['tiktok']) {
    this.config = environment;
    if (environment.accessToken) {
      this.client = createJsonClient('https://open.tiktokapis.com', environment.accessToken);
    }
  }

  getHealth(): AdapterHealth {
    const issues: string[] = [];
    if (!this.config.enabled) issues.push('TIKTOK_ENABLED is false.');
    if (!this.config.accessToken) issues.push('Missing TIKTOK_ACCESS_TOKEN.');

    return {
      platform: this.platform,
      enabled: this.config.enabled,
      configured: issues.length === 0,
      mode: issues.length === 0 ? 'live' : 'stub',
      issues
    };
  }

  async publish(job: PublishJob): Promise<PublishResult> {
    const health = this.getHealth();
    if (!health.configured || !this.client) {
      throw new PlatformAdapterError(health.issues.join(' '), 'config', false);
    }

    if (!job.mediaUrl) {
      throw new PlatformAdapterError('TikTok publishing requires a public mediaUrl.', 'blocked', false);
    }

    if (job.dryRun) {
      return {
        platform: this.platform,
        success: true,
        externalId: `dryrun-tiktok-${job.id}`,
        metadata: { dryRun: true, mediaUrl: job.mediaUrl }
      };
    }

    const creatorInfo = await this.client.post('/v2/post/publish/creator_info/query/', {});
    const privacyOptions = creatorInfo.data?.data?.privacy_level_options;
    const privacyLevel = Array.isArray(privacyOptions) && privacyOptions.length > 0 ? privacyOptions[0] : 'SELF_ONLY';

    const response = await this.client.post('/v2/post/publish/content/init/', {
      post_info: {
        title: job.title.slice(0, 90),
        description: (job.caption ?? job.description ?? '').slice(0, 2200),
        privacy_level: privacyLevel,
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false
      },
      source_info: {
        source: 'PULL_FROM_URL',
        video_url: job.mediaUrl
      },
      post_mode: this.config.postMode
    });

    const publishId = response.data?.data?.publish_id as string | undefined;

    return {
      platform: this.platform,
      success: true,
      externalId: publishId,
      metadata: response.data
    };
  }

  async fetchAnalytics(request: AnalyticsRequest): Promise<AnalyticsSnapshot | null> {
    const health = this.getHealth();
    if (!health.configured || !this.client || !request.externalId) {
      return null;
    }

    const response = await this.client.post('/v2/video/query/', {
      filters: {
        video_ids: [request.externalId]
      }
    }, {
      params: {
        fields: 'id,like_count,comment_count,share_count,view_count'
      }
    });

    const video = response.data?.data?.videos?.[0];
    if (!video) return null;

    return {
      platform: this.platform,
      externalId: request.externalId,
      fetchedAt: new Date().toISOString(),
      views: normalizeCount(video.view_count),
      likes: normalizeCount(video.like_count),
      comments: normalizeCount(video.comment_count),
      shares: normalizeCount(video.share_count),
      raw: response.data
    };
  }
}

export class YouTubeAdapter implements PlatformAdapter {
  readonly platform = 'youtube' as const;
  private readonly config;
  private readonly client?: AxiosInstance;

  constructor(environment: PlatformEnvironment['youtube']) {
    this.config = environment;
    if (environment.accessToken) {
      this.client = createJsonClient('https://www.googleapis.com', environment.accessToken);
    }
  }

  getHealth(): AdapterHealth {
    const issues: string[] = [];
    if (!this.config.enabled) issues.push('YOUTUBE_ENABLED is false.');
    if (!this.config.accessToken) issues.push('Missing YOUTUBE_ACCESS_TOKEN.');
    if (!this.config.channelId) issues.push('Missing YOUTUBE_CHANNEL_ID.');

    return {
      platform: this.platform,
      enabled: this.config.enabled,
      configured: issues.length === 0,
      mode: issues.length === 0 ? 'live' : 'stub',
      issues
    };
  }

  async publish(job: PublishJob): Promise<PublishResult> {
    const health = this.getHealth();
    if (!health.configured || !this.client || !this.config.channelId) {
      throw new PlatformAdapterError(health.issues.join(' '), 'config', false);
    }

    if (!job.sourceFilePath) {
      throw new PlatformAdapterError(
        'YouTube publishing requires metadata.sourceFilePath in the queue item attemptDetails.',
        'blocked',
        false
      );
    }

    if (job.dryRun) {
      return {
        platform: this.platform,
        success: true,
        externalId: `dryrun-youtube-${job.id}`,
        metadata: { dryRun: true, sourceFilePath: job.sourceFilePath }
      };
    }

    const fileStats = await stat(job.sourceFilePath);
    const mimeType = inferMimeType(job.sourceFilePath);

    const sessionResponse = await this.client.post(
      '/upload/youtube/v3/videos',
      {
        snippet: {
          title: job.title,
          description: job.description ?? job.caption ?? '',
          channelId: this.config.channelId
        },
        status: {
          privacyStatus: this.config.privacyStatus
        }
      },
      {
        params: {
          uploadType: 'resumable',
          part: 'snippet,status'
        },
        headers: {
          'X-Upload-Content-Length': fileStats.size,
          'X-Upload-Content-Type': mimeType
        }
      }
    );

    const uploadUrl = sessionResponse.headers.location as string | undefined;
    if (!uploadUrl) {
      throw new PlatformAdapterError('YouTube resumable upload did not return an upload URL.', 'request', true, {
        response: sessionResponse.data
      });
    }

    const uploadResponse = await axios.put(uploadUrl, createReadStream(job.sourceFilePath), {
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
        'Content-Type': mimeType,
        'Content-Length': fileStats.size
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 120_000
    });

    const videoId = uploadResponse.data?.id as string | undefined;
    const fileName = basename(job.sourceFilePath);

    return {
      platform: this.platform,
      success: true,
      externalId: videoId,
      externalUrl: videoId ? buildYouTubeExternalUrl(videoId) : undefined,
      metadata: {
        uploadUrl,
        fileName
      }
    };
  }

  async fetchAnalytics(request: AnalyticsRequest): Promise<AnalyticsSnapshot | null> {
    const health = this.getHealth();
    if (!health.configured || !this.client || !this.config.channelId || !request.externalId) {
      return null;
    }

    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 7);

    const response = await this.client.get('/youtube/analytics/v2/reports', {
      params: {
        ids: `channel==${this.config.channelId}`,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        dimensions: 'video',
        filters: `video==${request.externalId}`,
        metrics: 'views,likes,comments,shares',
        maxResults: 1
      }
    });

    const row = response.data?.rows?.[0];
    if (!Array.isArray(row)) return null;

    return {
      platform: this.platform,
      externalId: request.externalId,
      fetchedAt: new Date().toISOString(),
      views: normalizeCount(row[1]),
      likes: normalizeCount(row[2]),
      comments: normalizeCount(row[3]),
      shares: normalizeCount(row[4]),
      raw: response.data
    };
  }
}

export function createPlatformAdapters(environment: PlatformEnvironment): Record<PlatformName, PlatformAdapter> {
  return {
    instagram: environment.instagram.enabled
      ? new InstagramAdapter(environment.instagram)
      : new StubPlatformClient('instagram'),
    youtube: environment.youtube.enabled
      ? new YouTubeAdapter(environment.youtube)
      : new StubPlatformClient('youtube'),
    tiktok: environment.tiktok.enabled ? new TikTokAdapter(environment.tiktok) : new StubPlatformClient('tiktok'),
    linkedin: new StubPlatformClient('linkedin')
  };
}

export { PlatformAdapterError, normalizeCount };
