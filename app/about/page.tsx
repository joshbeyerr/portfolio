import { SiteShell } from "@/components/site-shell";
import { capabilities, principles, profile } from "@/lib/site-data";

const timeline = [
  {
    period: "Now",
    title: "Independent practice",
    body:
      "Partnering with startups and established teams on product strategy, interface systems, and frontend delivery.",
  },
  {
    period: "Before",
    title: "In-house and agency roles",
    body:
      "Shipped work across SaaS, healthcare, commerce, and editorial brands, often helping teams clarify products while upgrading their design quality.",
  },
  {
    period: "Always",
    title: "Design through implementation",
    body:
      "I stay close to code because product decisions become more credible when they survive real constraints, not just presentation decks.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell
      activePath="/about"
      eyebrow="About"
      title="A product designer’s eye with an engineer’s respect for systems."
      intro={profile.introduction}
    >
      <section className="mt-16 grid gap-10 border-t border-[var(--line)] pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-5">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
            Background
          </p>
          <p className="max-w-3xl text-[16px] leading-8 text-[var(--ink)]">
            I help teams turn fuzzy ambition into sharper products. That usually
            means clarifying strategy, reshaping information architecture,
            designing interfaces with stronger hierarchy, and making sure the
            final implementation keeps the original intent intact.
          </p>
          <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]">
            The projects I enjoy most sit in the middle of business goals,
            product complexity, and brand expression. Those are the moments
            where thoughtful systems work matters most.
          </p>
        </div>

        <div className="info-card space-y-4">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
            Snapshot
          </p>
          <div className="space-y-2 text-[14px] leading-6 text-[var(--ink)]">
            <p>{profile.location}</p>
            <p>{profile.availability}</p>
            <p>Preferred engagements from 4 to 16 weeks.</p>
            <p>Strongest fit with product-led teams that value rigor and speed.</p>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 border-t border-[var(--line)] pt-10 md:mt-24 lg:grid-cols-[320px_minmax(0,1fr)]">
        <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
          Timeline
        </p>
        <div className="grid gap-6">
          {timeline.map((item) => (
            <div
              key={item.title}
              className="grid gap-3 border-t border-[var(--line)] pt-4 md:grid-cols-[120px_minmax(0,1fr)]"
            >
              <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
                {item.period}
              </p>
              <div className="space-y-2">
                <h2 className="text-[28px] leading-none tracking-[-0.04em] text-[var(--ink)]">
                  {item.title}
                </h2>
                <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-10 border-t border-[var(--line)] pt-10 md:mt-24 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
            Principles
          </p>
          <div className="space-y-6">
            {principles.map((item) => (
              <div key={item.title} className="space-y-2">
                <h2 className="text-[24px] leading-none tracking-[-0.035em] text-[var(--ink)]">
                  {item.title}
                </h2>
                <p className="text-[14px] leading-6 text-[var(--muted)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
            Capabilities
          </p>
          <div className="grid gap-3">
            {capabilities.map((capability) => (
              <div key={capability} className="info-card text-[14px] text-[var(--ink)]">
                {capability}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
