"use client";

import Link from "next/link";
import { useState } from "react";

import {
  landingCarouselItems,
  type LandingCarouselItem,
} from "@/lib/site-data";

function tileClassName(variant: string, size: string, id: string) {
  return [
    "carousel-tile",
    `carousel-tile-${variant}`,
    `carousel-tile-${id}`,
    size === "hero" ? "carousel-tile-hero" : "",
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

function CarouselBand({
  items,
  focusedItem,
  onFocusItem,
}: CarouselBandProps) {
  const workItems = items.filter((item) => item.group === "work");
  const projectItems = items.filter((item) => item.group === "project");
  const sequence = [
    { type: "marker" as const, id: "work-marker", label: "Work" },
    ...workItems.map((item) => ({ type: "item" as const, item })),
    { type: "marker" as const, id: "project-marker", label: "Projects" },
    ...projectItems.map((item) => ({ type: "item" as const, item })),
  ];
  const loopItems = [...sequence, ...sequence];

  return (
    <section className="landing-band">
      <div className="landing-band-header">
        <p className="landing-band-label">Work + Projects</p>
      </div>
      <div className="carousel-shell">
        <div className="carousel-track">
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
                href={entry.item.href ?? "/"}
                className={tileClassName(
                  entry.item.variant,
                  entry.item.size,
                  entry.item.id,
                )}
                style={
                  entry.item.tileWidth && entry.item.tileHeight
                    ? {
                        width: `${entry.item.tileWidth}px`,
                        height: `${entry.item.tileHeight}px`,
                      }
                    : undefined
                }
                onMouseEnter={() => onFocusItem(entry.item)}
                onFocus={() => onFocusItem(entry.item)}
              >
                <div className="carousel-tile-inner">
                  {entry.item.image && entry.item.variant !== "cidel" ? (
                    <img
                      src={entry.item.image.src}
                      alt={entry.item.image.alt}
                      className="carousel-tile-img"
                      loading="lazy"
                    />
                  ) : null}

                  {entry.item.variant === "cidel" && entry.item.image ? (
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

                  {entry.item.variant === "reveri" ? (
                    <p className="tile-wordmark-soft">reveri</p>
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
