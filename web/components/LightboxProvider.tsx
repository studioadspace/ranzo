"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react/dist/ssr";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface LightboxContextValue {
  openLightbox: (src: string, alt?: string) => void;
}

const LightboxContext = createContext<LightboxContextValue>({ openLightbox: () => {} });

export function useLightbox() {
  return useContext(LightboxContext);
}

export default function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const isMobile = useBreakpoint(768);

  const openLightbox = useCallback((imageSrc: string, imageAlt = "") => {
    setSrc(imageSrc);
    setAlt(imageAlt);
  }, []);

  const close = useCallback(() => setSrc(null), []);

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, close]);

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      <AnimatePresence>
        {src && (
          <motion.div
            key="lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={!isMobile ? close : undefined}
            style={{
              position: "fixed", inset: 0, zIndex: 10000,
              background: "rgba(14,14,12,0.96)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: !isMobile ? "pointer" : "default",
            }}
          >
            {/* Close button — mobile only */}
            {isMobile && (
              <button
                onClick={close}
                style={{
                  position: "absolute", top: "20px", right: "20px",
                  width: "44px", height: "44px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "50%",
                  color: "#fefefe",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", zIndex: 10001, fontFamily: "inherit",
                  flexShrink: 0,
                }}
              >
                <X size={20} weight="regular" />
              </button>
            )}

            {/* Image container — stop propagation so clicking image doesn't close on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ cursor: "default", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                style={{
                  maxWidth: isMobile ? "calc(100vw - 40px)" : "min(88vw, 1200px)",
                  maxHeight: isMobile ? "78vh" : "84vh",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: "4px",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
