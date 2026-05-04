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
    <section style={{ padding: isMobile ? `0 20px 64px` : `0 ${PAD} 88px`, background: "#0e0e0c" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          style={{ background: "#F8931E", borderRadius: "12px", overflow: "hidden", padding: isMobile ? "32px 24px" : "52px 60px" }}
          initial={{ opacity: 0, y: 32, clipPath: "inset(15% 0% 0% 0%)" }}
          animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "24px" : "56px", alignItems: "flex-start" }}>
            {/* Avatar */}
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: isMobile ? "16px" : "0", flexDirection: isMobile ? "row" : "column" }}>
              <div style={{
                width: isMobile ? "52px" : "72px", height: isMobile ? "52px" : "72px",
                borderRadius: "50%", background: "rgba(0,0,0,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.08em" }}>PHOTO</span>
              </div>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.85)", marginTop: isMobile ? "0" : "14px", letterSpacing: "0.02em" }}>Ar. Manas Makwana</p>
                <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.6)", marginTop: "2px" }}>Founder, Ranzospace</p>
              </div>
            </div>

            {/* Quote */}
            <div style={{ flex: 1 }}>
              {[
                "I started Ranzospace because I saw a gap between what people needed and what the industry was offering. Too much style, not enough substance. Too many promises, not enough accountability.",
                "I wanted to build something different. A studio where design felt like life. Where honesty matters more than agreement. Where the answers we create feel right not just on day one, but years from then.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  style={{ fontSize: isMobile ? "14px" : "clamp(14px, 1.15vw, 17px)", fontWeight: 300, color: "rgba(0,0,0,0.85)", lineHeight: 1.8, marginBottom: "16px" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.25 + i * 0.15 }}
                >
                  {text}
                </motion.p>
              ))}
              <motion.p
                style={{ fontSize: isMobile ? "15px" : "clamp(15px, 1.2vw, 18px)", fontWeight: 700, color: "rgba(0,0,0,0.92)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.55 }}
              >
                That's still what drives us today.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
