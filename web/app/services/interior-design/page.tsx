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
  { step: "01", title: "Discovery Call", body: "We begin by listening - your lifestyle, preferences, timeline, and budget. No assumptions, no templates." },
  { step: "02", title: "Site Analysis", body: "Detailed measurement and documentation of your space. We study natural light, flow, structural constraints, and existing conditions." },
  { step: "03", title: "Concept Development", body: "AI-powered 3D simulations so you see your space before a single tile is laid. Revise until it's exactly right." },
  { step: "04", title: "Material Selection", body: "Curated material presentations - finishes, fabrics, hardware, and lighting selected as a cohesive whole." },
  { step: "05", title: "Execution", body: "Our team manages civil, carpentry, electrical, plumbing, and finishing - all 140 quality checks completed before handover." },
  { step: "06", title: "Handover", body: "A complete walkthrough. Every detail reviewed. We don't leave until you're entirely satisfied." },
];

const inclusions = [
  "2D & 3D floor plans",
  "AI-powered 360° simulations",
  "Material & finish specification",
  "Custom furniture design",
  "Lighting design",
  "Civil & structural works",
  "Carpentry & joinery",
  "Electrical & plumbing",
  "False ceiling & flooring",
  "Paint specification",
  "Décor sourcing",
  "140-point quality check",
];

export default function InteriorDesignPage() {
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const processInView = useInView(processRef, { once: true, margin: "-40px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: `140px ${PAD} 0` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Services / Interior Design
            </motion.p>
            <motion.h1
              style={{ fontSize: "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "28px" }}
              initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Interior Design
            </motion.h1>
            <motion.p
              style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.85, maxWidth: "620px", marginBottom: "52px" }}
              initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              Full-home and commercial interiors - designed around how you actually live. Every room considered as part of a unified whole, from the first conversation to the final handover.
            </motion.p>
          </div>
        </section>

        {/* Hero image */}
        <div style={{ padding: `0 ${PAD} 80px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", position: "relative", height: "clamp(300px, 42vw, 600px)", overflow: "hidden", borderRadius: "10px" }}>
            <Image src="/projects-photos/rishi-staging-01.jpg" alt="Interior design by Ranzospace" fill style={{ objectFit: "cover" }} sizes="100vw" />
          </div>
        </div>

        {/* Inclusions */}
        <section style={{ padding: `0 ${PAD} 88px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "80px" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>What's included</p>
                <h2 style={{ fontSize: "clamp(28px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  Everything.<br />End to end.
                </h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                {inclusions.map((item, i) => (
                  <div key={i} style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#F8931E", fontSize: "16px", lineHeight: 1 }}>·</span>
                    <span style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "rgba(240,236,228,0.62)", fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section style={{ padding: `0 ${PAD} 88px` }}>
          <div ref={processRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "48px" }}>
              Our Process
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0" }}>
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.07)", paddingRight: "40px" }}
                >
                  <p style={{ fontSize: "11px", color: "#F8931E", letterSpacing: "0.18em", fontWeight: 600, marginBottom: "14px" }}>{p.step}</p>
                  <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", fontWeight: 600, color: "#fefefe", marginBottom: "10px", letterSpacing: "-0.01em" }}>{p.title}</p>
                  <p style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.75 }}>{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section style={{ padding: `0 ${PAD} 80px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {["/projects-photos/rishi-staging-02.jpg", "/projects-photos/rishi-staging-03.jpg", "/projects-photos/pramod-02.jpg", "/projects-photos/rishi-staging-04.jpg"].map((src, i) => (
              <div key={i} style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: "8px" }}>
                <Image src={src} alt={`Interior design project ${i + 1}`} fill style={{ objectFit: "cover" }} sizes="50vw" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: `0 ${PAD} 100px`, textAlign: "center" }}>
          <p style={{ fontSize: "clamp(26px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.025em", marginBottom: "24px" }}>
            Ready to redesign your space?
          </p>
          <Link href="/contact" style={{
            display: "inline-block", padding: "16px 40px", background: "#F8931E",
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
