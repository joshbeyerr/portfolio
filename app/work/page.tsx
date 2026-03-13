import { WorkMosaic } from "@/components/work-mosaic";
import { TopChrome } from "@/components/top-chrome";

export default function WorkPage() {
  return (
    <main className="content-page">
      <TopChrome activePath="/work" />
      <WorkMosaic />
    </main>
  );
}
