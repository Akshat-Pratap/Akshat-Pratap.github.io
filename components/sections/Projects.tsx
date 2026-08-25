"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Leaf, MessagesSquare, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLoaded } from "@/components/LoaderProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import TiltCard from "@/components/ui/TiltCard";
import { projects, type Project } from "@/content/data";

const icons = {
  sparkles: Sparkles,
  messages: MessagesSquare,
  leaf: Leaf,
};

function ProjectCard({ project }: { project: Project }) {
  const Icon = icons[project.icon];
  return (
    <TiltCard className="w-full shrink-0 md:w-[68vw] lg:w-[42vw] lg:max-w-[640px]">
      <article data-cursor>
        <div
          className={`relative aspect-[16/10] select-none overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.gradient}`}
        >
          <div className="grid-lines absolute inset-0 opacity-40" />
          <span className="absolute -bottom-8 right-1 font-display text-[10rem] font-bold leading-none text-white/15">
            {project.index}
          </span>

          <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-black/25 backdrop-blur-sm">
            <Icon size={22} className="text-white" />
          </div>

          {project.live && (
            <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium tracking-wider text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-300" />
              LIVE
            </span>
          )}

          <a
            href={project.live ?? project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-ink text-bone opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
            <span className="shrink-0 text-sm text-ember">{project.subtitle}</span>
          </div>

          <p className="mt-3 max-w-xl leading-relaxed text-bone/60">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-bone/80"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full bg-bone px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ember hover:text-bone"
                >
                  Live <ArrowUpRight size={14} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-colors hover:border-ember hover:text-ember"
              >
                <Github size={14} /> Code
              </a>
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export default function Projects() {
  const loaded = useLoaded();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loaded || prefersReducedMotion()) return;

    let cancelled = false;
    const mm = gsap.matchMedia();

    const setup = () => {
      if (cancelled) return;
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            pinType: "fixed",
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });
      });
      ScrollTrigger.refresh();
    };

    if (document.fonts?.status === "loaded") {
      setup();
    } else {
      document.fonts?.ready.then(setup);
    }

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, [loaded]);

  const currentIdx = Math.min(
    projects.length,
    Math.max(1, Math.ceil(progress * projects.length + 0.35)),
  );

  return (
    <section id="work" ref={sectionRef} className="relative pt-[14vh]">
      <div className="mx-auto mb-16 max-w-7xl px-6 lg:px-12">
        <SectionHeading index="03" title="Selected Work" />
      </div>

      <div ref={wrapRef} className="relative">
        <div className="lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
          <div className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:justify-center">
          <div
            ref={trackRef}
            className="flex flex-col gap-20 px-6 pb-6 lg:w-max lg:flex-row lg:items-center lg:gap-[5vw] lg:px-[8vw] lg:pb-0"
          >
            <FadeIn className="hidden w-[26vw] shrink-0 flex-col gap-5 lg:flex">
              <p className="font-display text-lg leading-snug text-bone/90">
                Three products.
                <br />
                All designed, built and{" "}
                <span className="text-gradient-ember">deployed by me.</span>
              </p>
              <p className="text-sm text-ash">
                Drag through the deck ↓ or just keep scrolling — everything you
                see runs live in production.
              </p>
            </FadeIn>

            {projects.map((p) => (
              <FadeIn key={p.index} className="w-full md:w-[68vw] lg:w-[42vw]">
                <ProjectCard project={p} />
              </FadeIn>
            ))}
          </div>
          </div>

          <div className="hidden shrink-0 lg:block px-[8vw] pb-7 pt-4">
            <div className="mb-3 flex items-end justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="relative flex h-11 w-7 shrink-0 items-start justify-center rounded-full border border-white/30 pt-2">
                  <motion.span
                    className="h-2 w-1 rounded-full bg-gradient-to-b from-ember to-glow"
                    animate={{ y: [0, 18], opacity: [1, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeIn",
                    }}
                  />
                </span>
                <div>
                  <p className="font-display text-sm font-medium tracking-[0.25em] text-bone">
                    SCROLL TO EXPLORE
                  </p>
                  <p className="mt-1 text-xs text-ash">
                    Keep scrolling — the deck slides sideways for you
                  </p>
                </div>
              </div>
              <span className="font-display text-sm tabular-nums tracking-wider text-glow">
                {String(currentIdx).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
            <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-ember to-glow"
                style={{
                  transform: `scaleX(${Math.max(progress, 0.02)})`,
                  transition: "transform 0.15s linear",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
