"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type TokenState =
  | { status: "loading"; token: null; error: null }
  | { status: "ready"; token: string; error: null }
  | { status: "error"; token: null; error: string };

export function SpotifyTokenView() {
  const [state, setState] = useState<TokenState>({
    status: "loading",
    token: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadToken() {
      try {
        const response = await fetch("/api/spotify/dev-token", {
          cache: "no-store",
        });
        const payload = (await response.json()) as {
          refreshToken?: string;
          error?: string;
        };

        if (cancelled) {
          return;
        }

        if (!response.ok || !payload.refreshToken) {
          setState({
            status: "error",
            token: null,
            error: payload.error ?? "No pending Spotify refresh token found.",
          });
          return;
        }

        setState({
          status: "ready",
          token: payload.refreshToken,
          error: null,
        });
      } catch {
        if (cancelled) {
          return;
        }

        setState({
          status: "error",
          token: null,
          error: "Unable to load the Spotify refresh token.",
        });
      }
    }

    void loadToken();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="spotify-token-page">
      <section className="spotify-token-card">
        <p className="spotify-token-eyebrow">Spotify OAuth complete</p>
        <h1 className="spotify-token-title">Copy your refresh token</h1>
        <p className="spotify-token-body">
          Paste this into <code>SPOTIFY_REFRESH_TOKEN</code> for the environment
          you want to use, then restart the app or redeploy the site.
        </p>

        {state.status === "loading" ? (
          <div className="spotify-token-box" aria-live="polite">
            Loading refresh token...
          </div>
        ) : null}

        {state.status === "ready" ? (
          <textarea
            readOnly
            className="spotify-token-box"
            value={state.token}
            aria-label="Spotify refresh token"
            onFocus={(event) => event.currentTarget.select()}
          />
        ) : null}

        {state.status === "error" ? (
          <div className="spotify-token-box spotify-token-box-error" aria-live="polite">
            {state.error}
          </div>
        ) : null}

        <div className="spotify-token-actions">
          <Link href="/" className="spotify-token-link">
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
