import { readdir } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const albumDirectory = path.join(process.cwd(), "public", "album");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export async function GET() {
  try {
    const entries = await readdir(albumDirectory, { withFileTypes: true });
    const images = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => imageExtensions.has(path.extname(name).toLowerCase()))
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
      .map((name) => `/album/${encodeURIComponent(name)}`);

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
