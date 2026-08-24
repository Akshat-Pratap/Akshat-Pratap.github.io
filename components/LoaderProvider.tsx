"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import { ScrollTrigger } from "@/lib/gsap";

const LoaderContext = createContext(false);

export const useLoaded = () => useContext(LoaderContext);

export default function LoaderProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    if (loaded) {
      const t = setTimeout(() => ScrollTrigger.refresh(), 150);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <LoaderContext.Provider value={loaded}>
      <AnimatePresence>
        {!loaded && <Preloader key="preloader" onComplete={handleComplete} />}
      </AnimatePresence>
      {children}
    </LoaderContext.Provider>
  );
}
