"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const LINE1 = ["Where", "Mumbai's"];
const LINE2 = ["finest", "spaces"];
const LINE3 = ["take", "form."];

let wordIdx = 0;
function Word({ word, overflowVisible = false }: { word: string; overflowVisible?: boolean }) {
  const i = wordIdx++;
  return (
    <span style={{ display: "inline-block", overflow: overflowVisible ? "visible" : "hidden", marginRight: "0.2em", verticalAlign: "bottom" }}>
      <motion.span
        style={{ display: "inline-block" }}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function HeroSection() {
  wordIdx = 0;
  const isMobile = useBreakpoint(768);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} style={{ background: "#0e0e0c", overflow: "hidden" }}>
      {/* Heading row */}
      <div style={{
        display: "flex",
        alignItems: isMobile ? "flex-end" : "flex-start",
        justifyContent: "space-between",
        paddingTop: isMobile ? "100px" : "clamp(120px, 12vw, 180px)",
        paddingBottom: isMobile ? "20px" : "clamp(24px, 3vw, 56px)",
        paddingLeft: isMobile ? "20px" : "clamp(16px, 5vw, 48px)",
        paddingRight: isMobile ? "20px" : "clamp(16px, 5vw, 48px)",
        maxWidth: "1440px", margin: "0 auto",
      }}>
        <div>
          <h1 style={{
            fontSize: isMobile ? "clamp(44px, 11vw, 64px)" : "clamp(46px, 4.8vw, 76px)",
            fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#fefefe",
            maxWidth: isMobile ? "100%" : "clamp(280px, 100%, 85%)",
          }}>
            <div>{LINE1.map(w => <Word key={w} word={w} />)}</div>
            <div>{LINE2.map(w => <Word key={w} word={w} />)}</div>
            <div>{LINE3.map((w, idx) => <Word key={w} word={w} overflowVisible={idx === 0} />)}</div>
          </h1>
          <motion.p
            style={{
              fontSize: isMobile ? "18px" : "clamp(19px, 1.7vw, 26px)",
              fontWeight: 400,
              color: "#fefefe",
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              letterSpacing: "0.01em",
              marginTop: isMobile ? "14px" : "20px",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.85 }}
          >
            Where Space Becomes Legacy
          </motion.p>
        </div>

        {!isMobile && (
          <motion.div
            style={{ textAlign: "right", paddingTop: "6px", flexShrink: 0 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.9 }}
          >
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "8px" }}>Since 2018</p>
            <p style={{ fontSize: "28px", fontWeight: 300, color: "#c8c4bc", lineHeight: 1.6, fontFamily: "'Instrument Serif', serif" }}>
              Architecture.<br />Design.<br />Furnitures.
            </p>
          </motion.div>
        )}

        {isMobile && (
          <motion.div
            style={{ flexShrink: 0, textAlign: "right", paddingTop: "4px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.9 }}
          >
            <p style={{ fontSize: "9px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "6px" }}>Since 2018</p>
            <p style={{ fontSize: "13px", fontWeight: 300, color: "#c8c4bc", lineHeight: 1.6, fontFamily: "'Instrument Serif', serif" }}>
              Architecture.<br />Design.<br />Furnitures.
            </p>
          </motion.div>
        )}
      </div>

      {/* Full-width hero video */}
      <motion.div
        style={{ y: isMobile ? 0 : imgY, overflow: "hidden" }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          position: "relative", width: "100%",
          height: isMobile ? "52vw" : "clamp(280px, 48vw, 640px)",
          minHeight: isMobile ? "220px" : undefined,
          overflow: "hidden", background: "url(/interiors/amir-living-cove.jpg) center/cover",
        }}>
          <video
            autoPlay muted loop playsInline
            poster="/interiors/amir-living-cove.jpg"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(14,14,12,0.12) 0%, transparent 25%, transparent 70%, rgba(14,14,12,0.35) 100%)",
          }} />
        </div>
      </motion.div>
    </section>
  );
}
