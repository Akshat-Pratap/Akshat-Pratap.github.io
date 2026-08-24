"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Bat from "@/components/ui/Bat";
import { prefersReducedMotion } from "@/lib/gsap";

type TrailBat = { id: number; x: number; y: number; angle: number; size: number };
type BurstBat = { id: number; x: number; y: number; dx: number; dy: number; rot: number };

let nextId = 0;

export default function BatCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [trail, setTrail] = useState<TrailBat[]>([]);
  const [burst, setBurst] = useState<BurstBat[]>([]);
  const last = useRef({ x: -100, y: -100 });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.5 });
  const vx = useVelocity(sx);
  const rotate = useTransform(vx, (v) =>
    Math.max(-18, Math.min(18, v * 0.015)),
  );

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) {
      return;
    }
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (dx * dx + dy * dy > 34 * 34) {
        last.current = { x: e.clientX, y: e.clientY };
        const id = ++nextId;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        setTrail((t) => [
          ...t.slice(-14),
          { id, x: e.clientX, y: e.clientY, angle, size: 15 + Math.random() * 8 },
        ]);
        setTimeout(() => {
          setTrail((t) => t.filter((b) => b.id !== id));
        }, 1000);
      }
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, [data-cursor]"));
    };

    const down = (e: MouseEvent) => {
      setPressed(true);
      const spawned: BurstBat[] = [];
      const count = 7;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
        const dist = 64 + Math.random() * 52;
        spawned.push({
          id: ++nextId,
          x: e.clientX,
          y: e.clientY,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          rot: (Math.random() - 0.5) * 160,
        });
      }
      setBurst((b) => [...b, ...spawned]);
      const ids = new Set(spawned.map((s) => s.id));
      setTimeout(() => {
        setBurst((b) => b.filter((s) => !ids.has(s.id)));
      }, 750);
    };
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[128] overflow-hidden"
        aria-hidden="true"
      >
        {trail.map((t) => (
          <motion.div
            key={t.id}
            className="absolute"
            style={{ left: t.x, top: t.y, width: t.size, marginLeft: -t.size / 2, marginTop: -t.size / 3 }}
            initial={{ opacity: 0.8, scale: 0.9, rotate: t.angle }}
            animate={{ opacity: 0, scale: 0.3, y: -24, rotate: t.angle + 30 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <Bat className="h-auto w-full" />
          </motion.div>
        ))}

        {burst.map((b) => (
          <motion.div
            key={b.id}
            className="absolute"
            style={{ left: b.x, top: b.y, width: 18, marginLeft: -9, marginTop: -6 }}
            initial={{ opacity: 0.95, scale: 0.5, x: 0, y: 0, rotate: 0 }}
            animate={{ opacity: 0, scale: 1.15, x: b.dx, y: b.dy, rotate: b.rot }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Bat className="h-auto w-full" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[132]"
        style={{ x: sx, y: sy, rotate }}
        aria-hidden="true"
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: pressed ? 0.75 : hovering ? 1.65 : 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 20 }}
          >
            <div
              className={
                hovering ? "animate-bat-flap-fast" : "animate-bat-flap"
              }
            >
              <Bat
                className="h-auto w-[42px] drop-shadow-[0_0_14px_rgba(255,94,31,0.65)]"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
