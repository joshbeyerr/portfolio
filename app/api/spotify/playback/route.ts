import { NextRequest, NextResponse } from "next/server";

import {
  getSpotifyRefreshToken,
  isSpotifyConfigured,
  startSpotifyPlayback,
} from "@/lib/spotify";

export async function POST(request: NextRequest) {
  if (!isSpotifyConfigured()) {
    return NextResponse.json(
      { error: "Spotify is not configured." },
      { status: 500 },
    );
  }

  const refreshToken = getSpotifyRefreshToken(
    request.cookies.get("spotify_refresh_token")?.value,
  );

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Missing Spotify refresh token." },
      { status: 401 },
    );
  }

  const payload = (await request.json()) as {
    action?: string;
    deviceId?: string;
    trackUri?: string;
  };

  if (payload.action !== "play" || !payload.deviceId || !payload.trackUri) {
    return NextResponse.json(
      { error: "Invalid playback request." },
      { status: 400 },
    );
  }

  try {
    await startSpotifyPlayback({
      refreshToken,
      deviceId: payload.deviceId,
      trackUri: payload.trackUri,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to start Spotify playback." },
      { status: 502 },
    );
  }
}
