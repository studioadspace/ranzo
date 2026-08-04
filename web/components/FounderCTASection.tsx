"use client";
import { useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const quoteParas = [
  "I started Ranzospace because I saw a gap between what people needed and what the industry was offering. Too much style, not enough substance. Too many promises, not enough accountability.",
  "I wanted to build something different. A studio where design felt like life. Where vision matters more than agreement. Where the spaces we create feel right not just on day one, but become part of a family's legacy.",
];

// Clean opacity-only reveal - no blur, no vertical motion, just dim-to-bright as you scroll
function RevealWord({ word, start, end, progress }: { word: string; start: number; end: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [start, end], [0.32, 1]);
  return (
    <motion.span style={{ display: "inline-block", marginRight: "0.3em", opacity, color: "#fefefe", fontWeight: 600 }}>
      {word}
    </motion.span>
  );
}

function FadeBlock({ start, end, progress, children, style }: { start: number; end: number; progress: MotionValue<number>; children: React.ReactNode; style?: React.CSSProperties }) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return <motion.div style={{ opacity, ...style }}>{children}</motion.div>;
}

function DesktopFounder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const flatWords = useMemo(() => {
    const words: string[] = [];
    quoteParas.forEach(text => text.split(" ").forEach(w => words.push(w)));
    return words;
  }, []);
  const total = flatWords.length;

  // Logo appears first and stays pinned at the top; words reveal after it, using nearly the
  // full scroll range so the pace matches the pin duration (no rushed reveal, no dead hold).
  const LOGO_END = 0.14;
  const WORDS_START = 0.18;
  const WORDS_END = 0.82;
  const BAND = 1.4 / total * (WORDS_END - WORDS_START);

  const logoOpacity = useTransform(scrollYProgress, [0, LOGO_END], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0, LOGO_END], [0.85, 1]);

  return (
    <div ref={containerRef} style={{ height: "220vh", position: "relative", background: "#0e0e0c" }}>
      {/* No overflow:hidden here - content must never be silently clipped on shorter viewports */}
      <div style={{ position: "sticky", top: 0, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", width: "100%", padding: `0 ${PAD}`, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Logomark - sticks near the top of the block, revealed first, with real visual weight */}
          <motion.div style={{ opacity: logoOpacity, scale: logoScale, marginBottom: "40px" }}>
            <Image src="/logo-mark.svg" alt="" width={72} height={48} />
          </motion.div>

          <div style={{ textAlign: "center", maxWidth: "760px" }}>
            {quoteParas.map((text, pi) => {
              let wordOffset = 0;
              for (let k = 0; k < pi; k++) wordOffset += quoteParas[k].split(" ").length;
              return (
                <p key={pi} style={{
                  fontSize: "clamp(18px, 1.6vw, 23px)", lineHeight: 1.5, letterSpacing: "-0.01em",
                  marginBottom: pi < quoteParas.length - 1 ? "16px" : "28px",
                }}>
                  {text.split(" ").map((word, wi) => {
                    const gi = wordOffset + wi;
                    const start = WORDS_START + (gi / total) * (WORDS_END - WORDS_START);
                    const end = start + BAND;
                    return <RevealWord key={wi} word={word} start={start} end={end} progress={scrollYProgress} />;
                  })}
                </p>
              );
            })}

            <FadeBlock start={0.84} end={0.94} progress={scrollYProgress} style={{
              fontSize: "clamp(15px, 1.2vw, 18px)", fontWeight: 700, color: "#F8931E",
              letterSpacing: "-0.01em", marginBottom: "28px",
            }}>
              That&apos;s still what drives us today.
            </FadeBlock>

            <FadeBlock start={0.9} end={1} progress={scrollYProgress} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
            }}>
              <span style={{ width: "20px", height: "2px", background: "#F8931E", display: "block" }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#fefefe", letterSpacing: "0.04em" }}>Ar. Manas Makwana</p>
                <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300, marginTop: "3px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Founder, Ranzospace</p>
              </div>
            </FadeBlock>
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
            <Image src="/logo-mark.svg" alt="" width={40} height={27} />
          </motion.div>

          {quoteParas.map((text, i) => (
            <motion.p
              key={i}
              style={{ fontSize: "18px", fontWeight: 600, color: "#fefefe", lineHeight: 1.55, marginBottom: "16px", maxWidth: "760px", margin: "0 auto 16px" }}
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
