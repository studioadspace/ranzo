"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

export default function FounderCTASection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px`, background: "#0e0e0c" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          style={{
            background: "#111110",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            padding: isMobile ? "36px 28px 32px" : "64px 72px 56px",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative opening quote */}
          <p style={{
            fontSize: isMobile ? "72px" : "108px",
            lineHeight: 0.75,
            color: "#F8931E",
            fontFamily: "Georgia, 'Times New Roman', serif",
            marginBottom: isMobile ? "20px" : "28px",
            userSelect: "none",
          }}>&ldquo;</p>

          {/* Quote body */}
          {[
            "I started Ranzospace because I saw a gap between what people needed and what the industry was offering. Too much style, not enough substance. Too many promises, not enough accountability.",
            "I wanted to build something different. A studio where design felt like life. Where honesty matters more than agreement. Where the answers we create feel right not just on day one, but years from then.",
          ].map((text, i) => (
            <motion.p
              key={i}
              style={{
                fontSize: isMobile ? "17px" : "clamp(18px, 1.6vw, 24px)",
                fontWeight: 300,
                color: "#fefefe",
                lineHeight: 1.85,
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                marginBottom: isMobile ? "16px" : "20px",
                maxWidth: "760px",
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.15 }}
            >
              {text}
            </motion.p>
          ))}

          {/* Closing statement */}
          <motion.p
            style={{
              fontSize: isMobile ? "16px" : "clamp(16px, 1.3vw, 20px)",
              fontWeight: 700,
              color: "#fefefe",
              letterSpacing: "-0.01em",
              marginBottom: isMobile ? "28px" : "40px",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.5 }}
          >
            That's still what drives us today.
          </motion.p>

          {/* Attribution */}
          <motion.div
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: isMobile ? "20px" : "24px", display: "flex", alignItems: "center", gap: "14px" }}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.6 }}
          >
            <span style={{ width: "20px", height: "2px", background: "#F8931E", display: "block", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#fefefe", letterSpacing: "0.04em" }}>Ar. Manas Makwana</p>
              <p style={{ fontSize: "11px", color: "#c8c4bc", fontWeight: 300, marginTop: "3px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Founder, Ranzospace</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
