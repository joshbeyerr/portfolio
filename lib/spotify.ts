const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshTokenFromEnv = process.env.SPOTIFY_REFRESH_TOKEN;
const redirectUriFromEnv = process.env.SPOTIFY_REDIRECT_URI;

const spotifyScopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
];

export type SpotifyPlayback = {
  isPlaying: boolean;
  trackId: string | null;
  trackUri: string | null;
  trackName: string;
  artistName: string;
  albumName: string;
  albumImageUrl: string | null;
  trackUrl: string | null;
  previewUrl: string | null;
  progressMs: number | null;
  durationMs: number | null;
  playedAt: string | null;
};

export function isSpotifyConfigured() {
  return Boolean(clientId && clientSecret);
}

export function getSpotifyAuthorizeUrl(origin: string, state: string) {
  if (!clientId) {
    throw new Error("Missing SPOTIFY_CLIENT_ID");
  }

  const url = new URL(`${SPOTIFY_ACCOUNTS_URL}/authorize`);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", getSpotifyRedirectUri(origin));
  url.searchParams.set("scope", spotifyScopes.join(" "));
  url.searchParams.set("state", state);

  return url.toString();
}

export function getSpotifyRedirectUri(origin: string) {
  return redirectUriFromEnv || `${origin}/api/spotify/callback`;
}

export function getSpotifyRefreshToken(cookieRefreshToken?: string) {
  return refreshTokenFromEnv || cookieRefreshToken || null;
}

function getBasicAuthHeader() {
  if (!clientId || !clientSecret) {
    throw new Error("Spotify environment variables are incomplete");
  }

  return Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
}

export async function exchangeCodeForRefreshToken(code: string, origin: string) {
  const response = await fetch(`${SPOTIFY_ACCOUNTS_URL}/api/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getBasicAuthHeader()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: getSpotifyRedirectUri(origin),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spotify code exchange failed: ${errorText}`);
  }

  const payload = (await response.json()) as {
    access_token: string;
    refresh_token?: string;
  };

  if (!payload.refresh_token) {
    throw new Error("Spotify did not return a refresh token");
  }

  return payload.refresh_token;
}

export async function refreshSpotifyAccessToken(refreshToken: string) {
  const response = await fetch(`${SPOTIFY_ACCOUNTS_URL}/api/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getBasicAuthHeader()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spotify token refresh failed: ${errorText}`);
  }

  const payload = (await response.json()) as { access_token: string };
  return payload.access_token;
}

function mapTrack(item: {
  is_playing?: boolean;
  progress_ms?: number;
  played_at?: string;
  item?: {
    id?: string;
    uri?: string;
    name: string;
    duration_ms: number;
    external_urls?: { spotify?: string };
    preview_url?: string | null;
    album?: {
      name: string;
      images?: { url: string }[];
    };
    artists?: { name: string }[];
  };
  track?: {
    id?: string;
    uri?: string;
    name: string;
    duration_ms: number;
    external_urls?: { spotify?: string };
    preview_url?: string | null;
    album?: {
      name: string;
      images?: { url: string }[];
    };
    artists?: { name: string }[];
  };
}): SpotifyPlayback | null {
  const track = item.item ?? item.track;

  if (!track) {
    return null;
  }

  return {
    isPlaying: Boolean(item.is_playing),
    trackId: track.id ?? null,
    trackUri: track.uri ?? null,
    trackName: track.name,
    artistName: track.artists?.map((artist) => artist.name).join(", ") ?? "Unknown artist",
    albumName: track.album?.name ?? "Unknown album",
    albumImageUrl: track.album?.images?.[0]?.url ?? null,
    trackUrl: track.external_urls?.spotify ?? null,
    previewUrl: track.preview_url ?? null,
    progressMs: item.progress_ms ?? null,
    durationMs: track.duration_ms ?? null,
    playedAt: item.played_at ?? null,
  };
}

export async function getSpotifyPlayback(refreshToken: string) {
  const accessToken = await refreshSpotifyAccessToken(refreshToken);

  const currentResponse = await fetch(
    `${SPOTIFY_API_URL}/me/player/currently-playing`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (currentResponse.status === 200) {
    const payload = (await currentResponse.json()) as {
      is_playing: boolean;
      progress_ms?: number;
      item?: {
        id?: string;
        uri?: string;
        name: string;
        duration_ms: number;
        external_urls?: { spotify?: string };
        preview_url?: string | null;
        album?: {
          name: string;
          images?: { url: string }[];
        };
        artists?: { name: string }[];
      };
    };

    const mapped = mapTrack(payload);
    if (mapped) {
      return mapped;
    }
  }

  if (currentResponse.status !== 204 && !currentResponse.ok) {
    const errorText = await currentResponse.text();
    throw new Error(`Spotify current playback failed: ${errorText}`);
  }

  const recentResponse = await fetch(
    `${SPOTIFY_API_URL}/me/player/recently-played?limit=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!recentResponse.ok) {
    const errorText = await recentResponse.text();
    throw new Error(`Spotify recent playback failed: ${errorText}`);
  }

  const recentPayload = (await recentResponse.json()) as {
    items?: Array<{
      played_at: string;
      track: {
        id?: string;
        uri?: string;
        name: string;
        duration_ms: number;
        external_urls?: { spotify?: string };
        preview_url?: string | null;
        album?: {
          name: string;
          images?: { url: string }[];
        };
        artists?: { name: string }[];
      };
    }>;
  };

  return mapTrack(recentPayload.items?.[0] ?? {});
}

export async function getSpotifyAccessToken(refreshToken: string) {
  return refreshSpotifyAccessToken(refreshToken);
}

export async function startSpotifyPlayback({
  refreshToken,
  deviceId,
  trackUri,
}: {
  refreshToken: string;
  deviceId: string;
  trackUri: string;
}) {
  const accessToken = await refreshSpotifyAccessToken(refreshToken);

  const transferResponse = await fetch(`${SPOTIFY_API_URL}/me/player`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      device_ids: [deviceId],
      play: false,
    }),
    cache: "no-store",
  });

  if (!transferResponse.ok && transferResponse.status !== 204) {
    const errorText = await transferResponse.text();
    throw new Error(`Spotify transfer playback failed: ${errorText}`);
  }

  const playResponse = await fetch(
    `${SPOTIFY_API_URL}/me/player/play?device_id=${encodeURIComponent(deviceId)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [trackUri],
      }),
      cache: "no-store",
    },
  );

  if (!playResponse.ok && playResponse.status !== 204) {
    const errorText = await playResponse.text();
    throw new Error(`Spotify start playback failed: ${errorText}`);
  }
}
