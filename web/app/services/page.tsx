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

const services = [
  {
    num: "01",
    title: "Interior Design",
    slug: "interior-design",
    tagline: "Full-home & commercial interiors",
    body: "Every space thoughtfully planned in proportion, finish, and detail. Kitchens, bedrooms, living areas, workspaces, and storage - designed as a unified whole.",
    img: "/projects-photos/IMG-20250426-WA0024.jpg",
    tags: ["Residential", "Commercial", "Full-Home"],
  },
  {
    num: "02",
    title: "Architecture",
    slug: "architecture",
    tagline: "Architecture & space planning",
    body: "From initial concept to construction documentation. We shape volumes, light, and circulation before a single material is chosen.",
    img: "/projects-photos/IMG-20250103-WA0006.jpg",
    tags: ["New Build", "Renovation", "Space Planning"],
  },
  {
    num: "03",
    title: "Furniture & Decor",
    slug: "furniture",
    tagline: "Modular furniture & curated décor",
    body: "Curated furniture selection and smart décor solutions - sofas, ottomans, beds, and accent pieces sourced to suit your lifestyle and aesthetic.",
    img: "/projects-photos/IMG-20250426-WA0023.jpg",
    tags: ["Modular", "Custom", "Sourcing"],
  },
];

function ServiceRow({ s, index }: { s: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr",
        gap: "0",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        direction: isEven ? "ltr" : "rtl",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "clamp(260px, 32vw, 480px)", overflow: "hidden" }}>
        <motion.div
          initial={{ scale: 1.08 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image src={s.img} alt={s.title} fill style={{ objectFit: "cover" }} sizes="50vw" />
        </motion.div>
      </div>

      {/* Content */}
      <div style={{
        direction: "ltr",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px", background: "#0e0e0c",
      }}>
        <p style={{ fontSize: "11px", color: "#F8931E", letterSpacing: "0.18em", fontWeight: 600, marginBottom: "16px" }}>{s.num}</p>
        <h2 style={{ fontSize: "clamp(32px, 3vw, 52px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.025em", marginBottom: "8px", lineHeight: 1.1 }}>
          {s.title}
        </h2>
        <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "rgba(240,236,228,0.7)", fontWeight: 400, fontStyle: "italic", marginBottom: "20px", letterSpacing: "0.01em" }}>
          {s.tagline}
        </p>
        <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.85, marginBottom: "28px" }}>
          {s.body}
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "36px" }}>
          {s.tags.map(tag => (
            <span key={tag} style={{
              padding: "4px 14px", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "100px", fontSize: "11px", color: "rgba(240,236,228,0.75)",
              letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
            }}>{tag}</span>
          ))}
        </div>
        <Link
          href={`/services/${s.slug}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "14px", fontWeight: 600, color: "#F8931E", textDecoration: "none",
          }}
        >
          Learn more →
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: `140px ${PAD} 80px` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              What We Offer
            </motion.p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px" }}>
              <motion.h1
                style={{ fontSize: "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Services
              </motion.h1>
              <motion.p
                style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, maxWidth: "400px", lineHeight: 1.75, paddingBottom: "8px" }}
                initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 }}
              >
                Three disciplines. One studio. Every project managed end-to-end with 140 quality checks and complete accountability.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Service rows */}
        <section>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {services.map((s, i) => <ServiceRow key={s.slug} s={s} index={i} />)}
          </div>
        </section>

        {/* On-site execution callout */}
        <section style={{ padding: `80px ${PAD}` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "60px" }}>
              <p style={{ fontSize: "11px", color: "#F8931E", letterSpacing: "0.18em", fontWeight: 600, marginBottom: "20px", textTransform: "uppercase" }}>Across All Services</p>
              <h3 style={{ fontSize: "clamp(26px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", marginBottom: "20px", lineHeight: 1.2 }}>
                Full on-site execution included.
              </h3>
              <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.85, maxWidth: "600px", marginBottom: "36px" }}>
                Civil work, tiling, carpentry, electrical, plumbing, false ceiling, flooring, and painting - all managed by our team. We hand over one project, not a coordination problem.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "40px" }}>
                {[["140+", "Quality checks"], ["100+", "Completed projects"], ["7", "Years experience"], ["9+", "Years avg team tenure"]].map(([num, label]) => (
                  <div key={label}>
                    <p style={{ fontSize: "clamp(32px, 3vw, 52px)", fontWeight: 800, color: "#F8931E", letterSpacing: "-0.03em", lineHeight: 1 }}>{num}</p>
                    <p style={{ fontSize: "13px", color: "rgba(240,236,228,0.75)", fontWeight: 300, marginTop: "8px" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: `0 ${PAD} 100px`, textAlign: "center" }}>
          <p style={{ fontSize: "clamp(26px, 2.8vw, 48px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.025em", marginBottom: "24px" }}>
            Have a project in mind?
          </p>
          <Link href="/contact" style={{
            display: "inline-block", padding: "16px 40px", background: "#F8931E",
            color: "#0e0e0c", fontWeight: 700, fontSize: "15px", textDecoration: "none",
            borderRadius: "6px",
          }}>
            Start a conversation
          </Link>
        </section>

      </main>
      <FooterSection />
    </>
  );
}
