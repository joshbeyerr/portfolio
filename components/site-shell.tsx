import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TopChrome } from "@/components/top-chrome";

type SiteShellProps = {
  activePath: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  showContactLink?: boolean;
  children: React.ReactNode;
};

export function SiteShell({
  activePath,
  eyebrow,
  title,
  intro,
  showContactLink = true,
  children,
}: SiteShellProps) {
  return (
    <main className="content-page">
      <TopChrome activePath={activePath} />

      <section className="content-shell">
        <div className="content-hero">
          {eyebrow ? <p className="content-eyebrow">{eyebrow}</p> : null}
          <h1 className="content-title">{title}</h1>
          {intro ? <p className="content-intro">{intro}</p> : null}
          {showContactLink ? (
            <Link href="/contact" className="content-link">
              Start a conversation
              <ArrowUpRight className="h-[13px] w-[13px]" strokeWidth={1.5} />
            </Link>
          ) : null}
        </div>

        <div className="content-body">{children}</div>
      </section>
    </main>
  );
}
