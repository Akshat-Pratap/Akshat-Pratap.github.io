"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Cloud, Droplets, Eye, Flag, Flame, Trophy } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import BadgeModal from "@/components/ui/BadgeModal";
import { achievements } from "@/content/data";

const icons = {
  cloud: Cloud,
  trophy: Trophy,
  droplets: Droplets,
  flag: Flag,
  flame: Flame,
};

export default function Achievements() {
  const [badgeSrc, setBadgeSrc] = useState<string | null>(null);

  return (
    <section id="achievements" className="relative mx-auto max-w-7xl px-6 py-[14vh] lg:px-12">
      <SectionHeading index="05" title="Proof of Work" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((a, i) => {
          const Icon = icons[a.icon as keyof typeof icons];
          const card = (
            <article
              data-cursor
              className="group relative h-full rounded-2xl border border-white/10 bg-coal/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ember/50 hover:shadow-[0_20px_60px_-20px_rgba(255,94,31,0.25)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-smoke text-glow transition-colors duration-300 group-hover:bg-ember group-hover:text-ink">
                  <Icon size={20} />
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.15em] text-ash">
                  {a.tag}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/60">
                {a.detail}
              </p>
              {a.flipImage && (
                <span className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-ember/40 bg-ink/80 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
                  <Eye size={11} />
                  View badge
                </span>
              )}
            </article>
          );

          return (
            <FadeIn key={a.title} delay={i * 0.06} className="h-full">
              {a.flipImage ? (
                <button
                  onClick={() => setBadgeSrc(a.flipImage!)}
                  className="h-full text-left"
                >
                  {card}
                </button>
              ) : (
                card
              )}
            </FadeIn>
          );
        })}
      </div>

      <AnimatePresence>
        {badgeSrc && (
          <BadgeModal
            src={badgeSrc}
            alt="LeetCode 100-Day Badge certificate"
            onClose={() => setBadgeSrc(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
