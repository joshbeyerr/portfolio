import { WorkMosaic } from "@/components/work-mosaic";
import { TopChrome } from "@/components/top-chrome";
import { IntroAnimationProvider } from "@/components/intro-animation";

export default function WorkPage() {
  return (
    <main className="content-page">
      <TopChrome activePath="/work" />
      <IntroAnimationProvider>
        <WorkMosaic />
      </IntroAnimationProvider>
    </main>
  );
}
