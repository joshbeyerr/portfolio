"use client";

import Link from "next/link";
import {
  Ban,
  Crosshair,
  Globe,
  Grab,
  Heart,
  Moon,
  MousePointer2,
  Music3,
  Orbit,
  ScanSearch,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { navigationItems, type CursorMode } from "@/lib/site-data";

type TopChromeProps = {
  activePath: string;
};

type SpotifyStatusResponse = {
  connected: boolean;
  needsAuth?: boolean;
  playback?: {
    isPlaying: boolean;
    trackName: string;
    artistName: string;
    albumName: string;
    albumImageUrl: string | null;
    trackUrl: string | null;
    progressMs: number | null;
    durationMs: number | null;
    playedAt: string | null;
  } | null;
};

const cursorStyleMap: Record<CursorMode, string> = {
  default: "default",
  crosshair: "crosshair",
  grab: "grab",
  zoom: "zoom-in",
  alias: "alias",
  "not-allowed": "not-allowed",
};

const cursorOptions: {
  id: CursorMode;
  label: string;
  icon: typeof MousePointer2;
}[] = [
  { id: "default", label: "Default pointer", icon: MousePointer2 },
  { id: "crosshair", label: "Crosshair target", icon: Crosshair },
  { id: "grab", label: "Grab hand", icon: Grab },
  { id: "zoom", label: "Zoom lens", icon: ScanSearch },
  { id: "alias", label: "Orbit alias", icon: Orbit },
  { id: "not-allowed", label: "Block cursor", icon: Ban },
];

export function TopChrome({ activePath }: TopChromeProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("portfolio-theme") === "dark"
        ? "dark"
        : "light";
    }

    return "light";
  });
  const [activeTool, setActiveTool] = useState<"globe" | "cursor" | "music">(
    "globe",
  );
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [spotifyState, setSpotifyState] = useState<{
    loading: boolean;
    connected: boolean;
    needsAuth: boolean;
    playback: SpotifyStatusResponse["playback"];
  }>({
    loading: false,
    connected: false,
    needsAuth: false,
    playback: null,
  });

  useEffect(() => {
    document.body.style.cursor = cursorStyleMap[cursorMode];

    return () => {
      document.body.style.cursor = "default";
    };
  }, [cursorMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (activeTool !== "music") {
      return;
    }

    let cancelled = false;

    async function loadSpotifyStatus() {
      setSpotifyState((current) => ({
        ...current,
        loading: true,
      }));

      try {
        const response = await fetch("/api/spotify/status", {
          cache: "no-store",
        });
        const payload = (await response.json()) as SpotifyStatusResponse;

        if (cancelled) {
          return;
        }

        setSpotifyState({
          loading: false,
          connected: Boolean(payload.connected),
          needsAuth: Boolean(payload.needsAuth),
          playback: payload.playback ?? null,
        });
      } catch {
        if (cancelled) {
          return;
        }

        setSpotifyState({
          loading: false,
          connected: false,
          needsAuth: true,
          playback: null,
        });
      }
    }

    void loadSpotifyStatus();

    return () => {
      cancelled = true;
    };
  }, [activeTool]);

  const tickerText = useMemo(
    () =>
      [
        "Hi, this is Josh's portfolio page - welcome.",
        "Built as a living creative tool and project canvas.",
      ].join("        "),
    [],
  );

  const handleThemeToggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const playbackProgress =
    spotifyState.playback?.progressMs && spotifyState.playback?.durationMs
      ? Math.min(
          100,
          Math.round(
            (spotifyState.playback.progressMs /
              spotifyState.playback.durationMs) *
              100,
          ),
        )
      : 0;

  return (
    <header className="landing-topbar">
      <div className="landing-leftbar">
        <div className="landing-heartbox" aria-hidden="true">
          <Heart className="h-[11px] w-[11px] fill-current" strokeWidth={1.8} />
        </div>
        <nav className="landing-nav" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`landing-nav-link ${item.href === activePath ? "landing-nav-link-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="landing-centerbar">
        {activeTool === "globe" ? (
          <div className="ticker-shell" aria-label="Status ticker">
            <div className="ticker-track">
              <span>{tickerText}</span>
              <span aria-hidden="true">{tickerText}</span>
            </div>
          </div>
        ) : null}

        {activeTool === "cursor" ? (
          <div className="center-panel cursor-panel" aria-label="Cursor choices">
            {cursorOptions.map((option) => {
              const Icon = option.icon;
              const isActive = cursorMode === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  className={`cursor-choice ${isActive ? "cursor-choice-active" : ""}`}
                  onClick={() => setCursorMode(option.id)}
                  aria-label={option.label}
                  title={option.label}
                >
                  <Icon className="h-[13px] w-[13px]" strokeWidth={1.75} />
                </button>
              );
            })}
          </div>
        ) : null}

        {activeTool === "music" ? (
          <div className="center-panel music-panel" aria-label="Now listening">
            {spotifyState.loading ? (
              <div className="music-panel-copy">
                <p className="music-panel-label">Spotify</p>
                <p className="music-panel-title">Loading current playback...</p>
                <p className="music-panel-meta">
                  Checking what Josh is listening to.
                </p>
              </div>
            ) : null}

            {!spotifyState.loading && spotifyState.needsAuth ? (
              <>
                <div className="music-panel-copy">
                  <p className="music-panel-label">Spotify</p>
                  <p className="music-panel-title">Connect Spotify</p>
                  <p className="music-panel-meta">
                    Authorize once to show current or recent playback.
                  </p>
                </div>
                <Link href="/api/spotify/login" className="music-panel-connect">
                  Connect
                </Link>
              </>
            ) : null}

            {!spotifyState.loading &&
            spotifyState.connected &&
            spotifyState.playback ? (
              <>
                {spotifyState.playback.albumImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={spotifyState.playback.albumImageUrl}
                    alt={`${spotifyState.playback.albumName} cover art`}
                    className="music-panel-art"
                  />
                ) : null}
                <div className="music-panel-copy">
                  <p className="music-panel-label">
                    {spotifyState.playback.isPlaying
                      ? "Now listening"
                      : "Recently played"}
                  </p>
                  <p className="music-panel-title">
                    {spotifyState.playback.trackName}
                  </p>
                  <p className="music-panel-meta">
                    {spotifyState.playback.artistName} -{" "}
                    {spotifyState.playback.albumName}
                  </p>
                </div>
                <div className="music-panel-right">
                  <div className="music-panel-progress" aria-hidden="true">
                    <span style={{ width: `${playbackProgress}%` }} />
                  </div>
                  {spotifyState.playback.trackUrl ? (
                    <Link
                      href={spotifyState.playback.trackUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="music-panel-open"
                    >
                      Open
                    </Link>
                  ) : null}
                </div>
              </>
            ) : null}

            {!spotifyState.loading &&
            spotifyState.connected &&
            !spotifyState.playback ? (
              <div className="music-panel-copy">
                <p className="music-panel-label">Spotify</p>
                <p className="music-panel-title">No recent playback found</p>
                <p className="music-panel-meta">
                  Spotify is connected, but nothing recent was returned.
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="landing-toolgroup">
        <button
          type="button"
          className={`landing-tool-button ${activeTool === "globe" ? "landing-tool-button-active" : ""}`}
          aria-label="Global mode"
          onClick={() => setActiveTool("globe")}
        >
          <Globe className="h-[12px] w-[12px]" strokeWidth={1.7} />
        </button>
        <button
          type="button"
          className={`landing-tool-button ${activeTool === "cursor" ? "landing-tool-button-active" : ""}`}
          aria-label="Cursor mode"
          onClick={() => setActiveTool("cursor")}
        >
          <MousePointer2 className="h-[12px] w-[12px]" strokeWidth={1.7} />
        </button>
        <button
          type="button"
          className={`landing-tool-button ${activeTool === "music" ? "landing-tool-button-active" : ""}`}
          aria-label="Music mode"
          onClick={() => setActiveTool("music")}
        >
          <Music3 className="h-[12px] w-[12px]" strokeWidth={1.7} />
        </button>
        <button
          type="button"
          className={`landing-tool-button ${theme === "dark" ? "landing-tool-button-active" : ""}`}
          aria-label="Toggle dark mode"
          onClick={handleThemeToggle}
        >
          <Moon className="h-[12px] w-[12px]" strokeWidth={1.7} />
        </button>
      </div>
    </header>
  );
}
