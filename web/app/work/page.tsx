"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLightbox } from "@/components/LightboxProvider";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const categories = ["Residential", "Architectural", "Modular Furniture"];

// One real concept-to-built pairing (not a generic strip) - same house, sketch vs. finished render
const conceptPair = {
  sketch: { src: "/architecture/in-process-01.jpg", alt: "Hand-drawn architectural elevation sketch by Ranzospace - concrete mass and wood screen concept" },
  built: { src: "/architecture/arch-01.jpg", alt: "Finished concrete and wood-screen residence facade by Ranzospace" },
};

const projects = [
  // Residential - 5 genuinely distinct spaces, no repeats
  {
    src: "/interiors/amir-living-tv-01.jpg",
    alt: "Living room interior design with floating wood console and coffee table by Ranzospace, Mumbai",
    label: "Living Room", location: "Mumbai", category: "Residential", area: "620 sq ft",
    description: "A warm living room built around a floating wood console and a sculptural coffee table, finished in a soft neutral palette.",
  },
  {
    src: "/interiors/amir-living-cove.jpg",
    alt: "Living room TV nook with arched cove lighting by Ranzospace, Mumbai",
    label: "Living Room · TV Nook", location: "Mumbai", category: "Residential", area: "580 sq ft",
    description: "An arched, cove-lit alcove frames the television as a considered architectural feature rather than an afterthought.",
  },
  {
    src: "/interiors/amir-living-sofa.jpg",
    alt: "Lounge corner with bouclé sofa and oak coffee table by Ranzospace, Mumbai",
    label: "Lounge Corner", location: "Mumbai", category: "Residential", area: "340 sq ft",
    description: "A quiet reading corner built around a bouclé sofa and a sculptural oak coffee table, lit for late afternoons.",
  },
  {
    src: "/interiors/amir-bedroom-orange.jpg",
    alt: "Master bedroom with upholstered bed frame by Ranzospace, Mumbai",
    label: "Master Bedroom", location: "Mumbai", category: "Residential", area: "400 sq ft",
    description: "An upholstered bed frame anchors this restrained bedroom, paired with warm panelling and layered textiles.",
  },
  {
    src: "/interiors/amir-dining-nook.jpg",
    alt: "Dining nook with custom shelving and framed art by Ranzospace, Mumbai",
    label: "Dining Nook", location: "Mumbai", category: "Residential", area: "120 sq ft",
    description: "A compact two-seat dining corner with open shelving and framed art, softened by greenery.",
  },

  // Architectural - one case study, distinct angles (kept separate from the concept/built pairing above)
  {
    src: "/architecture/arch-02.jpg",
    alt: "Architectural elevation with folding wooden shutters by Ranzospace",
    label: "Folding Wood Screen Facade", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "Folding timber shutters mediate light and privacy across the facade, opening the home to its garden context.",
  },
  {
    src: "/architecture/arch-03.jpg",
    alt: "Architectural detail collage with concrete texture and carport by Ranzospace",
    label: "Material & Detail Study", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "Board-formed concrete, steel canopies, and native planting resolved into a single considered material language.",
  },
  {
    src: "/architecture/arch-04.jpg",
    alt: "Architecture site detail with concrete wall and garden planting by Ranzospace",
    label: "Garden Wall Detail", location: "Mumbai", category: "Architectural", area: "Custom",
    description: "Every boundary condition treated as an opportunity for texture and greenery rather than an afterthought.",
  },
  {
    src: "/architecture/arch-05.jpg",
    alt: "Full architectural elevation of contemporary concrete residence by Ranzospace",
    label: "Full Elevation", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "From concept to construction documentation, we shape volumes, light, and circulation before a single material is chosen.",
  },

  // Modular Furniture - 3 distinct furniture pieces, no overlap with Residential
  {
    src: "/interiors/amir-tv-unit-01.jpg",
    alt: "Custom floating TV console with cove lighting - Ranzospace, Mumbai",
    label: "Floating TV Console", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "A cove-lit floating console finished in walnut veneer, built to disappear into the wall it inhabits.",
  },
  {
    src: "/interiors/amir-bedroom-wardrobe.jpg",
    alt: "Custom two-tone wardrobe with soft-close joinery - Ranzospace, Mumbai",
    label: "Custom Wardrobe", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "A full-height two-tone wardrobe with a lacquered upper cabinet and a warm wood-finished base.",
  },
  {
    src: "/interiors/amir-study-nook.jpg",
    alt: "Built-in study desk and shelving unit - Ranzospace, Mumbai",
    label: "Study Desk & Shelving", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "A built-in desk and floating shelves sized precisely to a bedroom corner, no space wasted.",
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

      {/* Category chip - desktop only */}
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
  const [activeFilter, setActiveFilter] = useState("Residential");
  const { openLightbox } = useLightbox();

  const filtered = projects.filter(p => p.category === activeFilter);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: isMobile ? `100px 20px 40px` : `140px ${PAD} 60px` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "12px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}
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

        {/* From sketch to structure - one real concept/built pairing, drag to compare */}
        <section style={{ padding: isMobile ? `0 20px 56px` : `0 ${PAD} 96px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <div style={{
              display: "flex", flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
              gap: isMobile ? "16px" : "24px", marginBottom: isMobile ? "24px" : "32px",
            }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                  The Process
                </p>
                <h2 style={{ fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(32px, 3.2vw, 48px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  From Sketch to Structure
                </h2>
              </div>
              <p style={{ fontSize: isMobile ? "15px" : "clamp(15px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75, maxWidth: "420px" }}>
                Every project starts as a line on paper. This concept elevation for our Mumbai residence became the concrete-and-timber facade our client walks through today. Drag to see the journey.
              </p>
            </div>

            <BeforeAfterSlider
              beforeSrc={conceptPair.sketch.src}
              beforeAlt={conceptPair.sketch.alt}
              afterSrc={conceptPair.built.src}
              afterAlt={conceptPair.built.alt}
              beforeLabel="Concept"
              afterLabel="Realized"
              aspectRatio={isMobile ? "4 / 5" : "16 / 8.5"}
              mirrorAfter
            />
          </div>
        </section>

        {/* Filters */}
        <section style={{ padding: isMobile ? `0 20px 28px` : `0 ${PAD} 40px` }}>
          <div style={{
            maxWidth: MAX_W, margin: "0 auto", display: "flex", gap: "12px",
            flexWrap: isMobile ? "nowrap" : "wrap",
            overflowX: isMobile ? "auto" : "visible",
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                data-cursor="hover"
                style={{
                  padding: "8px 20px", border: `1px solid ${activeFilter === cat ? "#F8931E" : "rgba(255,255,255,0.12)"}`,
                  background: activeFilter === cat ? "#F8931E" : "transparent",
                  color: activeFilter === cat ? "#0e0e0c" : "#c8c4bc",
                  borderRadius: "100px", fontSize: "13px", fontWeight: 500,
                  cursor: "none", transition: "all 0.25s ease", letterSpacing: "0.03em",
                  fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 100px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: isMobile ? "6px" : "12px" }}
              >
                {filtered.map((p, i) => <ProjectCard key={p.src} p={p} index={i} isMobile={isMobile} />)}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

      </main>
      <FooterSection />
    </>
  );
}
