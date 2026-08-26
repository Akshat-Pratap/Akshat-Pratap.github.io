"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, RotateCcw } from "lucide-react";

export default function FlipCard({
  front,
  image,
  alt,
}: {
  front: ReactNode;
  image: string;
  alt: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  const toggle = () => setFlipped((v) => !v);

  return (
    <div
      data-cursor
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label="Flip card to reveal badge"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="group h-full cursor-pointer [perspective:1400px]"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
      >
        <div
          className={`relative h-full [backface-visibility:hidden] ${
            flipped ? "pointer-events-none" : ""
          }`}
        >
          {front}
          {!flipped && (
            <span className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-ember/40 bg-ink/80 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-glow backdrop-blur-sm">
              <RotateCcw size={11} />
              Reveal badge
            </span>
          )}
        </div>

        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-ember/40 shadow-[0_20px_60px_-20px_rgba(255,94,31,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {imgOk ? (
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(max-width: 768px) 90vw, 33vw"
              className="object-cover object-top"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-smoke via-coal to-ink">
              <Flame size={44} className="text-ember" />
              <p className="font-display text-lg font-semibold">
                100 Days Badge 2026
              </p>
              <p className="text-xs text-ash">LeetCode · certificate</p>
            </div>
          )}
          <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-bone/90 backdrop-blur-sm">
            <RotateCcw size={11} />
            Flip back
          </span>
        </div>
      </motion.div>
    </div>
  );
}
