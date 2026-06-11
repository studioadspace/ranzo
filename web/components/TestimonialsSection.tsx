"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const testimonials = [
  {
    quote: "Our home in Bandra felt completely transformed. Ranzospace brought a level of precision we hadn't encountered with any other studio. Every material, every proportion, considered.",
    client: "P.K.",
    type: "Residential Client, Mumbai",
  },
  {
    quote: "We were building our second home and wanted it to carry a sense of permanence. Ranzospace delivered exactly that. The space has only improved with every month we've lived in it.",
    client: "R.S.",
    type: "Residential Client, Mumbai",
  },
  {
    quote: "Our office needed to reflect where we were headed, not where we'd been. Ranzospace understood the brief immediately and never needed to be told twice.",
    client: "A.M.",
    type: "Commercial Client, Mumbai",
  },
];

export default function TestimonialsSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: isMobile ? "0px" : "-60px" });

  return (
    <section ref={ref} style={{ background: "#0e0e0c", padding: isMobile ? "48px 20px" : `80px ${PAD}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.p
          style={{ fontSize: "11px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: isMobile ? "32px" : "56px" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Client voices
        </motion.p>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: isMobile ? "0" : "2px",
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                padding: isMobile ? "28px 0" : "40px",
                background: isMobile ? "transparent" : "rgba(255,255,255,0.015)",
              }}
            >
              <p style={{
                fontSize: isMobile ? "32px" : "48px",
                lineHeight: 0.8,
                color: "#F8931E",
                fontFamily: "Georgia, serif",
                marginBottom: isMobile ? "16px" : "20px",
                userSelect: "none",
              }}>&ldquo;</p>
              <p style={{
                fontSize: isMobile ? "15px" : "clamp(14px, 1.1vw, 17px)",
                fontWeight: 300,
                color: "#fefefe",
                lineHeight: 1.85,
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                marginBottom: isMobile ? "20px" : "28px",
              }}>
                {t.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "16px", height: "1px", background: "#F8931E", display: "block", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#fefefe", letterSpacing: "0.03em" }}>{t.client}</p>
                  <p style={{ fontSize: "11px", color: "#c8c4bc", fontWeight: 300, marginTop: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
