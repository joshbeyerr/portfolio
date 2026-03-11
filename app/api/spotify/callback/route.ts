import { NextRequest, NextResponse } from "next/server";

import {
  exchangeCodeForRefreshToken,
  isSpotifyConfigured,
} from "@/lib/spotify";

export async function GET(request: NextRequest) {
  if (!isSpotifyConfigured()) {
    return NextResponse.redirect(new URL("/?spotify=config-error", request.url));
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get("spotify_oauth_state")?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL("/?spotify=auth-error", request.url));
  }

  try {
    const refreshToken = await exchangeCodeForRefreshToken(
      code,
      request.nextUrl.origin,
    );

    const response = NextResponse.redirect(
      new URL("/?spotify=connected", request.url),
    );

    response.cookies.set("spotify_refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    response.cookies.delete("spotify_oauth_state");

    return response;
  } catch {
    return NextResponse.redirect(new URL("/?spotify=exchange-error", request.url));
  }
}
