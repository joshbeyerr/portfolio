import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { profile, projects } from "@/lib/site-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | ${profile.name}`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <SiteShell
      activePath="/"
      eyebrow={project.category}
      title={project.headline}
      intro={project.summary}
    >
      <section className="mt-16 grid gap-6 border-t border-[var(--line)] pt-10 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="space-y-3 text-[12px] text-[var(--muted)]">
          <p>{project.client}</p>
          <p>{project.year}</p>
          <p>{project.duration}</p>
          <p>{project.role}</p>
        </div>
        <div className="space-y-5">
          <p className="max-w-4xl text-[16px] leading-8 text-[var(--ink)]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span key={service} className="tag-chip">
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 border-t border-[var(--line)] pt-10 md:mt-24">
        <div
          className="rounded-[24px] border border-[var(--line)] p-6 md:p-10"
          style={{
            background: `linear-gradient(135deg, ${project.palette.base} 0%, color-mix(in srgb, ${project.palette.base} 72%, white 28%) 100%)`,
          }}
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div className="space-y-4">
              <p className="text-[12px] uppercase tracking-[0.14em] text-black/45">
                Overview
              </p>
              <p className="max-w-3xl text-[clamp(1.8rem,4.5vw,4rem)] leading-[1.02] tracking-[-0.05em] text-[var(--ink)]">
                {project.title}
              </p>
              <p className="max-w-2xl text-[15px] leading-7 text-black/68">
                {project.summary}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[16px] border border-black/10 bg-white/40 px-4 py-5 backdrop-blur-sm"
                >
                  <p className="text-[12px] text-black/55">{metric.label}</p>
                  <p className="mt-3 text-[28px] leading-none tracking-[-0.05em] text-[var(--ink)]">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 border-t border-[var(--line)] pt-10 md:mt-24 lg:grid-cols-[280px_minmax(0,1fr)]">
        <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
          Detail
        </p>
        <div className="grid gap-6">
          {project.detailSections.map((section) => (
            <div
              key={section.heading}
              className="grid gap-3 border-t border-[var(--line)] pt-4 md:grid-cols-[140px_minmax(0,1fr)]"
            >
              <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
                {section.heading}
              </p>
              <p className="max-w-4xl text-[15px] leading-8 text-[var(--ink)]">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 border-t border-[var(--line)] pt-10 md:mt-24 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
            Outcomes
          </p>
          <div className="grid gap-4">
            {project.outcomes.map((outcome) => (
              <div key={outcome} className="info-card text-[14px] leading-6 text-[var(--ink)]">
                {outcome}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="tag-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-4 border-t border-[var(--line)] pt-10 md:mt-24 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--ink)] transition-opacity duration-150 hover:opacity-65"
        >
          <ArrowLeft className="h-[14px] w-[14px]" strokeWidth={1.5} />
          Back to selected work
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--ink)] transition-opacity duration-150 hover:opacity-65"
        >
          Discuss a similar project
          <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={1.5} />
        </Link>
      </section>
    </SiteShell>
  );
}
