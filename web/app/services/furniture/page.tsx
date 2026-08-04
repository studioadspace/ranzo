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
        <section style={{ padding: isMobile ? `100px 20px 0` : `140px ${PAD} 0` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "12px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Services / Furniture & Decor
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
        <div style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 80px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div style={{ position: "relative", height: "56vw", minHeight: "220px", overflow: "hidden", borderRadius: "10px" }}>
                <Image src="/interiors/amir-bedroom-wardrobe.jpg" alt="Custom wardrobe joinery" fill style={{ objectFit: "cover" }} sizes="100vw" />
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ position: "relative", height: "clamp(260px, 34vw, 500px)", overflow: "hidden", borderRadius: "10px" }}>
                  <Image src="/interiors/amir-bedroom-wardrobe.jpg" alt="Custom wardrobe joinery" fill style={{ objectFit: "cover" }} sizes="50vw" />
                </div>
                <div style={{ display: "grid", gap: "12px" }}>
                  <div style={{ position: "relative", height: "clamp(124px, 16.5vw, 244px)", overflow: "hidden", borderRadius: "10px" }}>
                    <Image src="/interiors/amir-bedroom-orange.jpg" alt="Bedroom with custom furniture" fill style={{ objectFit: "cover" }} sizes="50vw" />
                  </div>
                  <div style={{ position: "relative", height: "clamp(124px, 16.5vw, 244px)", overflow: "hidden", borderRadius: "10px" }}>
                    <Image src="/interiors/amir-tv-unit-01.jpg" alt="Custom bar unit" fill style={{ objectFit: "cover" }} sizes="50vw" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div ref={gridRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: isMobile ? "16px" : "20px" }}>
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
                  style={{ padding: isMobile ? "28px 0" : "40px", border: isMobile ? "none" : "1px solid rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.07)", background: isMobile ? "transparent" : "rgba(255,255,255,0.02)" }}
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
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div ref={processRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: isMobile ? "28px" : "48px" }}>
              Our Process
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "0" }}>
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ padding: isMobile ? "20px 0" : "28px 0", borderTop: "1px solid rgba(255,255,255,0.07)", paddingRight: isMobile ? "0" : "40px" }}
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
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 100px`, textAlign: "center" }}>
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
