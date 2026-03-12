import { NextResponse } from "next/server";

import {
  getSpotifyRefreshToken,
  getSpotifyPlayback,
  isSpotifyConfigured,
} from "@/lib/spotify";

export async function GET() {
  if (!isSpotifyConfigured()) {
    return NextResponse.json(
      {
        connected: false,
        error: "Spotify is not configured.",
      },
      { status: 500 },
    );
  }

  const refreshToken = getSpotifyRefreshToken();

  if (!refreshToken) {
    return NextResponse.json({
      connected: false,
      needsAuth: true,
    });
  }

  try {
    const playback = await getSpotifyPlayback(refreshToken);

    if (!playback) {
      return NextResponse.json({
        connected: true,
        playback: null,
      });
    }

    return NextResponse.json({
      connected: true,
      playback,
    });
  } catch {
    return NextResponse.json(
      {
        connected: false,
        needsAuth: true,
      },
      { status: 401 },
    );
  }
}
