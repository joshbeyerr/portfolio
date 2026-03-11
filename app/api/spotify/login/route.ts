import { randomUUID } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { getSpotifyAuthorizeUrl, isSpotifyConfigured } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  if (!isSpotifyConfigured()) {
    return NextResponse.json(
      { error: "Spotify is not configured on the server." },
      { status: 500 },
    );
  }

  const state = randomUUID();
  const origin = request.nextUrl.origin;
  const redirectUrl = getSpotifyAuthorizeUrl(origin, state);

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
