"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Cloud,
  CloudFog,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MoonStar,
  SunMedium,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { contactChannels, projects } from "@/lib/site-data";
import type {
  WeatherConditionKey,
  WorkWeatherSnapshot,
} from "@/lib/weather";
import styles from "./work-mosaic.module.css";

function getProject(slug: string) {
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    throw new Error(`Missing project data for ${slug}`);
  }

  return project;
}

const tdProject = getProject("td-securities");
const lapisProject = getProject("lapis");
const cidelProject = getProject("cidel");
const cohereProject = getProject("cohere-ai");
const deloeProject = getProject("deloe");
const kicProject = getProject("kic-product-acquisition");
const resydProject = getProject("get-resyd");
const inBetweenProject = getProject("in-between-spaces");
const westernuProject = getProject("westernu-ai");
const fallbackAlbumImages = ["/carousel/image.png"];

const aboutBullets = [
  "Built across financial systems, internal tools, and AI-driven products",
  "Studying Computer Science and Finance at Western University",
  "Enjoy work that lets me keep learning, follow interesting ideas, and turn them into something concrete, useful, and lasting",
];
const DEGREE = "\u00B0";

type WorkStat = {
  label: string;
  value: string;
};

type FeatureWorkCardProps = {
  project: ReturnType<typeof getProject>;
  className: string;
  description: string;
  stats: WorkStat[];
  ctaLabel?: string;
};

type AlbumImagePayload = {
  images: string[];
};

function getContactIcon(label: string) {
  switch (label) {
    case "Email":
      return <Mail className="h-4 w-4" strokeWidth={1.8} />;
    case "LinkedIn":
      return <Linkedin className="h-4 w-4" strokeWidth={1.8} />;
    case "GitHub":
      return <Github className="h-4 w-4" strokeWidth={1.8} />;
    case "X":
      return <span className={styles.contactGlyph}>X</span>;
    default:
      return <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />;
  }
}

function TorontoTimeCard() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 15000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const timeLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        hour: "numeric",
        minute: "2-digit",
      }).format(now),
    [now],
  );

  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(now),
    [now],
  );

  return (
    <article className={`${styles.card} ${styles.timeCard}`}>
      <div className={`${styles.compactHeader} ${styles.timeHeader}`}>
        <p className={styles.eyebrow}>Right now</p>
        <div className={styles.timeBlock}>
          <p className={styles.timeValue}>{timeLabel}</p>
          <p className={styles.timeDate}>{dateLabel}</p>
        </div>
      </div>
      <div className={styles.timeNotes}>
        <p>
          Building trader-facing risk platform software at TD Securities.
        </p>
        <p>
          Working on Lapis and other product ideas outside of work.
        </p>
        <p>
          Spending a lot of time thinking about product, interfaces, and how to
          make useful things feel simple.
        </p>
      </div>
    </article>
  );
}

function PhotoAlbumCard() {
  const [images, setImages] = useState<string[]>(fallbackAlbumImages);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadAlbumImages() {
      try {
        const response = await fetch("/api/album", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load album images.");
        }

        const payload = (await response.json()) as AlbumImagePayload;
        const nextImages =
          payload.images.length > 0 ? payload.images : fallbackAlbumImages;

        if (!cancelled) {
          setImages(nextImages);
          setActiveIndex((current) => Math.min(current, nextImages.length - 1));
        }
      } catch {
        if (!cancelled) {
          setImages(fallbackAlbumImages);
          setActiveIndex(0);
        }
      }
    }

    void loadAlbumImages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3600);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images]);

  const activeImage = images[activeIndex] ?? fallbackAlbumImages[0];

  return (
    <article
      className={`${styles.card} ${styles.photoAlbumCard} ${styles.photoAlbumPanel}`}
      style={
        {
          "--album-image": `url("${activeImage}")`,
        } as CSSProperties
      }
    >
      <div className={styles.photoAlbumBackdrop} aria-hidden="true">
        <div className={styles.photoAlbumImage} />
        <div className={styles.photoAlbumShade} />
      </div>
      <div className={styles.photoAlbumCopy}>
        <span className={styles.photoAlbumLabel}>My Photos</span>
        <div className={styles.photoAlbumMeta}>
          <p className={styles.eyebrow}>Personal</p>
          <span className={styles.microBadge}>
            {images.length > 1 ? `${activeIndex + 1}/${images.length}` : "Album"}
          </span>
        </div>
        {images.length > 1 ? (
          <div className={styles.photoAlbumControls} aria-label="Photo album selection">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`${styles.photoAlbumDot} ${index === activeIndex ? styles.photoAlbumDotActive : ""}`}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function ContactCard() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!copiedLabel) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedLabel(null);
    }, 1400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copiedLabel]);

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
    } catch {
      setCopiedLabel(null);
    }
  };

  return (
    <article className={`${styles.card} ${styles.contactCard}`}>
      <div className={styles.compactHeader}>
        <p className={styles.eyebrow}>Contact</p>
        <span className={`${styles.microBadge} ${copiedLabel ? styles.microBadgeCopied : ""}`}>
          <span className={styles.microBadgeInner}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copiedLabel ? "copied" : "copy"}
                className={styles.microBadgeText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{
                  duration: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {copiedLabel ? "Copied" : "Copy"}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
      </div>
      <p className={styles.contactIntro}>
        Four quick ways to reach me. Click any icon to copy the link.
      </p>
      <div className={styles.contactActions}>
        {contactChannels.map((channel) => {
          const copied = copiedLabel === channel.label;

          return (
            <button
              key={channel.label}
              type="button"
              className={`${styles.contactButton} ${copied ? styles.contactButtonCopied : ""}`}
              onClick={() =>
                void handleCopy(
                  channel.label,
                  channel.copyValue ?? channel.href,
                )
              }
              aria-label={`Copy ${channel.label}`}
              title={`Copy ${channel.label}`}
            >
              <span className={styles.contactIconWrap}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? `${channel.label}-copied` : `${channel.label}-idle`}
                    className={styles.contactIconFace}
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.86 }}
                    transition={{
                      duration: 0.16,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      getContactIcon(channel.label)
                    )}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className={styles.srOnly}>{channel.label}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}

function WeatherCard() {
  const [weather, setWeather] = useState<WorkWeatherSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const response = await fetch("/api/weather/toronto", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load Toronto weather.");
        }

        const payload = (await response.json()) as WorkWeatherSnapshot;

        if (!cancelled) {
          setWeather(payload);
        }
      } catch {
        if (!cancelled) {
          setWeather(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadWeather();

    const intervalId = window.setInterval(() => {
      void loadWeather();
    }, 1000 * 60 * 30);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  const fallbackWeather = useMemo(() => {
    const hour = Number(
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        hour: "numeric",
        hour12: false,
      }).format(now),
    );
    const isDay = hour >= 7 && hour < 19;

    return {
      location: "Toronto",
      temperatureC: null,
      condition: isDay ? "Toronto daylight" : "After-hours glow",
      conditionKey: isDay ? "partly-cloudy" : "clear",
      isDay,
      highC: null,
      lowC: null,
      fetchedAt: now.toISOString(),
    } satisfies WorkWeatherSnapshot;
  }, [now]);

  const displayWeather = weather ?? fallbackWeather;
  const weatherThemeClass = getWeatherThemeClass(
    displayWeather.conditionKey,
    displayWeather.isDay,
  );
  const WeatherIcon = getWeatherIcon(
    displayWeather.conditionKey,
    displayWeather.isDay,
  );
  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(now),
    [now],
  );

  const metaLabel =
    displayWeather.highC !== null && displayWeather.lowC !== null
      ? `H ${displayWeather.highC}${DEGREE}  L ${displayWeather.lowC}${DEGREE}`
      : dateLabel;

  return (
    <article
      className={`${styles.card} ${styles.templateCard} ${styles.weatherCard} ${weatherThemeClass} ${loading ? styles.weatherLoading : ""}`}
    >
      <div className={styles.weatherBackdrop} aria-hidden="true">
        <div className={styles.weatherGlow} />
        <motion.div
          className={styles.weatherOrb}
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <div className={styles.weatherClouds}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.weatherGrain} />
      </div>
      <div className={styles.compactHeader}>
        <p className={styles.weatherEyebrow}>Weather</p>
        <span className={`${styles.microBadge} ${styles.weatherBadge}`}>
          {displayWeather.location}
        </span>
      </div>

      <div className={styles.weatherBody}>
        <div className={styles.weatherPrimary}>
          <p className={styles.weatherTemperature}>
            {displayWeather.temperatureC !== null
              ? `${displayWeather.temperatureC}${DEGREE}`
              : displayWeather.isDay
                ? "Sky"
                : "Night"}
          </p>
          <p className={styles.weatherCondition}>{displayWeather.condition}</p>
        </div>

        <motion.div
          className={styles.weatherIconFrame}
          animate={{
            rotate: [0, 2, -2, 0],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <WeatherIcon className="h-7 w-7" strokeWidth={1.7} />
        </motion.div>
      </div>

      <div className={styles.weatherFooter}>
        <p className={styles.weatherMeta}>{metaLabel}</p>
        <p className={styles.weatherCaption}>
          {loading && !weather
            ? "Checking the sky"
            : weather
              ? "Live Toronto atmosphere"
              : "Toronto atmosphere"}
        </p>
      </div>
    </article>
  );
}

function getWeatherThemeClass(conditionKey: WeatherConditionKey, isDay: boolean) {
  if (!isDay && (conditionKey === "clear" || conditionKey === "partly-cloudy")) {
    return styles.weatherNight;
  }

  switch (conditionKey) {
    case "clear":
      return styles.weatherClear;
    case "partly-cloudy":
      return styles.weatherPartlyCloudy;
    case "cloudy":
      return styles.weatherCloudy;
    case "fog":
      return styles.weatherFog;
    case "rain":
      return styles.weatherRain;
    case "snow":
      return styles.weatherSnow;
    case "storm":
      return styles.weatherStorm;
    default:
      return styles.weatherCloudy;
  }
}

function getWeatherIcon(conditionKey: WeatherConditionKey, isDay: boolean) {
  if (!isDay && (conditionKey === "clear" || conditionKey === "partly-cloudy")) {
    return conditionKey === "partly-cloudy" ? CloudMoon : MoonStar;
  }

  switch (conditionKey) {
    case "clear":
      return SunMedium;
    case "partly-cloudy":
      return CloudSun;
    case "cloudy":
      return Cloud;
    case "fog":
      return CloudFog;
    case "rain":
      return CloudRain;
    case "snow":
      return CloudSnow;
    case "storm":
      return Zap;
    default:
      return Cloud;
  }
}

function FeatureWorkCard({
  project,
  className,
  description,
  stats,
  ctaLabel = "Learn More",
}: FeatureWorkCardProps) {
  const isLapisCard = project.slug === "lapis";

  return (
    <Link href={`/projects/${project.slug}`} className={`${styles.cardLink} ${className}`}>
      <article
        className={`${styles.card} ${styles.featureCard} ${project.slug === "td-securities" ? styles.tdFeatureCard : styles.neutralFeatureCard}`}
        style={
          {
            "--project-base": project.palette.base,
            "--project-ink": project.palette.ink,
          } as CSSProperties
        }
      >
        <div className={styles.featureMain}>
          <div className={styles.featureCopy}>
            <p className={styles.featureEyebrow}>Work</p>
            {isLapisCard ? (
              <div className={styles.lapisTitleRow}>
                <h2 className={styles.featureTitle}>{project.title}</h2>
              </div>
            ) : (
              <h2 className={styles.featureTitle}>{project.title}</h2>
            )}
            <p className={styles.featureBody}>{description}</p>
            {isLapisCard ? (
              <div className={styles.lapisShotWrap}>
                <div className={styles.lapisShotStage}>
                  <div className={styles.lapisShotFrame}>
                    <Image
                      src="/carousel/Lapis.png"
                      alt="Lapis product interface preview"
                      width={2000}
                      height={800}
                      className={styles.lapisShotImage}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className={styles.featureAside}>
            <div className={styles.metricStack}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.metricCard}>
                  <p>{stat.label}</p>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.featureFooter}>
          <span>{project.role}</span>
          <span className={styles.inlineAction}>
            {ctaLabel}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
        </div>
      </article>
    </Link>
  );
}

export function WorkMosaic() {
  return (
    <section className={styles.pageShell}>
      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.aboutCard}`}>
          <div className={styles.aboutLead}>
            <h1 className={styles.aboutTitle}>
            Hi, I'm Josh! A software engineer, product minded builder, and Computer Science student
        
            </h1>
            <p className={styles.aboutBody}>
              I'm passionate about making things that become real and
              consequential, whether that's an app, a product experience, or
              music.
            </p>
          </div>

          <ul className={styles.aboutList}>
            {aboutBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.pillRow}>
            <span className={styles.pill}>
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.7} />
              Toronto, Ontario
            </span>
          </div>
        </article>

        <TorontoTimeCard />
        <ContactCard />
        <WeatherCard />

        <div className={styles.topCluster}>
          <FeatureWorkCard
            project={tdProject}
            className={styles.tdCard}
            description="Contributing to Java services, regression testing, and React improvements for the Market Risk Insights platform supporting trading workflows."
            stats={[
              { label: "Position", value: "Software Eng Co-op" },
              { label: "Team", value: "Market Risk Insights" },
              { label: "Tools", value: "Java, React, Cucumber" },
            ]}
            ctaLabel="Role details"
          />

        <FeatureWorkCard
          project={lapisProject}
          className={styles.lapisCard}
          description="Founding engineering at Lapis, your research teams AI-Native Project Management Tool. Building across semantic search, document systems, enterprise integrations, and user experience."
          stats={[
            { label: "Position", value: "Founding Eng" },
            { label: "Team", value: "Core Platform" },
            { label: "Tools", value: "Node.js, Next.js" },
          ]}
        />

          <Link
            href={`/projects/${resydProject.slug}`}
            className={`${styles.cardLink} ${styles.resydCard}`}
          >
            <article className={`${styles.card} ${styles.previewCard}`}>
              <div className={styles.compactHeader}>
                <p className={styles.eyebrow}>Project</p>
              </div>
              <div className={styles.previewBody}>
                <div className={styles.previewCopy}>
                <h2 className={styles.cardTitle}>Get Resyd</h2>
                <p className={styles.cardBody}>
                  Reservation monitoring and auto-booking for people who decide late and move
                  fast.
                </p>
              </div>
                <div className={styles.resydMock}>
                  <Image
                    src="/resy2.jpg"
                    alt="Get Resyd reservation booking flow shown on a laptop screen"
                    width={788}
                    height={424}
                    className={styles.resydImage}
                  />
                </div>
              </div>
            </article>
          </Link>

          <Link
            href={`/projects/${inBetweenProject.slug}`}
            className={`${styles.cardLink} ${styles.inBetweenCard}`}
          >
            <article className={`${styles.card} ${styles.imageCard}`}>
              <div className={styles.imageWrap}>
                <Image
                  src="/carousel/in-between.jpg"
                  alt="The In-Between Spaces interface preview"
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1080px) 100vw, 56vw"
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.imageCopy}>
                <div className={styles.compactHeader}>
                  <p className={styles.eyebrow}>Project</p>
                  <span className={styles.microBadge}>Toronto map</span>
                </div>
                <h2 className={styles.imageTitle}>{inBetweenProject.title}</h2>
                <p className={styles.imageBody}>
                  A calmer map for discovering third spaces and coworking
                  spots across Toronto that are typically hidden from the public.
                </p>
              </div>
            </article>
          </Link>

          <Link
            href={`/projects/${kicProject.slug}`}
            className={`${styles.cardLink} ${styles.kicCard}`}
          >
            <article className={`${styles.card} ${styles.compactProjectCard} ${styles.kicPanel}`}>
              <p className={styles.eyebrow}>Work</p>
              <h2 className={styles.cardTitle}>{kicProject.title}</h2>
              <p className={styles.cardBody}>
                Founder-led pricing, analytics, and arbitrage systems for
                marketplace inventory.
              </p>
              <div className={styles.statInline}>
                <span>Revenue</span>
                <strong>$2M</strong>
              </div>
            </article>
          </Link>
        </div>

        <div className={styles.bottomCluster}>
          <Link
            href={`/projects/${deloeProject.slug}`}
            className={`${styles.cardLink} ${styles.deloeCard}`}
          >
            <article className={`${styles.card} ${styles.compactProjectCard} ${styles.deloePanel}`}>
              <div className={styles.compactHeader}>
                <p className={styles.eyebrow}>Project</p>
              </div>
              <h2 className={styles.cardTitle}>Deloe</h2>
              <p className={styles.cardBody}>
                Startup MVP for affordable student moving, with user-mover
                matching, pricing, and a mover dashboard.
              </p>
              <div className={styles.cardMetaRow}>
                <span>Marketplace MVP</span>
                <span>Matching system</span>
              </div>
            </article>
          </Link>

          <Link
            href={`/projects/${cidelProject.slug}`}
            className={`${styles.cardLink} ${styles.cidelCard}`}
          >
            <article className={`${styles.card} ${styles.cidelFeatureCard}`}>
              <div className={styles.compactHeader}>
                <p className={styles.eyebrow}>Work</p>
              </div>
              <div className={styles.cidelMain}>
                <div className={styles.cidelText}>
                  <h2 className={styles.cardTitle}>Cidel</h2>
                  <p className={styles.cardBody}>
                    Banking platform delivery, internal tooling, and workflow
                    automation for finance operations.
                  </p>
                </div>
                <div className={styles.cidelStats}>
                  <div className={styles.metricCard}>
                    <p>Position</p>
                    <strong>Software Dev Intern</strong>
                  </div>
                  <div className={styles.metricCard}>
                    <p>Team</p>
                    <strong>Wealth Systems</strong>
                  </div>
                  <div className={styles.metricCard}>
                    <p>Tools</p>
                    <strong>Java, SQL, React</strong>
                  </div>
                </div>
              </div>
              <div className={styles.cardMetaRow}>
                <span>Role details</span>
                <span className={styles.inlineAction}>
                  Role details
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </div>
            </article>
          </Link>

          <Link
            href={`/projects/${cohereProject.slug}`}
            className={`${styles.cardLink} ${styles.cohereCard}`}
          >
            <article className={`${styles.card} ${styles.logoCard} ${styles.miniLogoCard}`}>
              <div className={styles.logoFrame}>
                <Image
                  src="/carousel/cohere_ai_logo.png"
                  alt="Cohere logo"
                  fill
                  sizes="160px"
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.logoCopy}>
                <p className={styles.eyebrow}>Work</p>
                <h2 className={styles.cardTitle}>Cohere</h2>
                <p className={styles.cardBody}>
                  LLM dataset evaluation and QA support for production model
                  workflows.
                </p>
              </div>
            </article>
          </Link>

          <Link
            href={`/projects/${westernuProject.slug}`}
            className={`${styles.cardLink} ${styles.westernuCard}`}
          >
            <article className={`${styles.card} ${styles.logoCard} ${styles.miniLogoCard}`}>
              <div className={styles.logoFrame}>
                <Image
                  src="/carousel/westernuai_logo_transparent.png"
                  alt="WesternU AI logo"
                  fill
                  sizes="160px"
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.logoCopy}>
                <p className={styles.eyebrow}>Volunteer</p>
                <h2 className={styles.cardTitle}>WesternU AI</h2>
                <p className={styles.cardBody}>
                  Directed club finances and built Python sponsor-outreach tools
                  that used AI to support Western AI events.
                </p>
              </div>
            </article>
          </Link>

          <PhotoAlbumCard />
        </div>
      </div>
    </section>
  );
}
