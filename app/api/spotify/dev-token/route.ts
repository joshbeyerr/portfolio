import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production." }, { status: 404 });
  }

  const refreshToken = request.cookies.get("spotify_refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No spotify_refresh_token cookie found." },
      { status: 404 },
    );
  }

  return NextResponse.json({
    refreshToken,
    note: "Copy this into SPOTIFY_REFRESH_TOKEN in .env, then restart the app.",
  });
}
