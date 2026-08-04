"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";
const AUTO_ADVANCE_MS = 6500;

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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex(i => (i + 1) % testimonials.length), []);
  const prev = useCallback(() => setIndex(i => (i - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, inView, next]);

  const active = testimonials[index];

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ background: "#0e0e0c", padding: isMobile ? "48px 20px" : `90px ${PAD}` }}
    >
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.p
          style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: isMobile ? "32px" : "48px" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Client voices
        </motion.p>

        <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontSize: isMobile ? "56px" : "80px",
            lineHeight: 0.8,
            color: "#F8931E",
            fontFamily: "Georgia, serif",
            marginBottom: isMobile ? "12px" : "20px",
            userSelect: "none",
          }}>&ldquo;</p>

          <div style={{ minHeight: isMobile ? "180px" : "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p style={{
                  fontSize: isMobile ? "20px" : "clamp(22px, 1.9vw, 30px)",
                  fontWeight: 400,
                  color: "#fefefe",
                  lineHeight: 1.55,
                  letterSpacing: "-0.01em",
                  marginBottom: isMobile ? "24px" : "32px",
                }}>
                  {active.quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                  <span style={{ width: "16px", height: "1px", background: "#F8931E", display: "block", flexShrink: 0 }} />
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#fefefe", letterSpacing: "0.03em" }}>{active.client}</p>
                    <p style={{ fontSize: "11px", color: "#c8c4bc", fontWeight: 300, marginTop: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{active.type}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav: dots + arrows */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", marginTop: isMobile ? "32px" : "48px" }}>
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              data-cursor="hover"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#c8c4bc", padding: "8px", display: "flex" }}
            >
              <ArrowLeft size={18} weight="regular" />
            </button>
            <div style={{ display: "flex", gap: "8px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  data-cursor="hover"
                  style={{
                    width: i === index ? "22px" : "7px", height: "7px", borderRadius: "100px",
                    background: i === index ? "#F8931E" : "rgba(255,255,255,0.18)",
                    border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0,
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              data-cursor="hover"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#c8c4bc", padding: "8px", display: "flex" }}
            >
              <ArrowRight size={18} weight="regular" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
