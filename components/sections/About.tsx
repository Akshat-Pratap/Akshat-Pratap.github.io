"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import StatCounter from "@/components/ui/StatCounter";
import { profile, stats } from "@/content/data";

const WavingAvatar = dynamic(() => import("@/components/ui/WavingAvatar"), {
  ssr: false,
  loading: () => <div className="h-[360px] w-[280px] lg:h-[420px] lg:w-[320px] animate-pulse rounded-3xl bg-white/5" />,
});

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

        <FadeIn delay={0.15} className="self-center lg:mt-0 lg:self-start lg:ml-auto">
          <WavingAvatar src="/models/waving-gesture.glb" />
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
