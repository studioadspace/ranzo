"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

export default function FounderCTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section style={{ padding: `0 ${PAD} 88px`, background: "#0e0e0c" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          style={{ background: "#F8931E", borderRadius: "14px", overflow: "hidden", padding: "52px 60px" }}
          initial={{ opacity: 0, y: 32, clipPath: "inset(15% 0% 0% 0%)" }}
          animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: "flex", gap: "56px", alignItems: "flex-start" }}>
            {/* Avatar */}
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: "rgba(0,0,0,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", letterSpacing: "0.08em" }}>PHOTO</span>
              </div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.65)", marginTop: "14px", letterSpacing: "0.02em" }}>Ar. Manas Makwana</p>
              <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.45)", marginTop: "2px" }}>Founder, Ranzospace</p>
            </div>

            {/* Quote */}
            <div style={{ flex: 1 }}>
              {[
                "I started Ranzospace because I saw a gap between what people needed and what the industry was offering. Too much style, not enough substance. Too many promises, not enough accountability.",
                "I wanted to build something different. A studio where design felt like life. Where honesty matters more than agreement. Where the answers we create feel right not just on day one, but years from then.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  style={{ fontSize: "clamp(14px, 1.15vw, 17px)", fontWeight: 300, color: "rgba(0,0,0,0.82)", lineHeight: 1.85, marginBottom: "18px" }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.25 + i * 0.15 }}
                >
                  {text}
                </motion.p>
              ))}
              <motion.p
                style={{ fontSize: "clamp(15px, 1.2vw, 18px)", fontWeight: 700, color: "rgba(0,0,0,0.92)" }}
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
