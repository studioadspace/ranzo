"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINE1 = ["Mumbai's", "most", "loved"];
const LINE2 = ["architecture", "&", "interior"];
const LINE3 = ["design", "studio"];

let wordIdx = 0;
function Word({ word }: { word: string }) {
  const i = wordIdx++;
  return (
    <span style={{ display: "inline-block", overflow: "hidden", marginRight: "0.2em", verticalAlign: "bottom" }}>
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} style={{ background: "#0e0e0c", overflow: "hidden" }}>
      {/* Heading row */}
      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        paddingTop: "clamp(80px, 12vw, 120px)", paddingBottom: "clamp(20px, 3vw, 28px)",
        paddingLeft: "clamp(16px, 5vw, 48px)", paddingRight: "clamp(16px, 5vw, 48px)",
        maxWidth: "1440px", margin: "0 auto",
      }}>
        <h1 style={{
          fontSize: "clamp(46px, 4.8vw, 76px)",
          fontWeight: 800, lineHeight: 1.08,
          letterSpacing: "-0.03em", color: "#f0ece4",
          maxWidth: "75%",
        }}>
          <div>{LINE1.map(w => <Word key={w} word={w} />)}</div>
          <div>{LINE2.map(w => <Word key={w} word={w} />)}</div>
          <div>{LINE3.map(w => <Word key={w} word={w} />)}</div>
        </h1>

        <motion.div
          style={{ textAlign: "right", paddingTop: "6px" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.9 }}
        >
          <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "8px" }}>Since 2018</p>
          <p style={{ fontSize: "28px", fontWeight: 300, color: "rgba(240,236,228,0.75)", lineHeight: 1.6, fontFamily: "'Instrument Serif', serif" }}>
            Architecture.<br />Design.<br />Furnitures.
          </p>
        </motion.div>
      </div>

      {/* Full-width hero video with fallback */}
      <motion.div
        style={{ y: imgY, overflow: "hidden" }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ position: "relative", width: "100%", height: "clamp(280px, 48vw, 640px)", overflow: "hidden", background: "url(/img18.jpeg) center/cover" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 30%",
            }}
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
