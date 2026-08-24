"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { profile } from "@/content/data";

const links = [
  { label: "About", id: "about" },
  { label: "Journey", id: "journey" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        if (Math.abs(y - lastY.current) > 6) {
          setHidden(y > lastY.current && y > 140);
          lastY.current = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed inset-x-0 top-0 z-[110] transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-b border-white/5 bg-ink/70 backdrop-blur-md"
            : ""
        }`}
      >
        <nav className="flex h-[72px] items-center justify-between px-6 lg:px-12">
          <button
            onClick={() => go("top")}
            className="font-display text-lg font-bold tracking-tight"
            aria-label="Back to top"
          >
            AKSHAT<span className="text-ember">.</span>
          </button>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="group relative text-sm text-ash transition-colors hover:text-bone"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ember transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-ash lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ember" />
            {profile.availability}
          </div>

          <button
            className="text-bone md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[105] flex flex-col items-center justify-center gap-8 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                onClick={() => go(l.id)}
                className="font-display text-4xl font-bold tracking-tight"
              >
                <span className="mr-3 text-sm text-ember">0{i + 1}</span>
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
