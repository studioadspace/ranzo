"use client";
import { useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const quoteParas = [
  "I started Ranzospace because I saw a gap between what people needed and what the industry was offering. Too much style, not enough substance. Too many promises, not enough accountability.",
  "I wanted to build something different. A studio where design felt like life. Where vision matters more than agreement. Where the spaces we create feel right not just on day one, but become part of a family's legacy.",
];

// Word snaps to full opacity — near-zero transition band = pop, not fade
function Word({ word, start, progress }: {
  word: string; start: number; progress: MotionValue<number>;
}) {
  // 0.008 band on a 320vh container = ~25px of scroll per word snap — feels instant
  const opacity = useTransform(progress, [start, start + 0.008], [0, 1]);
  return (
    <motion.span style={{ display: "inline-block", marginRight: "0.3em", opacity, color: "#fefefe", fontWeight: 600 }}>
      {word}
    </motion.span>
  );
}

function FadeIn({ start, end, progress, children, style }: {
  start: number; end: number; progress: MotionValue<number>;
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return <motion.div style={{ opacity, ...style }}>{children}</motion.div>;
}

function DesktopFounder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothing: fast scroll doesn't dump all words at once, slow scroll feels precise
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 25, mass: 0.8 });

  const total = useMemo(
    () => quoteParas.reduce((n, p) => n + p.split(" ").length, 0),
    []
  );

  const LOGO_END   = 0.09;
  const W_START    = 0.12;
  const W_END      = 0.80;
  const stagger    = (W_END - W_START) / (total - 1);

  const logoOpacity = useTransform(smooth, [0, LOGO_END], [0, 1]);
  const logoScale   = useTransform(smooth, [0, LOGO_END], [0.88, 1]);

  return (
    // 320vh = enough scroll distance for the reveal to feel deliberate word-by-word
    <div ref={containerRef} style={{ height: "320vh", position: "relative", background: "#0e0e0c" }}>
      <div style={{
        position: "sticky", top: 0, minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "60px 0",
      }}>
        <div style={{
          maxWidth: MAX_W, margin: "0 auto", width: "100%", padding: `0 ${PAD}`,
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>

          <motion.div style={{ opacity: logoOpacity, scale: logoScale, marginBottom: "40px" }}>
            <Image src="/favicon.svg" alt="" width={64} height={64} />
          </motion.div>

          <div style={{ textAlign: "center", maxWidth: "760px" }}>
            {quoteParas.map((text, pi) => {
              let wordOffset = 0;
              for (let k = 0; k < pi; k++) wordOffset += quoteParas[k].split(" ").length;
              return (
                <p key={pi} style={{
                  fontSize: "clamp(18px, 1.6vw, 23px)", lineHeight: 1.55, letterSpacing: "-0.01em",
                  marginBottom: pi < quoteParas.length - 1 ? "16px" : "28px",
                }}>
                  {text.split(" ").map((word, wi) => {
                    const gi = wordOffset + wi;
                    const start = W_START + gi * stagger;
                    return <Word key={wi} word={word} start={start} progress={smooth} />;
                  })}
                </p>
              );
            })}

            <FadeIn start={0.81} end={0.89} progress={smooth} style={{
              fontSize: "clamp(15px, 1.2vw, 18px)", fontWeight: 700, color: "#F8931E",
              letterSpacing: "-0.01em", marginBottom: "28px",
            }}>
              That&apos;s still what drives us today.
            </FadeIn>

            <FadeIn start={0.88} end={0.97} progress={smooth} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
            }}>
              <span style={{ width: "20px", height: "2px", background: "#F8931E", display: "block" }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#fefefe", letterSpacing: "0.04em" }}>Ar. Manas Makwana</p>
                <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300, marginTop: "3px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Founder, Ranzospace</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileFounder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section style={{ padding: "0 20px 48px", background: "#0e0e0c" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div ref={ref} style={{ padding: "36px 24px 32px", textAlign: "center" }}>
          <motion.div
            style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          >
            <Image src="/favicon.svg" alt="" width={36} height={36} />
          </motion.div>

          {quoteParas.map((text, i) => (
            <motion.p
              key={i}
              style={{ fontSize: "18px", fontWeight: 600, color: "#fefefe", lineHeight: 1.55, margin: "0 auto 16px" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.2 }}
            >
              {text}
            </motion.p>
          ))}

          <motion.p
            style={{ fontSize: "16px", fontWeight: 700, color: "#F8931E", letterSpacing: "-0.01em", marginBottom: "28px" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.55, delay: 0.6 }}
          >
            That&apos;s still what drives us today.
          </motion.p>

          <motion.div
            style={{ paddingTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.55, delay: 0.7 }}
          >
            <span style={{ width: "20px", height: "2px", background: "#F8931E", display: "block" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#fefefe", letterSpacing: "0.04em" }}>Ar. Manas Makwana</p>
              <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300, marginTop: "3px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Founder, Ranzospace</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function FounderCTASection() {
  const isMobile = useBreakpoint(768);
  return isMobile ? <MobileFounder /> : <DesktopFounder />;
}
