import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { buildInstagramAuthorizeUrl } from "@/lib/instagram-oauth";

export async function GET(request: NextRequest) {
  try {
    const state = randomUUID();
    const cookieStore = await cookies();

    cookieStore.set("instagram_oauth_state", state, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10,
    });

    return NextResponse.redirect(buildInstagramAuthorizeUrl(state, request.nextUrl.origin));
  } catch (error) {
    console.error("Failed to start Instagram OAuth", error);
    const url = new URL("/integrations/instagram", "http://localhost");
    url.searchParams.set("error", "Unable to start Instagram connection.");
    return NextResponse.redirect(url);
  }
}
