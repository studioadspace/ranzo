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

const approachItems = ["Proportion-first selection", "Budget-realistic sourcing", "Coordinated installation", "Post-handover support"];

export default function FurniturePage() {
  const isMobile = useBreakpoint(768);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const approachRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const gridInView = useInView(gridRef, { once: true, margin: isMobile ? "0px" : "-40px" });
  const approachInView = useInView(approachRef, { once: true, margin: isMobile ? "0px" : "-40px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: isMobile ? `100px 20px 0` : `140px ${PAD} 0` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}
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
                <Image src="/projects-photos/rishi-photo-04.jpg" alt="Custom wardrobe joinery" fill style={{ objectFit: "cover" }} sizes="100vw" />
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ position: "relative", height: "clamp(260px, 34vw, 500px)", overflow: "hidden", borderRadius: "10px" }}>
                  <Image src="/projects-photos/rishi-photo-04.jpg" alt="Custom wardrobe joinery" fill style={{ objectFit: "cover" }} sizes="50vw" />
                </div>
                <div style={{ display: "grid", gap: "12px" }}>
                  <div style={{ position: "relative", height: "clamp(124px, 16.5vw, 244px)", overflow: "hidden", borderRadius: "10px" }}>
                    <Image src="/projects-photos/rishi-staging-04.jpg" alt="Bedroom with custom furniture" fill style={{ objectFit: "cover" }} sizes="50vw" />
                  </div>
                  <div style={{ position: "relative", height: "clamp(124px, 16.5vw, 244px)", overflow: "hidden", borderRadius: "10px" }}>
                    <Image src="/projects-photos/rishi-photo-02.jpg" alt="Custom bar unit" fill style={{ objectFit: "cover" }} sizes="50vw" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div ref={gridRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: isMobile ? "28px" : "48px" }}>
              What We Source
            </p>
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

        {/* Approach */}
        <section ref={approachRef} style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>Our Approach</p>
                <h2 style={{ fontSize: "clamp(26px, 7vw, 36px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "20px" }}>
                  No catalogue browsing.<br />A curated edit.
                </h2>
                <p style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85, marginBottom: "28px" }}>
                  We don't hand you a catalogue and wish you luck. Our team builds a curated selection based on your space, your lifestyle, and your budget. Every piece is chosen because it works.
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {approachItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={approachInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <span style={{ fontSize: "12px", color: "#F8931E", fontWeight: 700, minWidth: "24px" }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 400 }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "20px" }}>Our Approach</p>
                  <h2 style={{ fontSize: "clamp(28px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "24px" }}>
                    No catalogue browsing.<br />A curated edit.
                  </h2>
                  <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85 }}>
                    We don't hand you a catalogue and wish you luck. Our team builds a curated selection based on your space, your lifestyle, and your budget. Every piece is chosen because it works. Proportionally, functionally, and aesthetically.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {approachItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={approachInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <span style={{ fontSize: "12px", color: "#F8931E", fontWeight: 700, minWidth: "28px" }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 400 }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
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
