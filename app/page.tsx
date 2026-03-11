import { BallStorm } from "@/components/ball-storm";
import { LandingCanvas } from "@/components/landing-canvas";
import { TopChrome } from "@/components/top-chrome";

export default function Home() {
  return (
    <main className="landing-page">
      <TopChrome activePath="/" />
      <LandingCanvas />
      <BallStorm />
    </main>
  );
}
