"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLightbox } from "@/components/LightboxProvider";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const projects = [
  { src: "/projects-photos/pramod-02.jpg",        alt: "Luxury living room interior design by Ranzospace Mumbai - warm tones and bespoke furniture",          ratio: "4 / 3",  label: "Living Room · Mumbai" },
  { src: "/projects-photos/rishi-staging-02.jpg", alt: "Contemporary dining room design Mumbai - custom built-ins and natural materials by Ranzospace",        ratio: "4 / 3",  label: "Dining Room · Mumbai" },
  { src: "/projects-photos/rishi-staging-03.jpg", alt: "Master bedroom interior design Mumbai - layered lighting and premium finishes by Ranzospace",          ratio: "4 / 3",  label: "Master Bedroom · Mumbai" },
  { src: "/projects-photos/rishi-photo-04.jpg",   alt: "Custom wardrobe and storage design Mumbai - floor-to-ceiling joinery by Ranzospace",                  ratio: "4 / 3",  label: "Custom Wardrobe · Mumbai" },
];

function Card({ p, index, isMobile }: { p: (typeof projects)[0]; index: number; isMobile: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { openLightbox } = useLightbox();
  const isRightColumn = index % 2 === 1;
  const marginTop = !isMobile && isRightColumn && index > 0 ? "32px" : undefined;

  return (
    <motion.div
      ref={ref}
      onClick={() => openLightbox(p.src, p.alt)}
      data-cursor="hover"
      style={{ aspectRatio: isMobile ? "4 / 3" : p.ratio, overflow: "hidden", position: "relative", cursor: "pointer", marginTop }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
    >
      <motion.div
        variants={isMobile ? undefined : { hover: { scale: 1.05 } }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Image src={p.src} alt={p.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 50vw" />
      </motion.div>
      {/* Desktop only: label reveals on hover. Mobile: clean image, no label. */}
      {!isMobile && (
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
          <p style={{ fontSize: "13px", color: "#fefefe", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
            {p.label}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function RecentWorksSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#0e0e0c", padding: isMobile ? "0 20px 48px" : `0 ${PAD} 88px` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.h2
          style={{ fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(28px, 2.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", marginBottom: "16px", textAlign: isMobile ? "left" : "right" }}
          initial={{ opacity: 0, x: isMobile ? 0 : 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Recent Works
        </motion.h2>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "6px" : "10px" }}>
          {projects.map((p, i) => <Card key={i} p={p} index={i} isMobile={isMobile} />)}
        </div>
      </div>
    </section>
  );
}
