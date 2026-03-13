"use client";

import Link from "next/link";
import {
  Circle,
  ChevronDown,
  ChevronUp,
  Globe,
  Heart,
  Music2,
  Moon,
  MousePointer2,
  Orbit,
  Pause,
  Play,
  ScanSearch,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useCursorMode } from "@/components/cursor-system";
import { useSiteAudio } from "@/components/site-audio";
import { navigationItems, type CursorMode } from "@/lib/site-data";

type TopChromeProps = {
  activePath: string;
};

type SpotifyStatusResponse = {
  connected: boolean;
  needsAuth?: boolean;
  playback?: {
    isPlaying: boolean;
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
  } | null;
};

const cursorOptions: {
  id: CursorMode;
  label: string;
  icon: typeof MousePointer2;
  description: string;
}[] = [
  {
    id: "standard",
    label: "Standard pointer",
    icon: MousePointer2,
    description: "Native system cursor.",
  },
  {
    id: "magnetic",
    label: "Magnetic cursor",
    icon: Orbit,
    description: "Pulled toward interactive elements.",
  },
  {
    id: "project-preview",
    label: "Project preview",
    icon: ScanSearch,
    description: "Shows project metadata on hover.",
  },
  {
    id: "blur-glass",
    label: "Blur glass",
    icon: Circle,
    description: "Soft glass lens with motion tilt.",
  },
];

export function TopChrome({ activePath }: TopChromeProps) {
  const isHomePage = activePath === "/";
  const isWorkSection = activePath === "/work" || activePath.startsWith("/projects/");
  const { cursorMode, setCursorMode, customCursorEnabled } = useCursorMode();
  const siteAudio = useSiteAudio();
  const setSiteAudioAuthEnabled = siteAudio.setAuthEnabled;
  const setSiteAudioTrack = siteAudio.setTrack;
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
  const [globeExpanded, setGlobeExpanded] = useState(() => isHomePage);
  const [spotifyState, setSpotifyState] = useState<{
    loading: boolean;
    loadedOnce: boolean;
    connected: boolean;
    needsAuth: boolean;
    playback: SpotifyStatusResponse["playback"];
  }>({
    loading: true,
    loadedOnce: false,
    connected: false,
    needsAuth: false,
    playback: null,
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    setGlobeExpanded(isHomePage);
  }, [isHomePage]);

  useEffect(() => {
    let cancelled = false;

    async function loadSpotifyStatus() {
      setSpotifyState((current) => ({
        ...current,
        loading: current.loadedOnce ? current.loading : true,
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
          loadedOnce: true,
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
          loadedOnce: true,
          connected: false,
          needsAuth: true,
          playback: null,
        });
      }
    }

    void loadSpotifyStatus();

    const intervalId = window.setInterval(() => {
      void loadSpotifyStatus();
    }, 30000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setSiteAudioAuthEnabled(
      spotifyState.connected && !spotifyState.needsAuth,
    );
  }, [setSiteAudioAuthEnabled, spotifyState.connected, spotifyState.needsAuth]);

  useEffect(() => {
    const playback = spotifyState.playback;

    if (!playback) {
      setSiteAudioTrack(null);
      return;
    }

    setSiteAudioTrack({
      title: playback.trackName,
      subtitle: `${playback.artistName} - ${playback.albumName}`,
      uri: playback.trackUri,
      openHref: playback.trackUrl,
    });
  }, [setSiteAudioTrack, spotifyState.playback]);

  const tickerText = useMemo(
    () =>
      [
        "Hi im Josh and this is my portfolio page, welcome.",
        "Built as a living creative tool and project canvas.",
      ].join("        "),
    [],
  );

  const handleThemeToggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const handleGlobeToolClick = () => {
    if (!isHomePage) {
      setActiveTool("globe");
      return;
    }

    if (activeTool === "globe") {
      setGlobeExpanded((current) => !current);
      return;
    }

    setActiveTool("globe");
  };

  const disabledNavLabels = new Set(["Information", "News"]);
  const isNavItemActive = (href: string) => {
    if (href === "/work") {
      return isWorkSection;
    }

    return activePath === href;
  };

  return (
    <header className="landing-topbar">
      <div className="landing-leftbar">
        <Link
          href="/"
          className={`landing-heartbox ${isHomePage ? "landing-heartbox-active" : ""}`}
          aria-label="Home"
        >
          <Heart className="h-[11px] w-[11px] fill-current" strokeWidth={1.8} />
        </Link>
        <nav className="landing-nav" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            disabledNavLabels.has(item.label) ? (
              <span
                key={item.href}
                className="landing-nav-link landing-nav-link-disabled"
                aria-disabled="true"
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`landing-nav-link ${isNavItemActive(item.href) ? "landing-nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>
      </div>

      <div className="landing-centerbar">
        {activeTool === "globe" ? (
          <div
            className={`globe-panel center-panel ${isHomePage && globeExpanded ? "globe-panel-expanded" : "globe-panel-collapsed"}`}
            aria-label={isHomePage && globeExpanded ? "About Josh" : "Status ticker"}
          >
            {isHomePage ? (
              <button
                type="button"
                className="globe-panel-toggle"
                onClick={() => setGlobeExpanded((current) => !current)}
                aria-expanded={globeExpanded}
                aria-label={globeExpanded ? "Collapse about panel" : "Expand about panel"}
              >
                <span>{globeExpanded ? "About" : "Status"}</span>
                {globeExpanded ? (
                  <ChevronUp className="h-[11px] w-[11px]" strokeWidth={1.8} />
                ) : (
                  <ChevronDown className="h-[11px] w-[11px]" strokeWidth={1.8} />
                )}
              </button>
            ) : null}

            {isHomePage && globeExpanded ? (
              <div className="globe-panel-body">
                <p className="globe-panel-title">
                  Hi! I&apos;m Josh, a full-stack and product developer building
                  across financial, design, and product systems.
                </p>
                <ul
                  className="globe-panel-list"
                  aria-label="About Josh highlights"
                >
                  <li>Shipping across product, engineering, and design.</li>
                  <li>Focused on useful systems over decorative complexity.</li>
                  <li>
                    Most interested in interfaces that feel clear and alive.
                  </li>
                </ul>
              </div>
            ) : (
              <div className="ticker-shell">
                <div className="ticker-track">
                  <span>{tickerText}</span>
                  <span aria-hidden="true">{tickerText}</span>
                </div>
              </div>
            )}
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
                  title={`${option.label}. ${option.description}`}
                >
                  <Icon className="h-[13px] w-[13px]" strokeWidth={1.75} />
                </button>
              );
            })}
            {!customCursorEnabled ? (
              <div className="cursor-choice-note" aria-live="polite">
                Motion cursors show on fine pointers only.
              </div>
            ) : null}
          </div>
        ) : null}

        {activeTool === "music" ? (
          spotifyState.needsAuth ? (
            <div
              className="center-panel music-panel music-panel-active music-panel-connect-only"
              aria-label="Connect Spotify"
            >
              <a href="/api/spotify/login" className="music-panel-open">
                Connect Spotify
              </a>
            </div>
          ) : (
            <div className="center-panel music-panel music-panel-active" aria-label="Spotify playback">
              <div className="music-panel-main">
                {spotifyState.playback?.albumImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={spotifyState.playback.albumImageUrl}
                    alt={`${spotifyState.playback.albumName} cover art`}
                    className="music-panel-art"
                    loading="lazy"
                  />
                ) : (
                  <div className="music-panel-art music-panel-art-fallback" aria-hidden="true">
                    <Music2 className="h-[14px] w-[14px]" strokeWidth={1.7} />
                  </div>
                )}
                <div className="music-panel-copy">
                  <p className="music-panel-label">Josh is listening to</p>
                  <p className="music-panel-title">
                    {spotifyState.loading
                      ? "Loading current track..."
                      : spotifyState.playback?.trackName ?? "Nothing playing right now"}
                  </p>
                  <p className="music-panel-meta">
                    {spotifyState.loading
                      ? "Checking what Josh is listening to."
                      : spotifyState.playback
                        ? `${spotifyState.playback.artistName} - ${spotifyState.playback.albumName}`
                        : "No current or recent playback found."}
                  </p>
                </div>
              </div>

              <div className="music-panel-controls">
                <div className="music-panel-actions">
                  <button
                    type="button"
                    className="music-panel-play"
                    onClick={() => void siteAudio.toggle()}
                    disabled={
                      spotifyState.loading ||
                      siteAudio.isUnavailable ||
                      !siteAudio.track?.uri
                    }
                  >
                    {siteAudio.isPlaying ? (
                      <Pause className="h-[11px] w-[11px] fill-current" strokeWidth={1.8} />
                    ) : (
                      <Play className="h-[11px] w-[11px] fill-current" strokeWidth={1.8} />
                    )}
                    {siteAudio.isPlaying ? "Pause" : "Play"}
                  </button>

                  <Link
                    href={siteAudio.track?.openHref ?? "#"}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`music-panel-open ${!siteAudio.track?.openHref ? "music-panel-open-disabled" : ""}`}
                    aria-disabled={!siteAudio.track?.openHref}
                    tabIndex={!siteAudio.track?.openHref ? -1 : 0}
                  >
                    Open
                  </Link>
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>

      <div className="landing-toolgroup">
        <button
          type="button"
          className={`landing-tool-button ${activeTool === "globe" ? "landing-tool-button-active" : ""}`}
          aria-label="Global mode"
          onClick={handleGlobeToolClick}
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
          <Music2 className="h-[12px] w-[12px]" strokeWidth={1.7} />
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
