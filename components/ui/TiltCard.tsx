"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersReducedMotion } from "@/lib/gsap";

export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });

  useEffect(() => {
    setEnabled(
      window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion(),
    );
  }, []);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={className}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        ry.set(px * 10);
        rx.set(-py * 8);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
