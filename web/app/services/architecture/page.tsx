"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";

const MAX_W = "1440px";
const PAD = "48px";

const process = [
  { step: "01", title: "Brief & Site Study", body: "Understanding your program, context, zoning regulations, and the qualities you want the space to have before any design begins." },
  { step: "02", title: "Concept Design", body: "Schematic volumes, massing studies, and spatial sequences that answer the brief before refining any detail." },
  { step: "03", title: "Design Development", body: "Detailed design with material strategies, structural coordination, and system integration - resolved before documentation." },
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
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: "-40px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        <section style={{ padding: `140px ${PAD} 0` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Services / Architecture
            </motion.p>
            <motion.h1
              style={{ fontSize: "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "28px" }}
              initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Architecture
            </motion.h1>
            <motion.p
              style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.85, maxWidth: "620px", marginBottom: "52px" }}
              initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              From concept to built form. We shape volumes, light, and circulation - making spatial decisions that determine how a building feels to inhabit for decades.
            </motion.p>
          </div>
        </section>

        <div style={{ padding: `0 ${PAD} 80px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", position: "relative", height: "clamp(300px, 42vw, 600px)", overflow: "hidden", borderRadius: "10px" }}>
            <Image src="/projects-photos/IMG-20250103-WA0006.jpg" alt="Architecture by Ranzospace" fill style={{ objectFit: "cover" }} sizes="100vw" />
          </div>
        </div>

        <section style={{ padding: `0 ${PAD} 88px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "80px" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>What's included</p>
                <h2 style={{ fontSize: "clamp(28px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  Concept<br />to certificate.
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                {inclusions.map((item, i) => (
                  <div key={i} style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#F8931E", fontSize: "16px" }}>·</span>
                    <span style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "rgba(240,236,228,0.62)", fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: `0 ${PAD} 88px` }}>
          <div ref={processRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "48px" }}>Process</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0" }}>
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  style={{ padding: "28px 40px 28px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p style={{ fontSize: "11px", color: "#F8931E", letterSpacing: "0.18em", fontWeight: 600, marginBottom: "14px" }}>{p.step}</p>
                  <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", fontWeight: 600, color: "#fefefe", marginBottom: "10px", letterSpacing: "-0.01em" }}>{p.title}</p>
                  <p style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.75 }}>{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: `0 ${PAD} 100px`, textAlign: "center" }}>
          <p style={{ fontSize: "clamp(26px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.025em", marginBottom: "24px" }}>
            Building something new?
          </p>
          <Link href="/contact" style={{
            display: "inline-block", padding: "16px 40px", background: "#F8931E",
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
