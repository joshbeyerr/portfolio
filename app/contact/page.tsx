import { ContactChannels } from "@/components/contact-channels";
import { SiteShell } from "@/components/site-shell";
import { contactChannels } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <SiteShell
      activePath="/contact"
      eyebrow="Contact"
      title="Reach out."
      intro="Software engineer, computer science student, musician, and product-minded builder."
      showContactLink={false}
    >
      <section className="mt-16 grid gap-8 border-t border-[var(--line)] pt-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
              What to send
            </p>
            <p className="max-w-2xl text-[15px] leading-8 text-[var(--ink)]">
              I am always happy to chat about anything!
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "If you want to discuss work, projects, or product ideas.",
              "If you want to talk about potential internships or opportunities.",
              "If you want to chat about music, software, design, or product building.",
              "If you just want to reach out and connect.",
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
          <ContactChannels channels={contactChannels} />
        </div>
      </section>
    </SiteShell>
  );
}
