"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

function RevealImg({ src, alt, h, delay = 0 }: { src: string; alt: string; h: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      style={{ height: h, overflow: "hidden", position: "relative" }}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{ duration: 0.95, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
    </motion.div>
  );
}

export default function TheCraftSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (isMobile) {
    return (
      <section style={{ background: "#0e0e0c", padding: "0 0 72px" }}>
        {/* Heading + text */}
        <div style={{ padding: "0 20px 32px" }}>
          <motion.h2
            style={{ fontSize: "clamp(34px, 10vw, 48px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", marginBottom: "16px" }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            The Craft
          </motion.h2>
          <motion.p
            style={{ fontSize: "15px", color: "#fefefe", fontWeight: 300, lineHeight: 1.8 }}
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            At Ranzospace, we design beyond what is seen. We shape environments that influence how you
            live, move, and feel every day. Our work is not about surfaces alone — it is about creating
            spaces with depth, balance, and intention.
          </motion.p>
        </div>

        {/* Full-width first image */}
        <RevealImg src="/projects-photos/rishi-staging-01.jpg" alt="Foyer design" h="72vw" delay={0} />

        <div ref={ref} style={{ padding: "20px 20px 0" }}>
          <p style={{ fontSize: "13px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75, marginBottom: "24px" }}>
            Creating structures that breathe. Our practice focuses on the core principles: light, air, and space.
          </p>
        </div>

        {/* Second image */}
        <RevealImg src="/projects-photos/pramod-01.jpg" alt="Living room design" h="64vw" delay={0.15} />

        <div style={{ padding: "20px 20px 0" }}>
          <p style={{ fontSize: "13px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75 }}>
            Materiality is the primary language of Ranzospace. We source materials unique to
            your requirements and help living in calm in the chaos.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "#0e0e0c", padding: `0 ${PAD} 88px` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", alignItems: "start" }}>

          {/* LEFT */}
          <div>
            <RevealImg src="/projects-photos/rishi-staging-01.jpg" alt="Foyer design" h="clamp(400px, 52vw, 720px)" delay={0} />
            <p style={{ fontSize: "14px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.8, marginTop: "16px", maxWidth: "360px" }}>
              Creating structures that breathe. Our practice focuses on the core principles: light, air, and space.
              We aim to bring in the humane functionality together.
            </p>
          </div>

          {/* RIGHT */}
          <div style={{ paddingTop: "56px" }}>
            <motion.h2
              style={{ fontSize: "clamp(34px, 3.2vw, 56px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", marginBottom: "20px" }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              The Craft
            </motion.h2>

            <motion.p
              style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#fefefe", fontWeight: 300, lineHeight: 1.85, marginBottom: "28px", maxWidth: "400px" }}
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.28 }}
            >
              At Ranzospace, we design beyond what is seen. We shape environments that influence how you
              live, move, and feel every day. Our work is not about surfaces alone — it is about creating
              spaces with depth, balance, and intention.
            </motion.p>

            <RevealImg src="/projects-photos/pramod-01.jpg" alt="Contemporary living room" h="clamp(280px, 36vw, 520px)" delay={0.2} />

            <p style={{ fontSize: "14px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.8, marginTop: "16px", maxWidth: "400px" }}>
              Materiality is the primary language of Ranzospace. We source materials that are unique to
              your requirements and help living in calm in the chaos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
