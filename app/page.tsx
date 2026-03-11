import { BallStorm } from "@/components/ball-storm";
import { LandingCanvas } from "@/components/landing-canvas";
import { TopChrome } from "@/components/top-chrome";

export default function Home() {
  return (
    <main className="landing-page">
      <TopChrome activePath="/" />
      {/*
      <section className="landing-intro-shell" aria-label="Introduction">
        <div className="landing-intro">
          <p className="landing-intro-title">
            Hi, I&apos;m Josh, a full-stack and product developer building
            thoughtful products across financial, engineering, design, and
            product systems.
          </p>
          <ul className="landing-intro-body" aria-label="About Josh highlights">
            <li>Shipping across product, engineering, and design.</li>
            <li>Most interested in interfaces that feel clear and alive.</li>
          </ul>
        </div>
      </section>
      */}
      <LandingCanvas />
      <BallStorm />
    </main>
  );
}
