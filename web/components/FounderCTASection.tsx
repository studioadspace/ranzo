"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const quoteParas = [
  "I started Ranzospace because I saw a gap between what people needed and what the industry was offering. Too much style, not enough substance. Too many promises, not enough accountability.",
  "I wanted to build something different. A studio where design felt like life. Where vision matters more than agreement. Where the spaces we create feel right not just on day one, but become part of a family's legacy.",
];

function WordRevealParagraph({ text, startIndex, inView, style }: { text: string; startIndex: number; inView: boolean; style: React.CSSProperties }) {
  const words = text.split(" ");
  return (
    <p style={{ ...style, display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em", paddingBottom: "0.15em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: (startIndex + i) * 0.028, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

export default function FounderCTASection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  let wordOffset = 0;

  return (
    <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 96px`, background: "#0e0e0c" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div ref={ref} style={{ padding: isMobile ? "36px 24px 32px" : "64px 48px", textAlign: "center", maxWidth: "820px", margin: "0 auto" }}>
          {/* Logomark */}
          <motion.div
            style={{ display: "flex", justifyContent: "center", marginBottom: isMobile ? "24px" : "32px" }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/logo-mark.svg" alt="" width={isMobile ? 40 : 48} height={isMobile ? 27 : 32} />
          </motion.div>

          {/* Quote body — word-by-word reveal on scroll into view */}
          {quoteParas.map((text, i) => {
            const el = (
              <WordRevealParagraph
                key={i}
                text={text}
                startIndex={wordOffset}
                inView={inView}
                style={{
                  fontSize: isMobile ? "18px" : "clamp(21px, 1.9vw, 28px)",
                  fontWeight: 600,
                  color: "#fefefe",
                  lineHeight: 1.55,
                  letterSpacing: "-0.01em",
                  marginBottom: isMobile ? "16px" : "22px",
                }}
              />
            );
            wordOffset += text.split(" ").length;
            return el;
          })}

          {/* Closing statement */}
          <motion.p
            style={{
              fontSize: isMobile ? "16px" : "clamp(16px, 1.3vw, 20px)",
              fontWeight: 700,
              color: "#F8931E",
              letterSpacing: "-0.01em",
              marginBottom: isMobile ? "28px" : "40px",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + wordOffset * 0.028 }}
          >
            That&apos;s still what drives us today.
          </motion.p>

          {/* Attribution */}
          <motion.div
            style={{ paddingTop: isMobile ? "20px" : "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.48 + wordOffset * 0.028 }}
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
