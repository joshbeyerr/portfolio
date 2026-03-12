import { NextResponse } from "next/server";

import {
  getSpotifyAccessToken,
  getSpotifyRefreshToken,
  isSpotifyConfigured,
} from "@/lib/spotify";

export async function GET() {
  if (!isSpotifyConfigured()) {
    return NextResponse.json(
      { error: "Spotify is not configured." },
      { status: 500 },
    );
  }

  const refreshToken = getSpotifyRefreshToken();

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Missing Spotify refresh token." },
      { status: 401 },
    );
  }

  try {
    const accessToken = await getSpotifyAccessToken(refreshToken);
    return NextResponse.json({ accessToken });
  } catch {
    return NextResponse.json(
      { error: "Unable to get Spotify access token." },
      { status: 401 },
    );
  }
}
