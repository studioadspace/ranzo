"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const projects = [
  { src: "/projects-photos/pramod-02.jpg",       alt: "Living room - Mumbai",    ratio: "1 / 1",  label: "Living Room · Mumbai" },
  { src: "/projects-photos/rishi-staging-02.jpg", alt: "Dining room - Mumbai",   ratio: "4 / 3",  label: "Dining Room · Mumbai" },
  { src: "/projects-photos/rishi-staging-03.jpg", alt: "Master bedroom - Mumbai", ratio: "4 / 3", label: "Master Bedroom · Mumbai" },
  { src: "/projects-photos/rishi-photo-04.jpg",  alt: "Custom wardrobe - Mumbai", ratio: "4 / 3", label: "Custom Wardrobe · Mumbai" },
];

function Card({ p, index }: { p: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isRightColumn = index % 2 === 1;
  const marginTop = isRightColumn && index > 0 ? "32px" : undefined;

  return (
    <motion.div
      ref={ref}
      style={{ aspectRatio: p.ratio, overflow: "hidden", position: "relative", cursor: "none", marginTop }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
    >
      <motion.div
        variants={{ hover: { scale: 1.05 } }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Image src={p.src} alt={p.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
      </motion.div>
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(14,14,12,0.75) 0%, transparent 55%)",
          display: "flex", alignItems: "flex-end", padding: "20px",
        }}
      >
        <p style={{ fontSize: "13px", color: "rgba(240,236,228,0.85)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
          {p.label}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function RecentWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#0e0e0c", padding: `0 ${PAD} 88px` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.h2
          style={{ fontSize: "clamp(28px, 2.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", marginBottom: "24px", textAlign: "right" }}
          initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Recent Works
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {projects.map((p, i) => <Card key={i} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
