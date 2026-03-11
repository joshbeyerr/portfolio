import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell
      activePath="/"
      eyebrow="404"
      title="The page you’re looking for is not part of this workspace."
      intro="It may have moved, been removed, or never existed in the first place."
    >
      <section className="mt-16 border-t border-[var(--line)] pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--ink)] transition-opacity duration-150 hover:opacity-65"
        >
          Return home
        </Link>
      </section>
    </SiteShell>
  );
}
