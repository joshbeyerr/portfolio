"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SiteAudioTrack = {
  title: string;
  subtitle: string;
  uri: string | null;
  openHref: string | null;
};

type SiteAudioContextValue = {
  track: SiteAudioTrack | null;
  authEnabled: boolean;
  isReady: boolean;
  isPlaying: boolean;
  isUnavailable: boolean;
  setAuthEnabled: (enabled: boolean) => void;
  setTrack: (track: SiteAudioTrack | null) => void;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  toggle: () => Promise<void>;
};

type SpotifyPlayerState = {
  paused: boolean;
};

type SpotifyPlayer = {
  addListener: (event: string, callback: (state: unknown) => void) => void;
  connect: () => Promise<boolean>;
  pause: () => Promise<void>;
};

type SpotifyPlayerCtor = new (options: {
  name: string;
  volume: number;
  getOAuthToken: (callback: (token: string) => void) => void;
}) => SpotifyPlayer;

declare global {
  interface Window {
    Spotify?: {
      Player: SpotifyPlayerCtor;
    };
    onSpotifyWebPlaybackSDKReady?: () => void;
  }
}

const SiteAudioContext = createContext<SiteAudioContextValue | null>(null);

async function fetchAccessToken() {
  const response = await fetch("/api/spotify/access-token", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to get Spotify access token.");
  }

  const payload = (await response.json()) as { accessToken: string };
  return payload.accessToken;
}

export function SiteAudioProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<SpotifyPlayer | null>(null);
  const deviceIdRef = useRef<string | null>(null);
  const [track, setTrack] = useState<SiteAudioTrack | null>(null);
  const [authEnabled, setAuthEnabled] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!authEnabled) {
      setIsReady(false);
      setIsPlaying(false);
      setIsUnavailable(false);
      return () => {
        cancelled = true;
      };
    }

    const initializePlayer = async () => {
      if (cancelled || !window.Spotify || playerRef.current) {
        return;
      }

      const player = new window.Spotify.Player({
        name: "Portfolio Background Player",
        volume: 0.72,
        getOAuthToken: (callback) => {
          void fetchAccessToken()
            .then((token) => callback(token))
            .catch(() => {
              setIsReady(false);
              setIsUnavailable(true);
            });
        },
      });

      player.addListener("ready", (state) => {
        const payload = state as { device_id?: string };
        deviceIdRef.current = payload.device_id ?? null;
        setIsReady(Boolean(payload.device_id));
        setIsUnavailable(false);
      });

      player.addListener("not_ready", () => {
        deviceIdRef.current = null;
        setIsReady(false);
      });

      player.addListener("player_state_changed", (state) => {
        const payload = state as SpotifyPlayerState | null;
        setIsPlaying(Boolean(payload && !payload.paused));
      });

      player.addListener("initialization_error", () => {
        setIsUnavailable(true);
        setIsReady(false);
      });
      player.addListener("authentication_error", () => {
        setIsUnavailable(true);
        setIsReady(false);
      });
      player.addListener("account_error", () => {
        setIsUnavailable(true);
        setIsReady(false);
      });
      player.addListener("playback_error", () => {
        setIsUnavailable(true);
      });

      playerRef.current = player;
      const connected = await player.connect();

      if (!connected) {
        setIsUnavailable(true);
        setIsReady(false);
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-spotify-sdk="true"]',
    );

    if (window.Spotify) {
      void initializePlayer();
    } else {
      const previousReady = window.onSpotifyWebPlaybackSDKReady;
      window.onSpotifyWebPlaybackSDKReady = () => {
        previousReady?.();
        void initializePlayer();
      };

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        script.dataset.spotifySdk = "true";
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [authEnabled]);

  const play = async () => {
    const deviceId = deviceIdRef.current;
    const trackUri = track?.uri;

    if (!deviceId || !trackUri) {
      setIsUnavailable(true);
      return;
    }

    const response = await fetch("/api/spotify/playback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "play",
        deviceId,
        trackUri,
      }),
    });

    if (!response.ok) {
      setIsUnavailable(true);
      return;
    }

    setIsUnavailable(false);
  };

  const pause = async () => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    try {
      await player.pause();
    } catch {
      setIsUnavailable(true);
    }
  };

  const toggle = async () => {
    if (isPlaying) {
      await pause();
      return;
    }

    await play();
  };

  const value = useMemo(
    () => ({
      track,
      authEnabled,
      isReady,
      isPlaying,
      isUnavailable,
      setAuthEnabled,
      setTrack,
      play,
      pause,
      toggle,
    }),
    [track, authEnabled, isReady, isPlaying, isUnavailable],
  );

  return (
    <SiteAudioContext.Provider value={value}>
      {children}
    </SiteAudioContext.Provider>
  );
}

export function useSiteAudio() {
  const context = useContext(SiteAudioContext);

  if (!context) {
    throw new Error("useSiteAudio must be used within SiteAudioProvider");
  }

  return context;
}
