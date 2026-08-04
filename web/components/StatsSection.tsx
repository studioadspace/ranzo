"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    setAnimating(true);
    const duration = 1600;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{animating ? count : target}{suffix}</span>;
}

export default function StatsSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const num = {
    fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em",
    color: "#F8931E",
    userSelect: "none" as const,
  };

  return (
    <section ref={ref} style={{ background: "#0e0e0c", padding: isMobile ? "32px 20px 20px" : `70px ${PAD} 60px` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>

        <motion.p
          style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
        >
          About us
        </motion.p>

        <motion.p
          style={{ fontSize: isMobile ? "15px" : "clamp(17px, 1.1vw, 19px)", fontWeight: 300, color: "#fefefe", lineHeight: 1.85, maxWidth: isMobile ? "100%" : "540px", marginBottom: isMobile ? "28px" : "60px" }}
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
        >
          We don't design for photographs. We design for living. At Ranzospace, every space is shaped
          around how you move, work, rest, and gather. We focus on proportion, light, material quality
          and the kind of understated refinement that only improves with time.
        </motion.p>

        {/* Stats */}
        {isMobile ? (
          /* Mobile: two columns side by side */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ ...num, fontSize: "clamp(64px, 18vw, 96px)" }}>
                <Counter target={8} suffix="+" />
              </div>
              <p style={{ fontSize: "13px", color: "#fefefe", fontWeight: 400, marginTop: "8px", lineHeight: 1.4, maxWidth: "120px" }}>
                Years of architecture design and planning
              </p>
            </motion.div>

            <motion.div
              style={{ textAlign: "right" }}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ ...num, fontSize: "clamp(64px, 18vw, 96px)" }}>
                <Counter target={100} suffix="+" />
              </div>
              <p style={{ fontSize: "13px", color: "#fefefe", fontWeight: 400, marginTop: "8px", lineHeight: 1.4 }}>
                Spaces designed
              </p>
            </motion.div>
          </div>
        ) : (
          /* Desktop: overlapping offset layout */
          <div style={{ position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ ...num, fontSize: "clamp(80px, 9.5vw, 152px)" }}>
                <Counter target={8} suffix="+" />
              </div>
              <p style={{ fontSize: "15px", color: "#fefefe", fontWeight: 400, marginTop: "8px", letterSpacing: "0.02em" }}>
                Years of architecture design and planning
              </p>
            </motion.div>

            <motion.div
              style={{ textAlign: "right", marginTop: "clamp(-40px, -4vw, -64px)" }}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ ...num, fontSize: "clamp(90px, 11vw, 172px)" }}>
                <Counter target={100} suffix="+" />
              </div>
              <p style={{ fontSize: "15px", color: "#fefefe", fontWeight: 400, marginTop: "8px", letterSpacing: "0.02em" }}>
                Spaces designed
              </p>
            </motion.div>
          </div>
        )}

        <motion.div
          style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginTop: isMobile ? "20px" : "60px" }}
          initial={{ scaleX: 0, originX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.5 }}
        />
      </div>
    </section>
  );
}
