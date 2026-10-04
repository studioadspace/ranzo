"use client";
import { useEffect, useRef } from "react";

export default function AutoVideo({ src, poster, label, objectPosition = "center" }: { src: string; poster: string; label: string; objectPosition?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref} muted loop playsInline preload="metadata" poster={poster} aria-label={label}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
