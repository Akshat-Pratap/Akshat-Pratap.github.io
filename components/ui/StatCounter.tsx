"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function StatCounter({
  value,
  decimals = 0,
  suffix = "",
  label,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${value.toFixed(decimals)}${suffix}`;
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${obj.v.toFixed(decimals)}${suffix}`;
        },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [value, decimals, suffix]);

  return (
    <div ref={rootRef} className="flex flex-col gap-1">
      <span
        ref={numRef}
        className="font-display text-4xl font-bold tabular-nums lg:text-5xl"
      >
        0{suffix}
      </span>
      <span className="text-sm uppercase tracking-[0.2em] text-ash">{label}</span>
    </div>
  );
}
