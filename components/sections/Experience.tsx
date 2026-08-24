"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { experience } from "@/content/data";

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const drawRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        drawRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative mx-auto max-w-5xl px-6 py-[14vh] lg:px-12">
      <SectionHeading index="02" title="Journey" />

      <div ref={listRef} className="relative space-y-16 pl-10 lg:pl-14">
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-[7px] top-1 w-px bg-white/10"
        />
        <span
          ref={drawRef}
          aria-hidden="true"
          className="absolute bottom-1 left-[7px] top-1 w-px origin-top scale-y-0 bg-gradient-to-b from-ember to-glow"
        />

        {experience.map((item) => (
          <FadeIn key={item.title}>
            <article className="relative">
              <span className="absolute -left-12 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-ember/70 bg-ink lg:-left-16">
                <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              </span>

              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs tracking-wider text-glow">
                  {item.period}
                </span>
                {item.tag && (
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.15em] text-ash">
                    {item.tag}
                  </span>
                )}
              </div>

              <h3 className="font-display text-xl font-semibold md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-ash">{item.org}</p>

              <ul className="mt-4 space-y-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="list-disc pl-5 leading-relaxed text-bone/70 marker:text-ember"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
