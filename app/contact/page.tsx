import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { contactChannels } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <SiteShell
      activePath="/contact"
      eyebrow="Contact"
      title="The best collaborations begin with a clear problem statement and a realistic timeline."
      intro="If you are shaping a new product, modernizing an existing one, or tightening a design system that has drifted, send a short note with context and timing."
    >
      <section className="mt-16 grid gap-8 border-t border-[var(--line)] pt-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
              Ideal scope
            </p>
            <p className="max-w-3xl text-[15px] leading-8 text-[var(--ink)]">
              Product strategy sprints, interface redesigns, design system
              foundations, portfolio and brand-sensitive web experiences, and
              implementation partnerships where design quality needs to survive
              the build process.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "A short description of the product or company",
              "What is not working today",
              "What outcome matters most",
              "Expected timeline and team shape",
            ].map((item) => (
              <div key={item} className="info-card text-[14px] text-[var(--ink)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="info-card space-y-4">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
            Direct channels
          </p>
          <div className="grid gap-3">
            {contactChannels.map((channel) => (
              <Link
                key={channel.label}
                href={channel.href}
                className="flex items-center justify-between gap-4 rounded-[12px] border border-[var(--line)] px-4 py-4 transition-colors duration-150 hover:border-[var(--ink)]"
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  channel.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined
                }
              >
                <div>
                  <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {channel.label}
                  </p>
                  <p className="mt-1 text-[14px] text-[var(--ink)]">
                    {channel.value}
                  </p>
                </div>
                <ArrowUpRight className="h-[14px] w-[14px] text-[var(--muted)]" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
