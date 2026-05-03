"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const lines = [
  { text: "Ranzospace is a Mumbai-based design studio working with clients who value quality, clarity, and design that lasts.", bold: false },
  { text: "", bold: false },
  { text: "We don't begin with style.", bold: true },
  { text: "", bold: false },
  { text: "We begin by understanding how you live.", bold: true },
  { text: "", bold: false },
  { text: "Your medium, your preferences, the life you want your space to support. Then we translate that into interiors that feel natural, considered, and entirely yours.", bold: false },
];

export default function OurStorySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#0e0e0c", padding: `0 ${PAD} 88px` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "80px", alignItems: "start" }}>

          <motion.h2
            style={{ fontSize: "clamp(34px, 3.2vw, 56px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f0ece4", lineHeight: 1.12 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Our<br />Story
          </motion.h2>

          <div ref={ref} style={{ maxWidth: "640px", paddingTop: "6px" }}>
            {lines.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.p
                  style={{
                    fontSize: line.bold ? "clamp(16px, 1.3vw, 20px)" : "clamp(15px, 1.1vw, 17px)",
                    fontWeight: line.bold ? 600 : 300,
                    color: line.bold ? "rgba(240,236,228,0.88)" : "rgba(240,236,228,0.75)",
                    lineHeight: line.text ? 1.85 : 0,
                    height: line.text ? "auto" : "22px",
                  }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line.text || " "}
                </motion.p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
