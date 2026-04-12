"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import type { ReactNode, RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import styles from "./intro-animation.module.css";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type IntroPhase =
  | "idle"
  | "cursor-enter"
  | "cursor-click"
  | "about-reveal"
  | "waiting-cascade"   // user-driven: click or scroll triggers next
  | "cascade-reveal"
  | "complete";

type IntroContextValue = {
  phase: IntroPhase;
  aboutRef: RefObject<HTMLDivElement | null>;
  registerAboutRef: (ref: RefObject<HTMLDivElement | null>) => void;
  triggerCascade: () => void;
};

const INTRO_STORAGE_KEY = "portfolio-intro-played";

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const IntroContext = createContext<IntroContextValue>({
  phase: "complete",
  aboutRef: { current: null },
  registerAboutRef: () => {},
  triggerCascade: () => {},
});

export function useIntroPhase() {
  return useContext(IntroContext);
}

/* ------------------------------------------------------------------ */
/*  Phase timings (only for auto-advancing phases)                     */
/* ------------------------------------------------------------------ */

const AUTO_TIMINGS: Partial<
  Record<IntroPhase, { next: IntroPhase; delay: number }>
> = {
  idle: { next: "cursor-enter", delay: 500 },
  "cursor-enter": { next: "cursor-click", delay: 1200 },
  "cursor-click": { next: "about-reveal", delay: 300 },
  "about-reveal": { next: "waiting-cascade", delay: 800 },
  // waiting-cascade does NOT auto-advance — user must click or scroll
  "cascade-reveal": { next: "complete", delay: 1400 },
};

/* On touch devices we skip the cursor phases */
const MOBILE_AUTO_TIMINGS: Partial<
  Record<IntroPhase, { next: IntroPhase; delay: number }>
> = {
  idle: { next: "about-reveal", delay: 700 },
  "about-reveal": { next: "waiting-cascade", delay: 800 },
  "cascade-reveal": { next: "complete", delay: 1400 },
};

/* ------------------------------------------------------------------ */
/*  Retro Mac cursor (SVG arrow)                                       */
/* ------------------------------------------------------------------ */

function IntroCursor({
  phase,
  aboutRef,
}: {
  phase: IntroPhase;
  aboutRef: RefObject<HTMLDivElement | null>;
}) {
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!aboutRef.current) return;
    const rect = aboutRef.current.getBoundingClientRect();
    setTarget({
      x: rect.left + rect.width * 0.45,
      y: rect.top + rect.height * 0.45,
    });
  }, [aboutRef]);

  const isVisible = phase === "cursor-enter" || phase === "cursor-click";
  const startX = typeof window !== "undefined" ? window.innerWidth * 0.85 : 1200;
  const startY = typeof window !== "undefined" ? window.innerHeight * 0.8 : 800;

  return (
    <AnimatePresence>
      {isVisible && target && (
        <motion.div
          className={styles.cursor}
          initial={{ left: startX, top: startY, opacity: 0, scale: 0.6 }}
          animate={{
            left: target.x,
            top: target.y,
            opacity: 1,
            scale: phase === "cursor-click" ? [1, 0.82, 1.05, 1] : 1,
          }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.35 } }}
          transition={{
            left: { type: "tween", duration: 1.1, ease: EASE_OUT_EXPO },
            top: { type: "tween", duration: 1.1, ease: EASE_OUT_EXPO },
            opacity: { duration: 0.35, ease: "easeOut" },
            scale:
              phase === "cursor-click"
                ? { times: [0, 0.3, 0.6, 1], duration: 0.25 }
                : { type: "spring", stiffness: 400, damping: 18 },
          }}
        >
          {/* Retro Mac-style arrow cursor */}
          <svg
            className={styles.cursorArrow}
            width="24"
            height="28"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pixelated classic Mac arrow */}
            <path
              d="M2 1L2 22L7 17L11 26L14 25L10 16L18 16L2 1Z"
              fill="#000000"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          {/* Click ripple ring */}
          <motion.div
            className={styles.cursorRipple}
            animate={
              phase === "cursor-click"
                ? { scale: [0.5, 3, 0], opacity: [0.6, 0.3, 0] }
                : { scale: 0.5, opacity: 0 }
            }
            transition={
              phase === "cursor-click"
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 0.2 }
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function IntroAnimationProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("complete");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const aboutRefState = useRef<HTMLDivElement | null>(null);

  const registerAboutRef = useCallback(
    (ref: RefObject<HTMLDivElement | null>) => {
      aboutRefState.current = ref.current;
    },
    [],
  );

  /* User action: click blurred card or scroll → trigger cascade */
  const triggerCascade = useCallback(() => {
    setPhase((current) => {
      if (current === "waiting-cascade") return "cascade-reveal";
      return current;
    });
  }, []);

  /* Client-side initialization */
  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (alreadyPlayed || reducedMotion) {
      setPhase("complete");
      return;
    }

    const isTouch = !window.matchMedia("(pointer: fine)").matches;
    setIsTouchDevice(isTouch);

    const initTimer = window.setTimeout(() => {
      setPhase("idle");
    }, 50);

    return () => window.clearTimeout(initTimer);
  }, []);

  /* Auto-advancing phases */
  useEffect(() => {
    if (phase === "complete") {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      return;
    }

    const timings = isTouchDevice ? MOBILE_AUTO_TIMINGS : AUTO_TIMINGS;
    const step = timings[phase];
    if (!step) return; // waiting-cascade has no entry → no auto-advance

    const timer = window.setTimeout(() => setPhase(step.next), step.delay);
    return () => window.clearTimeout(timer);
  }, [phase, isTouchDevice]);

  /* Scroll listener: if user scrolls while waiting, trigger cascade */
  useEffect(() => {
    if (phase !== "waiting-cascade") return;

    const handleScroll = () => {
      triggerCascade();
    };

    window.addEventListener("scroll", handleScroll, { once: true, passive: true });
    window.addEventListener("wheel", handleScroll, { once: true, passive: true });
    window.addEventListener("touchmove", handleScroll, { once: true, passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [phase, triggerCascade]);

  const contextValue: IntroContextValue = {
    phase,
    aboutRef: aboutRefState as RefObject<HTMLDivElement | null>,
    registerAboutRef,
    triggerCascade,
  };

  return (
    <IntroContext.Provider value={contextValue}>
      {children}
      {!isTouchDevice && phase !== "complete" && (
        <IntroCursor
          phase={phase}
          aboutRef={aboutRefState as RefObject<HTMLDivElement | null>}
        />
      )}
    </IntroContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared animation helpers (used by work-mosaic)                     */
/* ------------------------------------------------------------------ */

export const INTRO_EASE = EASE_OUT_EXPO;

/** Retro overlay: pixel grid + scanlines + grain + vignette */
export function StaticNoise({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className={styles.retroOverlay}
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-hidden="true"
    >
      <div className={styles.pixelGrid} />
      <div className={styles.staticNoise} />
      <div className={styles.scanlines} />
      <div className={styles.vignette} />
    </motion.div>
  );
}

/** Radial glow burst for the voosh reveal */
export function VooshGlow({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={styles.vooshGlow}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.3, 1.5, 2.5],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
