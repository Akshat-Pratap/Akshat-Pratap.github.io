"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import StatCounter from "@/components/ui/StatCounter";
import { profile, stats } from "@/content/data";

export default function About() {
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-word]", { opacity: 1 });
        return;
      }
      gsap.to("[data-word]", {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: pRef.current,
          start: "top 82%",
          end: "top 30%",
          scrub: 0.5,
        },
      });
    }, pRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-[16vh] lg:px-12">
      <SectionHeading index="01" title="About" />

      <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
        <p
          ref={pRef}
          className="max-w-3xl font-display text-2xl font-medium leading-snug md:text-[2rem]"
        >
          {profile.bio.split(" ").map((word, i) => (
            <span key={i} data-word className="mr-[0.28em] inline-block opacity-15">
              {word}
            </span>
          ))}
        </p>

        <FadeIn delay={0.15} className="self-center lg:mt-2 lg:self-start">
          <div className="relative h-44 w-44">
            <div className="absolute -inset-3 animate-spin-slow rounded-full border border-dashed border-ember/40" />
            <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-coal font-display text-5xl font-bold shadow-[0_0_80px_rgba(255,94,31,0.18)]">
              <span className="text-gradient-ember">AP</span>
            </div>
            <span className="absolute right-3 top-3 h-2.5 w-2.5 animate-pulse-dot rounded-full bg-ember" />
          </div>
        </FadeIn>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((s) => (
          <FadeIn key={s.label}>
            <StatCounter value={s.value} decimals={s.decimals} suffix={s.suffix} label={s.label} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
