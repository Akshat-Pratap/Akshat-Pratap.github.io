"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/content/data";
import { prefersReducedMotion } from "@/lib/gsap";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const complete = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onComplete();
    };

    if (prefersReducedMotion()) {
      complete();
      return;
    }

    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const failsafe = setTimeout(complete, 4500);
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(complete, 350);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      clearTimeout(failsafe);
    };
  }, [onComplete]);

  const letters = `${profile.firstName} ${profile.lastName}`.split("");

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink px-6 py-8 lg:px-12"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <motion.div
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-ash"
      >
        <span>Portfolio</span>
        <span>© 2026</span>
      </motion.div>

      <motion.div
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col items-center gap-6"
      >
        <h1 className="font-display font-bold text-[clamp(2rem,7vw,5rem)] leading-none tracking-tight">
          {letters.map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className={`inline-block ${
                  i >= profile.firstName.length ? "text-outline" : ""
                }`}
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + i * 0.035,
                  ease: EASE,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            </span>
          ))}
        </h1>
        <div className="h-px w-48 max-w-full overflow-hidden rounded bg-smoke">
          <motion.div
            className="h-full bg-gradient-to-r from-ember to-glow"
            style={{ width: `${count}%` }}
          />
        </div>
      </motion.div>

      <motion.div
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
        className="flex items-end justify-between"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-ash">
          {profile.location}
        </p>
        <span className="font-display text-6xl lg:text-8xl font-bold tabular-nums text-gradient-ember">
          {count}%
        </span>
      </motion.div>
    </motion.div>
  );
}
