import { env } from "@/lib/env";

export interface InstagramTokenExchangeResult {
  accessToken: string;
  tokenType?: string;
  expiresIn?: number;
}

export type InstagramLongLivedTokenResult = InstagramTokenExchangeResult;

export interface InstagramProfileResult {
  userId: string;
  username?: string;
}

export function getInstagramRedirectUri(baseUrl?: string) {
  return (
    env.INSTAGRAM_REDIRECT_URI ??
    `${(baseUrl ?? env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "")}/api/integrations/instagram/callback`
  );
}

export function getInstagramScopes() {
  return (env.INSTAGRAM_SCOPES ?? "")
    .split(",")
    .map((scope) => scope.trim())
    .filter(Boolean);
}

export function buildInstagramAuthorizeUrl(state: string, baseUrl?: string) {
  if (!env.INSTAGRAM_APP_ID) {
    throw new Error("Missing INSTAGRAM_APP_ID");
  }

  const url = new URL("https://www.instagram.com/oauth/authorize");
  url.searchParams.set("client_id", env.INSTAGRAM_APP_ID);
  url.searchParams.set("redirect_uri", getInstagramRedirectUri(baseUrl));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", getInstagramScopes().join(","));
  url.searchParams.set("state", state);

  return url.toString();
}

export async function exchangeInstagramCodeForToken(code: string, baseUrl?: string) {
  if (!env.INSTAGRAM_APP_ID || !env.INSTAGRAM_APP_SECRET) {
    throw new Error("Missing INSTAGRAM_APP_ID or INSTAGRAM_APP_SECRET");
  }

  const body = new URLSearchParams({
    client_id: env.INSTAGRAM_APP_ID,
    client_secret: env.INSTAGRAM_APP_SECRET,
    grant_type: "authorization_code",
    redirect_uri: getInstagramRedirectUri(baseUrl),
    code,
  });

  const response = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  const payload = await response.json();
  if (!response.ok || typeof payload?.access_token !== "string") {
    throw new Error(payload?.error_message || payload?.error?.message || "Instagram code exchange failed.");
  }

  return {
    accessToken: payload.access_token as string,
    tokenType: payload.token_type as string | undefined,
    expiresIn: typeof payload.expires_in === "number" ? payload.expires_in : undefined,
  } satisfies InstagramTokenExchangeResult;
}

export async function exchangeForLongLivedInstagramToken(accessToken: string) {
  if (!env.INSTAGRAM_APP_SECRET) {
    throw new Error("Missing INSTAGRAM_APP_SECRET");
  }

  const url = new URL("https://graph.instagram.com/access_token");
  url.searchParams.set("grant_type", "ig_exchange_token");
  url.searchParams.set("client_secret", env.INSTAGRAM_APP_SECRET);
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const payload = await response.json();
  if (!response.ok || typeof payload?.access_token !== "string") {
    throw new Error(payload?.error?.message || "Instagram long-lived token exchange failed.");
  }

  return {
    accessToken: payload.access_token as string,
    tokenType: payload.token_type as string | undefined,
    expiresIn: typeof payload.expires_in === "number" ? payload.expires_in : undefined,
  } satisfies InstagramLongLivedTokenResult;
}

export async function fetchInstagramProfile(accessToken: string, apiVersion = "v23.0") {
  const url = new URL(`https://graph.instagram.com/${apiVersion}/me`);
  url.searchParams.set("fields", "user_id,username");
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const payload = await response.json();
  const userId = payload?.user_id ?? payload?.id;

  if (!response.ok || typeof userId !== "string") {
    throw new Error(payload?.error?.message || "Unable to fetch Instagram profile.");
  }

  return {
    userId,
    username: typeof payload?.username === "string" ? payload.username : undefined,
  } satisfies InstagramProfileResult;
}
