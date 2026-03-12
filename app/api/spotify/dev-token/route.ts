import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("spotify_pending_refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No pending Spotify refresh token found." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    refreshToken,
    note: "Copy this into SPOTIFY_REFRESH_TOKEN in .env, then restart the app.",
  });
}
