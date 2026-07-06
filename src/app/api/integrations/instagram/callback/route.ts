import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  exchangeForLongLivedInstagramToken,
  exchangeInstagramCodeForToken,
  fetchInstagramProfile,
} from "@/lib/instagram-oauth";
import { env } from "@/lib/env";

function createAppUrl(pathname: string, origin: string) {
  return new URL(pathname, origin || env.NEXT_PUBLIC_SITE_URL);
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("instagram_oauth_state")?.value;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  const errorReason = request.nextUrl.searchParams.get("error_reason");
  const errorDescription = request.nextUrl.searchParams.get("error_description");

  if (error) {
    const redirectUrl = createAppUrl("/integrations/instagram", request.nextUrl.origin);
    redirectUrl.searchParams.set(
      "error",
      errorDescription || errorReason || "Instagram authorization was cancelled."
    );
    return NextResponse.redirect(redirectUrl);
  }

  if (!code || !state || !expectedState || state !== expectedState) {
    const redirectUrl = createAppUrl("/integrations/instagram", request.nextUrl.origin);
    redirectUrl.searchParams.set("error", "Instagram returned an invalid or expired OAuth state.");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const shortLived = await exchangeInstagramCodeForToken(code, request.nextUrl.origin);
    const longLived = await exchangeForLongLivedInstagramToken(shortLived.accessToken);
    const profile = await fetchInstagramProfile(longLived.accessToken);

    const response = NextResponse.redirect(
      createAppUrl("/integrations/instagram/success", request.nextUrl.origin)
    );
    response.cookies.set("instagram_oauth_state", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    response.cookies.set(
      "instagram_oauth_result",
      JSON.stringify({
        accessToken: longLived.accessToken,
        igUserId: profile.userId,
        username: profile.username,
        expiresIn: longLived.expiresIn,
        scopes: env.INSTAGRAM_SCOPES ?? "",
        capturedAt: new Date().toISOString(),
      }),
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      }
    );

    return response;
  } catch (exchangeError) {
    console.error("Instagram OAuth callback failed", exchangeError);
    const redirectUrl = createAppUrl("/integrations/instagram", request.nextUrl.origin);
    redirectUrl.searchParams.set(
      "error",
      exchangeError instanceof Error ? exchangeError.message : "Instagram token exchange failed."
    );
    return NextResponse.redirect(redirectUrl);
  }
}
