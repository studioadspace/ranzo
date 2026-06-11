"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLightbox } from "@/components/LightboxProvider";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const categories = ["All", "Residential", "Bedroom"];

const projects = [
  {
    src: "/projects-photos/pramod-02.jpg",
    alt: "Luxury living room interior design by Ranzospace, Mumbai - warm tones and custom joinery",
    label: "Living Room", location: "Mumbai", category: "Residential", area: "1,800 sq ft",
    description: "A full-home residential project redesigned around natural light and open circulation. Warm timber finishes, custom storage, and a palette built to improve with age.",
  },
  {
    src: "/projects-photos/pramod-01.jpg",
    alt: "Living room detail with custom wall panelling - Pramod Residence by Ranzospace, Mumbai",
    label: "Living Room Detail", location: "Mumbai", category: "Residential", area: "1,800 sq ft",
    description: "Custom wall panelling and integrated lighting designed as a single resolved composition. Every surface considered as part of the whole.",
  },
  {
    src: "/projects-photos/pramod-03.jpg",
    alt: "Interior detail with bespoke joinery - Pramod Residence by Ranzospace, Mumbai",
    label: "Dining & Corridor", location: "Mumbai", category: "Residential", area: "1,800 sq ft",
    description: "Transitional spaces treated with the same rigour as primary rooms. Proportional joinery and material continuity throughout.",
  },
  {
    src: "/projects-photos/pramod-04.jpg",
    alt: "Bedroom interior design with soft lighting - Pramod Residence by Ranzospace, Mumbai",
    label: "Master Bedroom", location: "Mumbai", category: "Bedroom", area: "400 sq ft",
    description: "A restrained bedroom designed for genuine rest. Layered lighting, built-in storage, and a material palette chosen for its warmth over time.",
  },
  {
    src: "/projects-photos/rishi-staging-01.jpg",
    alt: "Foyer and entrance design - Rishi Residence by Ranzospace, Mumbai",
    label: "Foyer & Entrance", location: "Mumbai", category: "Residential", area: "120 sq ft",
    description: "An entrance that sets the tone for the home. Considered proportions, stone underfoot, and a sense of arrival from the first step.",
  },
  {
    src: "/projects-photos/rishi-staging-02.jpg",
    alt: "Dining room interior by Ranzospace Mumbai - custom table and warm ambient lighting",
    label: "Dining Room", location: "Mumbai", category: "Residential", area: "380 sq ft",
    description: "Dining designed for long evenings and real conversation. Custom table, considered chair selection, and ambient lighting that flatters rather than performs.",
  },
  {
    src: "/projects-photos/rishi-staging-04.jpg",
    alt: "Bedroom with integrated study nook - Rishi Residence by Ranzospace, Mumbai",
    label: "Bedroom & Study", location: "Mumbai", category: "Bedroom", area: "320 sq ft",
    description: "A dual-purpose bedroom that holds a full study without compromise. Built-in joinery manages both functions seamlessly.",
  },
  {
    src: "/projects-photos/rishi-staging-03.jpg",
    alt: "Master bedroom interior design by Ranzospace Mumbai - minimal and warm",
    label: "Master Bedroom", location: "Mumbai", category: "Bedroom", area: "280 sq ft",
    description: "A minimal bedroom where every decision earns its place. Clean volumes, soft materials, and nothing that does not belong.",
  },
  {
    src: "/projects-photos/rishi-photo-04.jpg",
    alt: "Custom wardrobe with soft-close joinery - Rishi Residence by Ranzospace, Mumbai",
    label: "Custom Wardrobe", location: "Mumbai", category: "Bedroom", area: "Custom",
    description: "Bespoke wardrobe joinery designed for a specific life. Soft-close hardware, considered internal organisation, and a finish that matches the room precisely.",
  },
  {
    src: "/projects-photos/rishi-photo-02.jpg",
    alt: "Custom bar unit design - Rishi Residence by Ranzospace, Mumbai",
    label: "Bar Unit", location: "Mumbai", category: "Residential", area: "Custom",
    description: "A custom bar unit built as a furniture piece, not a fixture. Materials chosen to age with the home rather than date it.",
  },
  {
    src: "/projects-photos/rishi-photo-01.jpg",
    alt: "Living space with custom detailing - Rishi Residence by Ranzospace, Mumbai",
    label: "Living Space", location: "Mumbai", category: "Residential", area: "Custom",
    description: "Detailing that rewards close attention. Every junction, every reveal, every finish resolved before a single item was ordered.",
  },
  {
    src: "/projects-photos/rishi-photo-03.jpg",
    alt: "Interior detail photography - Rishi Residence by Ranzospace, Mumbai",
    label: "Interior Detail", location: "Mumbai", category: "Residential", area: "Custom",
    description: "The spaces between spaces, considered. Good design lives in the transitions as much as the set pieces.",
  },
];

function ProjectCard({ p, index, isMobile }: { p: typeof projects[0]; index: number; isMobile: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: isMobile ? "0px" : "-40px" });
  const [hovered, setHovered] = useState(false);
  const { openLightbox } = useLightbox();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => openLightbox(p.src, p.alt)}
      data-cursor="hover"
      style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: "4/3" }}
    >
      <motion.div
        animate={{ scale: hovered && !isMobile ? 1.05 : 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Image src={p.src} alt={p.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 33vw" />
      </motion.div>

      {/* Desktop: label on hover. Mobile: no label, clean image. */}
      {!isMobile && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(14,14,12,0.92) 0%, rgba(14,14,12,0.4) 55%, transparent 100%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 600, color: "#fefefe", letterSpacing: "-0.01em", marginBottom: "4px" }}>{p.label}</p>
          <p style={{ fontSize: "13px", color: "#c8c4bc", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 400, marginBottom: "10px" }}>
            {p.location} · {p.area}
          </p>
          <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.6, opacity: 0.85 }}>{p.description}</p>
        </motion.div>
      )}

      {/* Category chip — desktop only */}
      {!isMobile && (
        <div style={{
          position: "absolute", top: "18px", left: "18px",
          background: "rgba(14,14,12,0.72)", backdropFilter: "blur(8px)",
          padding: "4px 12px", borderRadius: "100px",
        }}>
          <span style={{ fontSize: "11px", color: "#c8c4bc", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
            {p.category}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function WorkPage() {
  const isMobile = useBreakpoint(768);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: isMobile ? `100px 20px 40px` : `140px ${PAD} 60px` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Portfolio
            </motion.p>
            {isMobile ? (
              <div>
                <motion.h1
                  style={{ fontSize: "clamp(44px, 11vw, 64px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "16px" }}
                  initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Our Work
                </motion.h1>
                <motion.p
                  style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75 }}
                  initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.2 }}
                >
                  100+ completed projects across Mumbai. Every space designed from life, not from a catalogue.
                </motion.p>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px" }}>
                <motion.h1
                  style={{ fontSize: "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                  initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Our Work
                </motion.h1>
                <motion.p
                  style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, maxWidth: "380px", lineHeight: 1.75, paddingBottom: "8px" }}
                  initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.2 }}
                >
                  100+ completed projects across Mumbai. Every space designed from life, not from a catalogue.
                </motion.p>
              </div>
            )}
          </div>
        </section>

        {/* Filters — desktop only */}
        {!isMobile && (
          <section style={{ padding: `0 ${PAD} 40px` }}>
            <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: "8px 20px", border: `1px solid ${activeFilter === cat ? "#F8931E" : "rgba(255,255,255,0.12)"}`,
                    background: activeFilter === cat ? "#F8931E" : "transparent",
                    color: activeFilter === cat ? "#0e0e0c" : "#c8c4bc",
                    borderRadius: "100px", fontSize: "13px", fontWeight: 500,
                    cursor: "none", transition: "all 0.25s ease", letterSpacing: "0.03em",
                    fontFamily: "inherit",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Grid */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 100px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {projects.map((p, i) => <ProjectCard key={p.src} p={p} index={i} isMobile={isMobile} />)}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}
                >
                  {filtered.map((p, i) => <ProjectCard key={p.src} p={p} index={i} isMobile={isMobile} />)}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

      </main>
      <FooterSection />
    </>
  );
}
