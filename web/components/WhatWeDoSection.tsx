"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const services = [
  { title: "Full-Home & Commercial Interiors", body: "Every space thoughtfully planned in proportion, finish, and detail to maximise functionality across kitchens, bedrooms, living areas, workspaces, and storage." },
  { title: "Architecture & Space Planning", body: "From initial concept to construction documentation. We shape volumes, light, and circulation before a single material is chosen." },
  { title: "Modular Furniture & Decor", body: "Curated furniture selection and smart décor solutions — sofas, ottomans, beds, and accent pieces sourced to suit your lifestyle and aesthetic." },
  { title: "On-Site Execution", body: "Civil, tiling, carpentry, electrical, plumbing, false ceiling, flooring, and painting — managed by our team with 140 quality checks." },
  { title: "AI-Powered Design & 360° Simulations", body: "India's first AI design studio. Experience your space in photorealistic 3D before a single tile is laid. Decisions made with clarity, not guesswork." },
];

function Row({ item, index }: { item: (typeof services)[0]; index: number }) {
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
          justifyContent: "space-between", padding: "22px 0",
          background: "none", border: "none",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          cursor: "none", textAlign: "left",
        }}
      >
        <span style={{ fontSize: "clamp(16px, 1.4vw, 22px)", fontWeight: 500, color: "rgba(240,236,228,0.82)" }}>
          {item.title}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ fontSize: "26px", color: "#F8931E", fontWeight: 300, marginLeft: "20px", flexShrink: 0, lineHeight: 1 }}
        >
          +
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
            <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.85, paddingBottom: "24px", maxWidth: "600px" }}>
              {item.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WhatWeDoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ background: "#0e0e0c", padding: `80px ${PAD}` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.h2
          style={{ fontSize: "clamp(34px, 3.2vw, 56px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f0ece4", marginBottom: "8px" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          What We Do
        </motion.h2>

        <div>
          {services.map((s, i) => <Row key={i} item={s} index={i} />)}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
        </div>
      </div>
    </section>
  );
}
