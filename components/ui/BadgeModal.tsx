"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function BadgeModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const lenis = window.__lenis;
    if (lenis) lenis.stop();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [handleKey]);

  return (
    <>
      {/* backdrop */}
      <motion.div
        className="fixed inset-0 z-[9997] bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* close button */}
      <motion.button
        onClick={onClose}
        aria-label="Close badge"
        className="fixed top-4 right-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink/80 text-bone/80 backdrop-blur-sm transition-colors hover:bg-ember hover:text-ink sm:top-6 sm:right-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 26 }}
      >
        <X size={18} />
      </motion.button>

      {/* scrollable image container */}
      <motion.div
        className="badge-modal-open fixed inset-0 z-[9998] overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
          <motion.div
            className="relative w-full max-w-lg py-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={475}
              height={845}
              priority
              className="h-auto w-full rounded-2xl object-contain shadow-[0_20px_80px_-20px_rgba(255,94,31,0.35)]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
