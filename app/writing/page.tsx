import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";

const essays = [
  {
    id: "quieter-interfaces",
    title: "Designing quieter interfaces",
    body:
      "A quieter interface does not mean a simpler product. It means the product is doing a better job of choosing what deserves emphasis. The goal is not emptiness. The goal is confidence: fewer competing signals, clearer pacing, and interactions that explain themselves without demanding constant attention.",
  },
  {
    id: "useful-design-systems",
    title: "What makes a useful design system",
    body:
      "Useful systems are operational, not aspirational. They provide reliable primitives, explicit decisions, and a governance model that respects delivery pressure. Teams adopt systems when the system saves them time, reduces ambiguity, and still leaves room for judgment where it matters.",
  },
  {
    id: "product-language",
    title: "Why product language matters",
    body:
      "Language is interface architecture in disguise. Labels, navigation terms, and empty states either reinforce the product model or quietly undermine it. When teams tighten product language, they usually improve usability without touching layout at all.",
  },
];

export default function WritingPage() {
  return (
    <SiteShell
      activePath="/writing"
      eyebrow="Writing"
      title="Short essays on interface quality, systems thinking, and product language."
      intro="These notes are concise on purpose. They document working principles I return to while designing products and building design systems."
    >
      <section className="mt-16 grid gap-6 border-t border-[var(--line)] pt-10">
        {essays.map((essay) => (
          <article
            key={essay.id}
            id={essay.id}
            className="grid gap-4 border-t border-[var(--line)] pt-5 lg:grid-cols-[280px_minmax(0,1fr)]"
          >
            <div className="space-y-2">
              <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
                Essay
              </p>
              <h2 className="text-[28px] leading-none tracking-[-0.04em] text-[var(--ink)]">
                {essay.title}
              </h2>
            </div>
            <div className="space-y-4">
              <p className="max-w-3xl text-[15px] leading-8 text-[var(--ink)]">
                {essay.body}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--ink)] transition-opacity duration-150 hover:opacity-65"
              >
                Discuss a similar challenge
                <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={1.5} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
