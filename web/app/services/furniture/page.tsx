"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const categories = [
  { title: "Living Room", items: ["Sofas & sectionals", "Coffee tables", "TV units", "Accent chairs", "Side tables", "Ottomans & poufs"] },
  { title: "Bedroom", items: ["Beds & headboards", "Wardrobes", "Bedside tables", "Dressing units", "Study tables"] },
  { title: "Kitchen", items: ["Modular kitchen systems", "Storage solutions", "Island units", "Breakfast counters"] },
  { title: "Dining", items: ["Dining tables", "Chairs & benches", "Display units", "Bar counters"] },
];

const process = [
  { step: "01", title: "Discovery", body: "Understanding room usage, existing decor, and lifestyle before any sourcing begins." },
  { step: "02", title: "Curated Shortlist", body: "A tailored selection matched to proportion, material, and budget. Not a generic catalogue." },
  { step: "03", title: "Sample & Finish Approval", body: "Physical swatches and finish samples reviewed and confirmed before any order is placed." },
  { step: "04", title: "Sourcing & Fabrication", body: "Coordinated procurement and custom fabrication with vetted workshops and vendors." },
  { step: "05", title: "Delivery & Installation", body: "White-glove delivery, assembly, and final styling handled entirely by our team." },
];

const HERO_MATERIALS = [
  { src: "/gallery/priya-board-swatches.jpg", alt: "Material board with walnut, fluted oak, terrazzo and marble samples" },
  { src: "/gallery/priya-board-wood.jpg", alt: "Fluted timber and stone samples laid out on a workshop table" },
  { src: "/gallery/priya-materials-still.jpg", alt: "Stacked wood, stone and marble panel samples" },
  { src: "/gallery/priya-oak-cabinetry.jpg", alt: "Oak veneer wardrobe and kitchen cabinetry" },
];

export default function FurniturePage() {
  const isMobile = useBreakpoint(768);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const processRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const gridInView = useInView(gridRef, { once: true, margin: isMobile ? "0px" : "-40px" });
  const processInView = useInView(processRef, { once: true, margin: isMobile ? "0px" : "-40px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: isMobile ? `100px 20px var(--hero-gap)` : `140px ${PAD} var(--hero-gap)` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Link href="/services" style={{ color: "#F8931E", textDecoration: "none" }}>Services</Link>
              <span style={{ color: "#c8c4bc" }}> / Furniture &amp; Decor</span>
            </motion.p>
            <motion.h1
              style={{ fontSize: isMobile ? "clamp(44px, 11vw, 64px)" : "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "24px" }}
              initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Furniture<br />&amp; Decor
            </motion.h1>
            <motion.p
              style={{ fontSize: isMobile ? "15px" : "clamp(15px, 1.2vw, 19px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85, maxWidth: "620px", marginBottom: "40px" }}
              initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              Curated furniture selection and modular solutions that are sourced, coordinated, and installed by our team. Not a catalogue. A considered edit for your specific space.
            </motion.p>
          </div>
        </section>

        {/* Hero images */}
        <div style={{ padding: isMobile ? "0 20px var(--section-y)" : `0 ${PAD} var(--section-y)` }}>
          <div style={{
            maxWidth: MAX_W, margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.15fr) minmax(0, 1fr)",
            gap: isMobile ? "12px" : "clamp(12px, 1.2vw, 16px)",
          }}>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: "10px", aspectRatio: isMobile ? "4 / 3" : undefined, minHeight: 0 }}>
              <Image src="/gallery/maddy-bedroom-mirror.jpg" alt="Bedroom by Ranzospace Mumbai with a mirrored wardrobe wall" fill style={{ objectFit: "cover" }} sizes={isMobile ? "100vw" : "55vw"} priority />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "12px" : "clamp(12px, 1.2vw, 16px)" }}>
              {HERO_MATERIALS.map((m) => (
                <div key={m.src} style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "10px", background: "#141410" }}>
                  <Image src={m.src} alt={m.alt} fill style={{ objectFit: "cover" }} sizes={isMobile ? "50vw" : "25vw"} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <section style={{ padding: isMobile ? "0 20px var(--section-y)" : `0 ${PAD} var(--section-y)` }}>
          <div ref={gridRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#c8c4bc", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-serif), Georgia, serif", marginBottom: isMobile ? "16px" : "20px" }}>
              What We Source
            </p>
            <h2 style={{ fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(28px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: isMobile ? "28px" : "48px" }}>
              Curated for<br />every room.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2px" }}>
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ padding: isMobile ? "28px 0" : "36px 32px 36px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p style={{ fontSize: isMobile ? "17px" : "clamp(18px, 1.5vw, 24px)", fontWeight: 700, color: "#fefefe", marginBottom: "16px", letterSpacing: "-0.01em" }}>{cat.title}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {cat.items.map(item => (
                      <p key={item} style={{ fontSize: isMobile ? "14px" : "clamp(13px, 1vw, 15px)", color: "#c8c4bc", fontWeight: 300, display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ color: "#F8931E", fontSize: "6px" }}>●</span>{item}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section style={{ padding: isMobile ? "0 20px var(--section-y)" : `0 ${PAD} var(--section-y)` }}>
          <div ref={processRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#c8c4bc", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-serif), Georgia, serif", marginBottom: isMobile ? "28px" : "48px" }}>
              Our Process
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "0" }}>
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ padding: isMobile ? "20px 0" : "28px 40px 28px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p style={{ fontSize: "11px", color: "#F8931E", letterSpacing: "0.18em", fontWeight: 600, marginBottom: "10px" }}>{p.step}</p>
                  <p style={{ fontSize: isMobile ? "16px" : "clamp(15px, 1.2vw, 19px)", fontWeight: 600, color: "#fefefe", marginBottom: "8px", letterSpacing: "-0.01em" }}>{p.title}</p>
                  <p style={{ fontSize: isMobile ? "14px" : "clamp(13px, 1vw, 15px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75 }}>{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: isMobile ? "0 20px var(--section-y)" : `0 ${PAD} var(--section-y)`, textAlign: "center" }}>
          <p style={{ fontSize: isMobile ? "clamp(24px, 7vw, 36px)" : "clamp(26px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.025em", marginBottom: "24px" }}>
            Furnish your space right.
          </p>
          <Link href="/contact" style={{
            display: isMobile ? "block" : "inline-block",
            padding: "16px 40px", background: "#F8931E",
            color: "#0e0e0c", fontWeight: 700, fontSize: "15px", textDecoration: "none", borderRadius: "6px",
          }}>
            Get in touch
          </Link>
        </section>

      </main>
      <FooterSection />
    </>
  );
}
