"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const services = [
  { title: "Full-Home & Commercial Interiors", body: "Every space thoughtfully planned in proportion, finish, and detail to maximise functionality across kitchens, bedrooms, living areas, workspaces, and storage." },
  { title: "Architecture & Space Planning", body: "From initial concept to construction documentation. We shape volumes, light, and circulation before a single material is chosen." },
  { title: "Modular Furniture & Decor", body: "Curated furniture selection and smart décor solutions: sofas, ottomans, beds, and accent pieces sourced to suit your lifestyle and aesthetic." },
  { title: "On-Site Execution", body: "Civil, tiling, carpentry, electrical, plumbing, false ceiling, flooring, and painting, managed by our team with 140 quality checks." },
  { title: "AI-Powered Design & 360° Simulations", body: "India's first AI design studio. Experience your space in photorealistic 3D before a single tile is laid. Decisions made with clarity, not guesswork." },
  { title: "Design Consultation", body: "Every space begins with a conversation. We listen to your lifestyle, your vision, and your space's potential before we draw a single line. Design direction, materials, and budget clarity, so your ideas can take architectural form." },
];

function Row({ item, index, isMobile }: { item: (typeof services)[0]; index: number; isMobile: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "20px 0" : "22px 0",
          background: "none", border: "none",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontSize: isMobile ? "15px" : "clamp(16px, 1.4vw, 22px)", fontWeight: 500, color: "#fefefe" }}>
          {item.title}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: "#F8931E", marginLeft: "16px", flexShrink: 0, display: "flex" }}
        >
          <Plus size={22} weight="regular" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: isMobile ? "14px" : "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85, paddingBottom: "20px", maxWidth: "600px" }}>
              {item.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WhatWeDoSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#0e0e0c", padding: isMobile ? "40px 20px" : `56px ${PAD}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.h2
          style={{ fontSize: isMobile ? "clamp(28px, 9vw, 40px)" : "clamp(34px, 3.2vw, 56px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", marginBottom: isMobile ? "4px" : "8px" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          What We Do
        </motion.h2>

        <div ref={ref}>
          {services.map((s, i) => <Row key={i} item={s} index={i} isMobile={isMobile} />)}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
        </div>
      </div>
    </section>
  );
}
