"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

import {
  landingCarouselItems,
  type LandingCarouselItem,
} from "@/lib/site-data";

function tileClassName(
  variant: string,
  size: string,
  id: string,
  tileStyle?: "default" | "logo",
) {
  return [
    "carousel-tile",
    `carousel-tile-${variant}`,
    `carousel-tile-${id}`,
    tileStyle === "logo" ? "carousel-tile-logo" : "",
    size === "wide" ? "carousel-tile-wide" : "",
    size === "square" ? "carousel-tile-square" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

type CarouselBandProps = {
  items: LandingCarouselItem[];
  focusedItem: LandingCarouselItem;
  onFocusItem: (item: LandingCarouselItem) => void;
};

type CarouselEntry =
  | { type: "marker"; id: string; label: string }
  | { type: "item"; item: LandingCarouselItem };

function wrapOffset(offset: number, width: number) {
  if (width <= 0) {
    return 0;
  }

  return ((offset % width) + width) % width;
}

function CarouselBand({
  items,
  focusedItem,
  onFocusItem,
}: CarouselBandProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const animationFrameRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0.58);
  const targetVelocityRef = useRef(0.58);
  const sequenceWidthRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const centeredItemIdRef = useRef<string | null>(null);
  const interactionIndexRef = useRef<number | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [interactionIndex, setInteractionIndex] = useState<number | null>(null);
  const workItems = items.filter((item) => item.group === "work");
  const projectItems = items.filter((item) => item.group === "project");
  const sequence: CarouselEntry[] = useMemo(
    () => [
      { type: "marker", id: "work-marker", label: "Work" },
      ...workItems.map((item) => ({ type: "item" as const, item })),
      { type: "marker", id: "project-marker", label: "Projects" },
      ...projectItems.map((item) => ({ type: "item" as const, item })),
    ],
    [projectItems, workItems],
  );
  const loopItems = useMemo(() => [...sequence, ...sequence], [sequence]);

  const syncCenteredItem = () => {
    if (interactionIndexRef.current !== null) {
      return;
    }

    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const shellBounds = shell.getBoundingClientRect();
    const shellCenter = shellBounds.left + shellBounds.width / 2;

    let closestItem: LandingCarouselItem | undefined;
    let closestDistance = Number.POSITIVE_INFINITY;

    loopItems.forEach((entry, index) => {
      if (entry.type !== "item") {
        return;
      }

      const node = itemRefs.current[index];
      if (!node) {
        return;
      }

      const bounds = node.getBoundingClientRect();
      const itemCenter = bounds.left + bounds.width / 2;
      const distance = Math.abs(itemCenter - shellCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = entry.item;
      }
    });

    if (!closestItem || centeredItemIdRef.current === closestItem.id) {
      return;
    }

    centeredItemIdRef.current = closestItem.id;
    onFocusItem(closestItem);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const updateMeasurements = () => {
      sequenceWidthRef.current = track.scrollWidth / 2;
      offsetRef.current = wrapOffset(offsetRef.current, sequenceWidthRef.current);
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      syncCenteredItem();
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);
    resizeObserver.observe(track);

    const handleResize = () => {
      updateMeasurements();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [loopItems.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const step = (time: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = time;
      }

      const delta = Math.min(32, time - lastFrameTimeRef.current) / 16.6667;
      lastFrameTimeRef.current = time;

      velocityRef.current +=
        (targetVelocityRef.current - velocityRef.current) * 0.12;
      offsetRef.current = wrapOffset(
        offsetRef.current + velocityRef.current * delta,
        sequenceWidthRef.current,
      );
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      syncCenteredItem();
      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    animationFrameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const setInteractiveVelocityFromPointer = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const bounds = shell.getBoundingClientRect();
    const ratio = (event.clientX - bounds.left) / bounds.width;
    const normalized = (ratio - 0.5) * 2;
    const deadZone = 0.14;
    const adjusted =
      Math.abs(normalized) < deadZone
        ? 0
        : (Math.abs(normalized) - deadZone) / (1 - deadZone) *
          Math.sign(normalized);

    targetVelocityRef.current = adjusted * 2.2;
  };

  const handlePointerEnter = () => {
    setIsInteractive(true);
    targetVelocityRef.current = 0;
  };

  const handlePointerLeave = () => {
    setIsInteractive(false);
    interactionIndexRef.current = null;
    setInteractionIndex(null);
    targetVelocityRef.current = 0.58;
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;
    offsetRef.current = wrapOffset(
      offsetRef.current + delta * 0.65,
      sequenceWidthRef.current,
    );
    targetVelocityRef.current = delta * 0.018;
  };

  const getTileStateClassName = (index: number) => {
    if (interactionIndex === null) {
      return "";
    }

    if (index === interactionIndex) {
      return "carousel-tile-hovered";
    }

    return "";
  };

  const getTilePush = (index: number) => {
    if (interactionIndex === null || index === interactionIndex) {
      return 0;
    }

    return index < interactionIndex ? -54 : 54;
  };

  return (
    <section className="landing-band">
      <div className="landing-band-header">
        <p className="landing-band-label">Work + Projects</p>
      </div>
      <div
        ref={shellRef}
        className={`carousel-shell ${isInteractive ? "carousel-shell-interactive" : ""}`}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={setInteractiveVelocityFromPointer}
        onWheel={handleWheel}
      >
        <div ref={trackRef} className="carousel-track">
          {loopItems.map((entry, index) =>
            entry.type === "marker" ? (
              <div
                key={`${entry.id}-${index}`}
                className="carousel-section-marker"
                aria-hidden="true"
              >
                <span>{entry.label}</span>
              </div>
            ) : (
              <Link
                key={`${entry.item.id}-${index}`}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                href={entry.item.href ?? "/"}
                className={[
                  tileClassName(
                    entry.item.variant,
                    entry.item.size,
                    entry.item.id,
                    entry.item.tileStyle,
                  ),
                  getTileStateClassName(index),
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  {
                    "--carousel-push-x": `${getTilePush(index)}px`,
                  } as CSSProperties
                }
                data-cursor-magnetic="true"
                data-cursor-preview="true"
                data-cursor-preview-title={entry.item.title}
                data-cursor-preview-subtitle={entry.item.description}
                data-cursor-preview-image={entry.item.image?.src}
                data-cursor-preview-alt={entry.item.image?.alt}
                data-cursor-preview-bg="#111111"
                data-cursor-preview-accent="rgba(255,255,255,0.12)"
                data-cursor-preview-ink="#f5f5f2"
                onMouseEnter={() => {
                  centeredItemIdRef.current = entry.item.id;
                  interactionIndexRef.current = index;
                  onFocusItem(entry.item);
                  setInteractionIndex(index);
                }}
                onMouseLeave={() => {
                  interactionIndexRef.current = null;
                  setInteractionIndex(null);
                }}
                onFocus={() => {
                  centeredItemIdRef.current = entry.item.id;
                  interactionIndexRef.current = index;
                  onFocusItem(entry.item);
                  setInteractionIndex(index);
                }}
                onBlur={() => {
                  interactionIndexRef.current = null;
                  setInteractionIndex(null);
                }}
              >
                <div className="carousel-tile-inner">
                  {entry.item.image && entry.item.variant !== "resyd" ? (
                    <img
                      src={entry.item.image.src}
                      alt={entry.item.image.alt}
                      className="carousel-tile-img"
                      loading="lazy"
                    />
                  ) : null}

                  {entry.item.variant === "trip" ? (
                    <div className="trip-mark">
                      <span />
                      <span />
                    </div>
                  ) : null}

                  {entry.item.variant === "cadillac" ? (
                    <div className="cadillac-mark">
                      <div />
                    </div>
                  ) : null}

                  {entry.item.variant === "music" ? (
                    <div className="music-sticker">
                      <span>CHEW PLANTS</span>
                      <strong>MUCHO</strong>
                    </div>
                  ) : null}

                  {entry.item.variant === "allup" ? (
                    <p className="tile-wordmark-tight">allup</p>
                  ) : null}

                  {entry.item.variant === "brooklyn" ? (
                    <div className="brooklyn-lockup">
                      <span>BROOKLYN</span>
                      <span>ORG</span>
                    </div>
                  ) : null}

                  {entry.item.variant === "signal" ? (
                    <div className="signal-lockup">
                      <span>D</span>
                      <span>eloe</span>
                    </div>
                  ) : null}

                  {entry.item.variant === "resyd" ? (
                    <div className="resyd-card">
                      <div className="resyd-card-shell" aria-hidden="true">
                        <span className="resyd-card-topline" />
                        <div className="resyd-card-body">
                          <p className="resyd-card-wordmark">
                            <span>Get</span>
                            <strong>Resyd</strong>
                          </p>
                          <p className="resyd-card-subtitle">
                            Automated Resy Reservation Booking
                          </p>
                        </div>
                        <span className="resyd-card-divider" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
      <div className="landing-caption">
        <p>{focusedItem.label}</p>
        <p>{focusedItem.description}</p>
      </div>
    </section>
  );
}

export function LandingCanvas() {
  const [focusedItem, setFocusedItem] = useState(landingCarouselItems[0]);

  return (
    <section className="landing-stage">
      <CarouselBand
        items={landingCarouselItems}
        focusedItem={focusedItem}
        onFocusItem={setFocusedItem}
      />
    </section>
  );
}
