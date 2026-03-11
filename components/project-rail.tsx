"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, type CSSProperties } from "react";

import type { Project } from "@/lib/site-data";

type ProjectRailProps = {
  projects: Project[];
};

export function ProjectRail({ projects }: ProjectRailProps) {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section className="mt-16 space-y-8 md:mt-24">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
            Selected work
          </p>
          <p className="max-w-2xl text-[15px] leading-7 text-[var(--muted)]">
            Each engagement pairs product thinking with execution discipline.
            The visual style is restrained, but the underlying systems work hard.
          </p>
        </div>
        <Link
          href={`/projects/${activeProject.slug}`}
          className="hidden items-center gap-2 text-[13px] font-medium text-[var(--ink)] transition-opacity duration-150 hover:opacity-65 md:inline-flex"
        >
          Open case study
          <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="project-rail">
        {projects.map((project) => {
          const isActive = project.slug === activeProject.slug;

          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => setActiveProject(project)}
              className={`project-card ${isActive ? "project-card-active" : ""}`}
              style={
                {
                  "--card-base": project.palette.base,
                  "--card-accent": project.palette.accent,
                  "--card-ink": project.palette.ink,
                } as CSSProperties
              }
            >
              <div className="pointer-events-none relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.12em] text-[color:var(--card-ink)]/65">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <div>
                  <p className="text-[28px] leading-none tracking-[-0.05em] text-[color:var(--card-ink)] md:text-[34px]">
                    {project.title}
                  </p>
                  <p className="mt-3 max-w-[18ch] text-[13px] leading-5 text-[color:var(--card-ink)]/72">
                    {project.client}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-[var(--line)] pt-8 md:pt-12">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          <div className="space-y-4">
            <p className="text-[12px] text-[var(--muted)]">
              {activeProject.client} / {activeProject.year}
            </p>
            <h2 className="max-w-[12ch] text-[clamp(2rem,4vw,3.6rem)] font-normal leading-[1.03] tracking-[-0.045em] text-[var(--ink)]">
              {activeProject.headline}
            </h2>
            <p className="text-[15px] leading-7 text-[var(--muted)]">
              {activeProject.description}
            </p>
            <Link
              href={`/projects/${activeProject.slug}`}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--ink)] transition-opacity duration-150 hover:opacity-65"
            >
              View full case study
              <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid gap-8">
            <div className="grid gap-4 md:grid-cols-3">
              {activeProject.metrics.map((metric) => (
                <div key={metric.label} className="info-card">
                  <p className="text-[12px] text-[var(--muted)]">{metric.label}</p>
                  <p className="mt-4 text-[30px] leading-none tracking-[-0.05em] text-[var(--ink)]">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {activeProject.detailSections.map((section) => (
                <div key={section.heading} className="space-y-3 border-t border-[var(--line)] pt-4">
                  <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {section.heading}
                  </p>
                  <p className="text-[14px] leading-6 text-[var(--ink)]">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
