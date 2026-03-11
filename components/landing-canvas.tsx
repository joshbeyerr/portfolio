"use client";

import Link from "next/link";
import { useState } from "react";

import { landingCarouselItems } from "@/lib/site-data";

function tileClassName(variant: string, size: string) {
  return [
    "carousel-tile",
    `carousel-tile-${variant}`,
    size === "hero" ? "carousel-tile-hero" : "",
    size === "wide" ? "carousel-tile-wide" : "",
    size === "square" ? "carousel-tile-square" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function LandingCanvas() {
  const [focusedItem, setFocusedItem] = useState(landingCarouselItems[0]);
  const loopItems = [...landingCarouselItems, ...landingCarouselItems];

  return (
    <section className="landing-stage">
      <div className="carousel-shell">
        <div className="carousel-track">
          {loopItems.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={item.href ?? "/"}
              className={tileClassName(item.variant, item.size)}
              onMouseEnter={() => setFocusedItem(item)}
              onFocus={() => setFocusedItem(item)}
            >
              <div className="carousel-tile-inner">
                {item.variant === "trip" ? (
                  <div className="trip-mark">
                    <span />
                    <span />
                  </div>
                ) : null}

                {item.variant === "cadillac" ? (
                  <div className="cadillac-mark">
                    <div />
                  </div>
                ) : null}

                {item.variant === "music" ? (
                  <div className="music-sticker">
                    <span>CHEW PLANTS</span>
                    <strong>MUCHO</strong>
                  </div>
                ) : null}

                {item.variant === "allup" ? (
                  <p className="tile-wordmark-tight">allup</p>
                ) : null}

                {item.variant === "reveri" ? (
                  <p className="tile-wordmark-soft">reveri</p>
                ) : null}

                {item.variant === "brooklyn" ? (
                  <div className="brooklyn-lockup">
                    <span>BROOKLYN</span>
                    <span>ORG</span>
                  </div>
                ) : null}

                {item.variant === "signal" ? (
                  <div className="signal-lockup">
                    <span>D</span>
                    <span>eloe</span>
                  </div>
                ) : null}

                {item.variant === "td-securities" ? (
                  <img
                    src="/carousel/td-securities.jpg"
                    alt="TD Securities"
                    className="carousel-tile-img"
                  />
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="landing-caption">
        <p>{focusedItem.label}</p>
        <p>{focusedItem.description}</p>
      </div>
    </section>
  );
}
