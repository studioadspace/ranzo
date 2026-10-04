"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import AutoVideo from "@/components/AutoVideo";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const FILMS = [
  { n: 1, label: "Living and dining by Ranzospace, a walkthrough of a finished Mumbai home", from: 56, to: -56 },
  { n: 2, label: "Dining and living room by Ranzospace, a walkthrough in evening light", from: -24, to: 24 },
  { n: 3, label: "Living room by Ranzospace with cove lighting and a bouclé sofa", from: 72, to: -40 },
];

function Film({ f, i, progress, parallax }: { f: (typeof FILMS)[0]; i: number; progress: MotionValue<number>; parallax: boolean }) {
  const y = useTransform(progress, [0, 1], [f.from, f.to]);
  const scale = useTransform(progress, [0, 0.35], [0.94, 1]);
  return (
    <motion.div
      style={{
        position: "relative", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: "6px", background: "#141410",
        scrollSnapAlign: "start", y: parallax ? y : 0, scale: parallax ? scale : 1,
      }}
    >
      <AutoVideo src={`/video/walk-${f.n}.mp4`} poster={`/video/walk-${f.n}-poster.jpg`} label={f.label} />
    </motion.div>
  );
}

export default function MotionSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });

  return (
    <section style={{ background: "#0e0e0c", padding: isMobile ? "var(--section-y) 20px 0" : `var(--section-y) ${PAD} 0` }}>
      <div ref={ref} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ overflow: "hidden", paddingBottom: "0.12em", marginBottom: "var(--stack-lg)" }}>
          <motion.h2
            style={{ fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(28px, 2.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe" }}
            initial={{ y: "108%" }} animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            Spaces in Motion
          </motion.h2>
        </div>

        <div ref={gridRef} style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(3, 76vw)" : "repeat(3, minmax(0, 1fr))",
          gap: isMobile ? "12px" : "clamp(16px, 1.6vw, 24px)",
          overflowX: isMobile ? "auto" : "visible",
          scrollSnapType: isMobile ? "x mandatory" : undefined,
          marginRight: isMobile ? "-20px" : undefined,
          paddingRight: isMobile ? "20px" : undefined,
          paddingBottom: isMobile ? 0 : "clamp(40px, 5vw, 72px)",
        }}>
          {FILMS.map((f, i) => <Film key={f.n} f={f} i={i} progress={scrollYProgress} parallax={!isMobile} />)}
        </div>
      </div>
    </section>
  );
}
