"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLoaded } from "@/components/LoaderProvider";
import GradientMesh from "@/components/ui/GradientMesh";
import { profile } from "@/content/data";

function Letters({ text, outline = false }: { text: string; outline?: boolean }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            data-letter
            className={`inline-block ${outline ? "text-outline" : ""}`}
          >
            {ch}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const loaded = useLoaded();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(
      () => setRoleIdx((i) => (i + 1) % profile.roles.length),
      2600,
    );
    return () => clearInterval(interval);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-letter]", { yPercent: 0 });
        return;
      }

      gsap.fromTo(
        "[data-letter]",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.045,
          ease: "power4.out",
          delay: 0.35,
        },
      );
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 1.1,
        },
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=70%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.to(contentRef.current, { yPercent: -14, opacity: 0.2, ease: "none" }, 0)
          .to(".hero-mesh", { scale: 1.18, ease: "none" }, 0)
          .to(cueRef.current, { opacity: 0, ease: "none" }, 0);
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 lg:px-12"
    >
      <div className="hero-mesh absolute inset-0">
        <GradientMesh />
      </div>
      <div
        className="grid-lines absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-6xl">
        <p
          data-hero-fade
          className="mb-8 text-xs uppercase tracking-[0.35em] text-ash"
        >
          Portfolio ©2026 — {profile.location}
        </p>

        <h1 className="font-display text-[clamp(3.4rem,13vw,11rem)] font-bold leading-[0.92] tracking-tight">
          <span className="block">
            <Letters text={profile.firstName} />
          </span>
          <span className="block">
            <Letters text={profile.lastName} outline />
          </span>
        </h1>

        <div
          data-hero-fade
          className="mt-10 flex items-center gap-4 text-xl lg:text-2xl"
        >
          <span className="h-px w-10 bg-ember" />
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-gradient-ember font-display font-medium"
            >
              {profile.roles[roleIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        <p
          data-hero-fade
          className="mt-6 max-w-xl leading-relaxed text-ash"
        >
          I design and ship full-stack products powered by generative AI —
          from pitch to production.
        </p>
      </div>

      <div
        ref={cueRef}
        data-hero-fade
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-12 w-12 animate-bounce-soft items-center justify-center rounded-full border border-white/15">
          <ArrowDown size={18} className="text-ash" />
        </div>
      </div>
    </section>
  );
}
