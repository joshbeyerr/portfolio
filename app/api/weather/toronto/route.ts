import { NextResponse } from "next/server";

import { fetchTorontoWeather } from "@/lib/weather";

export async function GET() {
  try {
    const weather = await fetchTorontoWeather();

    return NextResponse.json(weather, {
      headers: {
        "Cache-Control": "s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to load Toronto weather." },
      { status: 502 },
    );
  }
}
