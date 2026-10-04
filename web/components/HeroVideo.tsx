"use client";
import { useEffect, useRef } from "react";

const DESKTOP = "/video/hero.mp4";
const MOBILE = "/video/hero-mobile.mp4";
const POSTER = "/video/hero-poster.jpg";

type SaveDataNav = Navigator & { connection?: { saveData?: boolean } };

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Respect reduced motion and data-saver: keep the poster, skip the download
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as SaveDataNav).connection?.saveData === true;
    if (reduced || saveData) return;

    // React does not reliably set the muted attribute, and iOS needs it before play()
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const src = window.matchMedia("(max-width: 768px)").matches ? MOBILE : DESKTOP;
    if (!v.getAttribute("src")) {
      v.src = src;
      v.load();
    }

    const tryPlay = () => { v.play().catch(() => {}); };
    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);

    // Browsers that block autoplay (battery saver, some in-app browsers) allow it after any touch or scroll
    const unlock = () => {
      tryPlay();
      ["touchstart", "pointerdown", "keydown", "scroll"].forEach(e => window.removeEventListener(e, unlock));
    };
    ["touchstart", "pointerdown", "keydown", "scroll"].forEach(e => window.addEventListener(e, unlock, { passive: true }));

    const onVisible = () => { if (document.visibilityState === "visible") tryPlay(); };
    document.addEventListener("visibilitychange", onVisible);

    // Save battery and data when the hero is off screen
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) tryPlay();
      else v.pause();
    }, { threshold: 0.05 });
    io.observe(v);

    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      ["touchstart", "pointerdown", "keydown", "scroll"].forEach(e => window.removeEventListener(e, unlock));
      document.removeEventListener("visibilitychange", onVisible);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay muted loop playsInline preload="auto"
      poster={POSTER}
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
    />
  );
}
