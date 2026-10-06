"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yB = useTransform(scrollYProgress, [0, 1], [-40, 100]);

  const num = {
    fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em",
    color: "#F8931E",
    userSelect: "none" as const,
    fontSize: "clamp(64px, 8vw, 128px)",
  };
  const label = { fontSize: isMobile ? "14px" : "15px", color: "#fefefe", fontWeight: 400, marginTop: "12px", lineHeight: 1.5, letterSpacing: "0.01em" };

  const stats = [
    { target: 8, text: "Years of architecture design and planning", delay: 0.18 },
    { target: 100, text: "Spaces designed", delay: 0.3 },
  ];

  return (
    <section ref={ref} style={{ background: "#0e0e0c", padding: isMobile ? "var(--section-y) 20px 0" : `var(--section-y) ${PAD} 0` }}>
      <div style={{
        maxWidth: MAX_W, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) minmax(0, 1fr)",
        columnGap: "clamp(48px, 6vw, 96px)",
        rowGap: "var(--stack-lg)",
        alignItems: "start",
      }}>

        <div>
          <motion.p
            style={{ fontSize: "14px", fontWeight: 400, color: "#c8c4bc", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-serif), Georgia, serif", marginBottom: "20px" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          >
            About us
          </motion.p>

          <motion.p
            style={{ fontSize: isMobile ? "16px" : "clamp(17px, 1.2vw, 20px)", fontWeight: 300, color: "#fefefe", lineHeight: 1.85, maxWidth: "560px", marginBottom: "var(--stack-md)" }}
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}
          >
            We don't design for photographs. We design for living. At Ranzospace, every space is shaped
            around how you move, work, rest, and gather. We focus on proportion, light, material quality
            and the kind of understated refinement that only improves with time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }}
          >
            <Link href="/about" className="text-link" style={{
              display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px",
              color: "#F8931E", fontSize: "15px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.01em",
            }}>
              Read more <ArrowRight size={16} weight="bold" className="text-link-arrow" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: isMobile ? "20px" : "clamp(24px, 3vw, 48px)" }}>
          {stats.map((st, si) => (
            <motion.div
              key={st.target}
                            initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: st.delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div style={{ y: isMobile ? 0 : (si === 0 ? yA : yB), willChange: "transform" }}>
                <div style={num}><Counter target={st.target} suffix="+" /></div>
                <p style={{ ...label, maxWidth: "200px" }}>{st.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
