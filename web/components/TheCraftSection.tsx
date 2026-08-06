"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

function MobileImg({ src, alt, h, delay = 0 }: { src: string; alt: string; h: string; delay?: number }) {
  return (
    <motion.div
      style={{ height: h, overflow: "hidden", position: "relative" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="100vw" />
    </motion.div>
  );
}

// Desktop: clip-path reveal + inner parallax — image content drifts top-to-bottom as section scrolls
function ParallaxImg({ src, alt, h, delay = 0 }: { src: string; alt: string; h: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  // Image moves from 0% to -14% (revealing bottom content as user scrolls down)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  return (
    <motion.div
      ref={ref}
      style={{ height: h, overflow: "hidden", position: "relative" }}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Extra height on the image div so parallax movement stays within bounds */}
      <motion.div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: "-18%", y }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="50vw" />
      </motion.div>
    </motion.div>
  );
}

export default function TheCraftSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (isMobile) {
    return (
      <section style={{ background: "#0e0e0c", padding: "0 0 48px" }}>
        <div style={{ padding: "0 20px 32px" }}>
          <motion.h2
            style={{ fontSize: "clamp(34px, 10vw, 48px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", marginBottom: "16px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            The Craft
          </motion.h2>
          <motion.p
            style={{ fontSize: "15px", color: "#fefefe", fontWeight: 300, lineHeight: 1.8 }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            At Ranzospace, we design beyond what is seen. We shape environments that influence how you
            live, move, and feel every day. Our work is not about surfaces alone. It is about creating
            spaces with depth, balance, and intention.
          </motion.p>
        </div>

        <MobileImg src="/interiors/amir-living-sofa.jpg" alt="Lounge corner interior design Mumbai - bouclé sofa and considered proportions by Ranzospace" h="72vw" delay={0} />

        <div style={{ padding: "20px 20px 0" }}>
          <p style={{ fontSize: "15px", color: "#fefefe", fontWeight: 300, lineHeight: 1.8, marginBottom: "24px" }}>
            Creating structures that breathe. Our practice focuses on the core principles: light, air, and space.
          </p>
        </div>

        <MobileImg src="/architecture/in-process-01.jpg" alt="Architectural design process sketch by Ranzospace Mumbai" h="52vw" delay={0.1} />

        <div style={{ padding: "20px 20px 0" }}>
          <p style={{ fontSize: "15px", color: "#fefefe", fontWeight: 300, lineHeight: 1.8, marginBottom: "24px" }}>
            Every space begins as a line on paper. Our process moves from concept to construction with precision and intent.
          </p>
        </div>

        <MobileImg src="/interiors/amir-living-02.jpg" alt="Premium living room interior design Mumbai - considered proportions and bespoke finishes by Ranzospace" h="64vw" delay={0.15} />

        <div style={{ padding: "20px 20px 0" }}>
          <p style={{ fontSize: "15px", color: "#fefefe", fontWeight: 300, lineHeight: 1.8 }}>
            Materiality is the primary language of Ranzospace. We source materials unique to
            your requirements and bring each space a sense of calm and permanence.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "#0e0e0c", padding: `0 ${PAD} 100px` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>

        {/* Title block — heading left, body text right, aligned at baseline */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            marginBottom: "48px",
            alignItems: "end",
          }}
        >
          <motion.h2
            style={{ fontSize: "clamp(40px, 3.8vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fefefe", lineHeight: 1.0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            The Craft
          </motion.h2>
          <motion.p
            style={{ fontSize: "16px", color: "#fefefe", fontWeight: 300, lineHeight: 1.85 }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            At Ranzospace, we design beyond what is seen. We shape environments that influence how you
            live, move, and feel every day. Our work is not about surfaces alone. It is about creating
            spaces with depth, balance, and intention.
          </motion.p>
        </div>

        {/* Asymmetric image grid — left column: tall + short. Right column: offset + medium + taller */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}>

          {/* LEFT — large main image, small accent below */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <ParallaxImg
              src="/interiors/amir-living-sofa.jpg"
              alt="Lounge corner interior design Mumbai - bouclé sofa and oak coffee table by Ranzospace"
              h="clamp(380px, 44vw, 580px)"
              delay={0}
            />
            <ParallaxImg
              src="/interiors/amir-bedroom-orange.jpg"
              alt="Master bedroom interior design Mumbai - upholstered bed frame with warm tone joinery by Ranzospace"
              h="clamp(200px, 22vw, 280px)"
              delay={0.12}
            />
            <p style={{ fontSize: "15px", color: "#fefefe", fontWeight: 300, lineHeight: 1.8, maxWidth: "380px", marginTop: "4px" }}>
              Creating structures that breathe. Our practice focuses on the core principles: light, air,
              and space. We aim to bring in the humane functionality together.
            </p>
          </div>

          {/* RIGHT — offset from top, two sketches at different heights */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "clamp(56px, 6vw, 96px)" }}>
            <ParallaxImg
              src="/architecture/in-process-01.jpg"
              alt="Architectural design process sketch by Ranzospace Mumbai - concept drawing"
              h="clamp(340px, 37vw, 500px)"
              delay={0.2}
            />
            <ParallaxImg
              src="/architecture/in-process-03.jpg"
              alt="Architectural process study by Ranzospace Mumbai - spatial planning sketch"
              h="clamp(320px, 34vw, 460px)"
              delay={0.3}
            />
            <p style={{ fontSize: "15px", color: "#fefefe", fontWeight: 300, lineHeight: 1.8, maxWidth: "380px", marginTop: "4px" }}>
              Every space begins as a line on paper. Materiality is the primary language of Ranzospace.
              We source materials unique to your requirements and bring each space a sense of calm and permanence.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
