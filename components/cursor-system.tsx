"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import type { CursorMode } from "@/lib/site-data";

type CursorContextValue = {
  cursorMode: CursorMode;
  setCursorMode: (mode: CursorMode) => void;
  customCursorEnabled: boolean;
};

type PreviewData = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  bg?: string;
  accent?: string;
  ink?: string;
};

const STORAGE_KEY = "portfolio-cursor-mode";
const CursorContext = createContext<CursorContextValue | null>(null);

function isInteractiveElement(element: HTMLElement | null) {
  if (!element) {
    return false;
  }

  return Boolean(
    element.closest(
      [
        "[data-cursor-magnetic]",
        "[data-cursor-preview]",
        "a[href]",
        "button",
        '[role="button"]',
        'input:not([type="hidden"])',
        "textarea",
        "select",
      ].join(","),
    ),
  );
}

function extractPreviewData(element: HTMLElement | null): PreviewData | null {
  const previewElement = element?.closest("[data-cursor-preview]") as
    | HTMLElement
    | null;

  if (!previewElement) {
    return null;
  }

  const { cursorPreviewTitle } = previewElement.dataset;

  if (!cursorPreviewTitle) {
    return null;
  }

  return {
    title: cursorPreviewTitle,
    subtitle: previewElement.dataset.cursorPreviewSubtitle,
    imageSrc: previewElement.dataset.cursorPreviewImage,
    imageAlt: previewElement.dataset.cursorPreviewAlt,
    bg: previewElement.dataset.cursorPreviewBg,
    accent: previewElement.dataset.cursorPreviewAccent,
    ink: previewElement.dataset.cursorPreviewInk,
  };
}

function CursorOverlay({
  cursorMode,
  enabled,
}: {
  cursorMode: CursorMode;
  enabled: boolean;
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const renderX = useSpring(pointerX, { stiffness: 420, damping: 38, mass: 0.35 });
  const renderY = useSpring(pointerY, { stiffness: 420, damping: 38, mass: 0.35 });
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const rotate = useTransform(
    [velocityX, velocityY],
    ([vx, vy]: number[]) => Math.max(-16, Math.min(16, vx * 0.05 + vy * 0.03)),
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [interactiveRect, setInteractiveRect] = useState<DOMRect | null>(null);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const lastMoveRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    if (!enabled || cursorMode === "standard") {
      return;
    }

    const updateFromTarget = (target: EventTarget | null) => {
      const element = target instanceof HTMLElement ? target : null;
      const interactiveElement = element?.closest(
        "[data-cursor-magnetic], [data-cursor-preview], a[href], button, [role='button']",
      ) as HTMLElement | null;

      setInteractiveRect(
        cursorMode === "magnetic" && interactiveElement
          ? interactiveElement.getBoundingClientRect()
          : null,
      );
      setIsHoveringInteractive(isInteractiveElement(interactiveElement));
      setPreviewData(cursorMode === "project-preview" ? extractPreviewData(element) : null);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
        return;
      }

      setIsVisible(true);
      const currentTime = performance.now();
      const previousMove = lastMoveRef.current;

      if (previousMove) {
        const deltaTime = Math.max(16, currentTime - previousMove.time);
        velocityX.set((event.clientX - previousMove.x) / deltaTime);
        velocityY.set((event.clientY - previousMove.y) / deltaTime);
      }

      lastMoveRef.current = {
        x: event.clientX,
        y: event.clientY,
        time: currentTime,
      };

      updateFromTarget(event.target);

      if (cursorMode === "magnetic") {
        const magneticElement = event.target instanceof HTMLElement
          ? (event.target.closest(
              "[data-cursor-magnetic], [data-cursor-preview], a[href], button, [role='button']",
            ) as HTMLElement | null)
          : null;

        if (magneticElement) {
          const rect = magneticElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = centerX - event.clientX;
          const dy = centerY - event.clientY;
          const radius = Math.max(44, Math.max(rect.width, rect.height) * 0.9);
          const distance = Math.hypot(dx, dy);
          const strength = Math.max(0, 1 - distance / radius) * 0.22;

          pointerX.set(event.clientX + dx * strength);
          pointerY.set(event.clientY + dy * strength);
          return;
        }
      }

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);
    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsHoveringInteractive(false);
      setInteractiveRect(null);
      setPreviewData(null);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [cursorMode, enabled, pointerX, pointerY, velocityX, velocityY]);

  if (!enabled || cursorMode === "standard") {
    return null;
  }

  const isInteractive = interactiveRect !== null || previewData !== null;

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key={cursorMode}
          className="custom-cursor-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          {cursorMode === "magnetic" ? (
            <motion.div
              className="cursor-magnetic"
              style={{
                x: renderX,
                y: renderY,
              }}
              animate={{
                scale: isPressed ? 0.9 : isInteractive ? 1.14 : 1,
                width: isInteractive ? 58 : 28,
                height: isInteractive ? 58 : 28,
              }}
              transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.35 }}
            >
              <div className="cursor-center-anchor">
                <motion.div
                  className="cursor-magnetic-core"
                  animate={{ scale: isPressed ? 0.8 : isInteractive ? 1.15 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </motion.div>
          ) : null}

          {cursorMode === "project-preview" ? (
            <motion.div
              className={`cursor-preview-shell ${previewData ? "cursor-preview-shell-active" : ""}`}
              style={{
                x: renderX,
                y: renderY,
              }}
              animate={{
                scale: previewData ? 1 : 0.72,
                opacity: previewData ? 1 : 0.78,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.42 }}
            >
              <div className="cursor-center-anchor">
                {previewData ? (
                  <div
                    className="cursor-preview-card"
                    style={
                      {
                        "--cursor-preview-bg": previewData.bg ?? "rgba(19, 19, 19, 0.94)",
                        "--cursor-preview-accent": previewData.accent ?? "rgba(255,255,255,0.16)",
                        "--cursor-preview-ink": previewData.ink ?? "#f5f5f2",
                      } as CSSProperties
                    }
                  >
                    {previewData.imageSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewData.imageSrc}
                        alt={previewData.imageAlt ?? previewData.title}
                        className="cursor-preview-image"
                      />
                    ) : (
                      <div className="cursor-preview-image cursor-preview-image-fallback">
                        <span>{previewData.title.slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                    <div className="cursor-preview-copy">
                      <p className="cursor-preview-label">Project Preview</p>
                      <p className="cursor-preview-title">{previewData.title}</p>
                      {previewData.subtitle ? (
                        <p className="cursor-preview-subtitle">{previewData.subtitle}</p>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="cursor-preview-pill">Preview</div>
                )}
              </div>
            </motion.div>
          ) : null}

          {cursorMode === "blur-glass" ? (
            <motion.div
              className="cursor-glass"
              style={{
                x: renderX,
                y: renderY,
                rotate,
              }}
              animate={{
                scale: isPressed ? 0.92 : isHoveringInteractive ? 1.08 : 1,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.5 }}
            >
              <div className="cursor-center-anchor">
                <div className="cursor-glass-spec" />
                <div className="cursor-glass-dot" />
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorMode, setCursorMode] = useState<CursorMode>(() => {
    if (typeof window === "undefined") {
      return "standard";
    }

    const savedMode = window.localStorage.getItem(STORAGE_KEY) as CursorMode | null;
    return savedMode ?? "standard";
  });
  const [customCursorEnabled, setCustomCursorEnabled] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, cursorMode);
  }, [cursorMode]);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateAvailability = () => {
      setCustomCursorEnabled(
        finePointerQuery.matches && !reducedMotionQuery.matches,
      );
    };

    updateAvailability();
    finePointerQuery.addEventListener("change", updateAvailability);
    reducedMotionQuery.addEventListener("change", updateAvailability);

    return () => {
      finePointerQuery.removeEventListener("change", updateAvailability);
      reducedMotionQuery.removeEventListener("change", updateAvailability);
    };
  }, []);

  useEffect(() => {
    const shouldHideNative = customCursorEnabled && cursorMode !== "standard";
    document.documentElement.dataset.cursorNative = shouldHideNative
      ? "hidden"
      : "visible";

    return () => {
      document.documentElement.dataset.cursorNative = "visible";
    };
  }, [cursorMode, customCursorEnabled]);

  const value = useMemo(
    () => ({
      cursorMode,
      setCursorMode,
      customCursorEnabled,
    }),
    [cursorMode, customCursorEnabled],
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
      <CursorOverlay cursorMode={cursorMode} enabled={customCursorEnabled} />
    </CursorContext.Provider>
  );
}

export function useCursorMode() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("useCursorMode must be used within CursorProvider");
  }

  return context;
}
