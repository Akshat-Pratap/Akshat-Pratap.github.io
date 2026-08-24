"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Code2, Github, Linkedin, Mail } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import FadeIn from "@/components/ui/FadeIn";
import { scrollToId } from "@/lib/scroll";
import { profile, socials } from "@/content/data";

const icons = {
  github: Github,
  linkedin: Linkedin,
  leetcode: Code2,
  mail: Mail,
};

export default function Contact() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        }),
      );
    fmt();
    const interval = setInterval(fmt, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="relative mx-auto max-w-7xl px-6 pt-[16vh] lg:px-12">
      <FadeIn>
        <p className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-ash">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
          Got an idea?
        </p>
      </FadeIn>

      <MagneticButton strength={0.15}>
        <a
          href={`mailto:${profile.email}`}
          className="group block font-display font-bold leading-[0.95] tracking-tight"
        >
          <span className="block text-[clamp(2.8rem,9vw,7.5rem)]">
            LET&apos;S BUILD
          </span>
          <span className="flex items-center gap-[0.2em] text-[clamp(2.8rem,9vw,7.5rem)]">
            <span className="text-gradient-ember">SOMETHING</span>
            <ArrowUpRight
              className="h-[0.7em] w-[0.7em] text-ember transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2"
            />
          </span>
        </a>
      </MagneticButton>

      <FadeIn delay={0.1}>
        <p className="mt-8 max-w-md leading-relaxed text-ash">
          I&apos;m open to internships and collaborations. The inbox is always
          open — expect a reply within a day.
        </p>
      </FadeIn>

      <div className="mt-12 flex items-center gap-4">
        {socials.map((s) => {
          const Icon = icons[s.icon];
          return (
            <MagneticButton key={s.label} strength={0.4}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 hover:border-ember hover:text-ember"
              >
                <Icon size={18} />
              </a>
            </MagneticButton>
          );
        })}
      </div>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-7 text-xs text-ash">
        <span>© 2026 Akshat Pratap — built with Next.js, GSAP & Framer Motion</span>
        <span className="tabular-nums">NEW DELHI — {time} IST</span>
        <button
          onClick={() => scrollToId("top")}
          aria-label="Back to top"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-ember hover:text-ember"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
