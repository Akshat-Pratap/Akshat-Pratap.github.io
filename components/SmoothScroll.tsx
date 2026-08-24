"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLoaded } from "@/components/LoaderProvider";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const loaded = useLoaded();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09 });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    if (loaded) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [loaded]);

  return <>{children}</>;
}
