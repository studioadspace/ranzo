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

const process = [
  { step: "01", title: "Brief & Site Study", body: "Understanding your program, context, zoning regulations, and the qualities you want the space to have before any design begins." },
  { step: "02", title: "Concept Design", body: "Schematic volumes, massing studies, and spatial sequences that answer the brief before refining any detail." },
  { step: "03", title: "Design Development", body: "Detailed design with material strategies, structural coordination, and system integration. Resolved before documentation." },
  { step: "04", title: "Construction Documents", body: "Complete drawings and specifications for contractor tendering and building permit applications." },
  { step: "05", title: "Site Supervision", body: "Regular site visits and coordination to ensure the built result matches the design intent." },
];

const inclusions = [
  "Site analysis & feasibility",
  "Schematic design",
  "3D volumetric modelling",
  "Building permit documentation",
  "Structural coordination",
  "MEP integration",
  "Material specification",
  "Construction drawings",
  "Site supervision",
  "Contractor coordination",
];

export default function ArchitecturePage() {
  const isMobile = useBreakpoint(768);
  const heroRef = useRef(null);
  const inclusionsRef = useRef(null);
  const processRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const inclusionsInView = useInView(inclusionsRef, { once: true, margin: isMobile ? "0px" : "-40px" });
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
              Services / Architecture
            </motion.p>
            <motion.h1
              style={{ fontSize: isMobile ? "clamp(44px, 11vw, 64px)" : "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "24px" }}
              initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Architecture
            </motion.h1>
            <motion.p
              style={{ fontSize: isMobile ? "15px" : "clamp(15px, 1.2vw, 19px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85, maxWidth: "620px", marginBottom: "40px" }}
              initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              From concept to built form. We shape volumes, light, and circulation. Making spatial decisions that determine how a building feels to inhabit for decades.
            </motion.p>
          </div>
        </section>

        {/* Hero image */}
        <div style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 80px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div style={{ position: "relative", height: "56vw", minHeight: "220px", overflow: "hidden", borderRadius: "10px" }}>
                <Image src="/architecture/arch-01.jpg" alt="Architecture and space planning by Ranzospace Mumbai - residential project" fill style={{ objectFit: "cover" }} sizes="100vw" />
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div style={{ position: "relative", height: "clamp(220px, 28vw, 420px)", overflow: "hidden", borderRadius: "10px" }}>
                  <Image src="/architecture/arch-02.jpg" alt="Architecture and space planning by Ranzospace Mumbai - residential project" fill style={{ objectFit: "cover" }} sizes="33vw" />
                </div>
                <div style={{ position: "relative", height: "clamp(220px, 28vw, 420px)", overflow: "hidden", borderRadius: "10px" }}>
                  <Image src="/architecture/arch-03.jpg" alt="Interior architecture detail with bespoke joinery by Ranzospace Mumbai" fill style={{ objectFit: "cover" }} sizes="33vw" />
                </div>
                <div style={{ position: "relative", height: "clamp(220px, 28vw, 420px)", overflow: "hidden", borderRadius: "10px" }}>
                  <Image src="/architecture/arch-04.jpg" alt="Residential architecture entrance design by Ranzospace Mumbai" fill style={{ objectFit: "cover" }} sizes="33vw" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inclusions */}
        <section ref={inclusionsRef} style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "16px" }}>What's included</p>
                <h2 style={{ fontSize: "clamp(28px, 8vw, 40px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "28px" }}>
                  Concept<br />to certificate.
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                  {inclusions.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={inclusionsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      style={{ padding: "14px 8px 14px 0", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "10px" }}
                    >
                      <span style={{ color: "#F8931E", fontSize: "16px", lineHeight: 1, flexShrink: 0 }}>·</span>
                      <span style={{ fontSize: "13px", color: "#c8c4bc", fontWeight: 300 }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "80px" }}>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>What's included</p>
                  <h2 style={{ fontSize: "clamp(28px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                    Concept<br />to certificate.
                  </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                  {inclusions.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={inclusionsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "12px" }}
                    >
                      <span style={{ color: "#F8931E", fontSize: "16px" }}>·</span>
                      <span style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#c8c4bc", fontWeight: 300 }}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Process */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div ref={processRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: isMobile ? "28px" : "48px" }}>
              Process
            </p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "0" }}>
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
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
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 100px`, textAlign: "center" }}>
          <p style={{ fontSize: isMobile ? "clamp(24px, 7vw, 36px)" : "clamp(26px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.025em", marginBottom: "24px" }}>
            Building something new?
          </p>
          <Link href="/contact" style={{
            display: isMobile ? "block" : "inline-block",
            padding: "16px 40px", background: "#F8931E",
            color: "#0e0e0c", fontWeight: 700, fontSize: "15px", textDecoration: "none", borderRadius: "6px",
          }}>
            Start the conversation
          </Link>
        </section>

      </main>
      <FooterSection />
    </>
  );
}
