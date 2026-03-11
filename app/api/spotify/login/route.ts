import { randomUUID } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import {
  getSpotifyAuthorizeUrl,
  getSpotifyRedirectUri,
  isSpotifyConfigured,
} from "@/lib/spotify";

export async function GET(request: NextRequest) {
  if (!isSpotifyConfigured()) {
    return NextResponse.json(
      { error: "Spotify is not configured on the server." },
      { status: 500 },
    );
  }

  const requestOrigin = request.nextUrl.origin;
  const redirectOrigin = new URL(getSpotifyRedirectUri(requestOrigin)).origin;

  // Force the OAuth flow onto the same host as the registered redirect URI.
  // This avoids localhost <-> 127.0.0.1 cookie/state mismatches during auth.
  if (requestOrigin !== redirectOrigin) {
    return NextResponse.redirect(`${redirectOrigin}/api/spotify/login`);
  }

  const state = randomUUID();
  const redirectUrl = getSpotifyAuthorizeUrl(requestOrigin, state);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set("spotify_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
