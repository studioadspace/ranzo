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

const values = [
  { num: "01", title: "Honesty over agreement", body: "We tell clients what their space needs — not what they want to hear. Honest conversations early save costly revisions later." },
  { num: "02", title: "Substance before style", body: "Every material, every detail earns its place. We start with function and let beauty follow — never the reverse." },
  { num: "03", title: "Accountability by default", body: "We own our timelines, our costs, and our outcomes. 140 quality checks per project. No excuses, no surprises." },
  { num: "04", title: "Design that compounds", body: "The spaces we create should feel better with every passing year. We make decisions for the long run, not for the photograph." },
];

const timeline = [
  { year: "2018", event: "Ranzospace founded in Mumbai by Ar. Manas Makwana" },
  { year: "2020", event: "First commercial project — a 4,500 sq ft workspace in Lower Parel" },
  { year: "2022", event: "Launched India's first AI-powered interior simulation offering" },
  { year: "2024", event: "100+ completed projects across Mumbai" },
  { year: "2025", event: "Expanded to architecture and structural services" },
];

function ValueCard({ v, index }: { v: typeof values[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "32px 0",
      }}
    >
      <p style={{ fontSize: "11px", color: "#F8931E", letterSpacing: "0.18em", fontWeight: 600, marginBottom: "14px" }}>{v.num}</p>
      <p style={{ fontSize: "clamp(18px, 1.5vw, 24px)", fontWeight: 700, color: "#f0ece4", marginBottom: "12px", letterSpacing: "-0.02em" }}>{v.title}</p>
      <p style={{ fontSize: "clamp(14px, 1.05vw, 16px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.75 }}>{v.body}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const timelineRef = useRef(null);
  const founderRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true, margin: "-40px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-40px" });
  const founderInView = useInView(founderRef, { once: true, margin: "-40px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: `140px ${PAD} 80px`, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}>
              <div>
                <motion.p
                  ref={heroRef}
                  style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}
                  initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  About Ranzospace
                </motion.p>
                <motion.h1
                  style={{ fontSize: "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#f0ece4", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                  initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  A studio built<br />on conviction.
                </motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25 }}
                style={{ paddingBottom: "8px" }}
              >
                <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.85 }}>
                  Ranzospace is a Mumbai-based architecture and interior design studio. We work with clients who are done with average — people who want spaces that genuinely reflect how they live, not just how spaces look on Instagram.
                </p>
                <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.85, marginTop: "20px" }}>
                  Founded in 2018. 100+ projects. One north star: design that lasts.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Full-width image */}
        <div style={{ position: "relative", height: "clamp(260px, 36vw, 520px)", overflow: "hidden" }}>
          <Image src="/img14.jpeg" alt="Ranzospace designed living room" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,12,0.35)" }} />
        </div>

        {/* Values */}
        <section style={{ padding: `88px ${PAD}` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "80px", alignItems: "start" }}>
              <div>
                <motion.h2
                  ref={storyRef}
                  style={{ fontSize: "clamp(34px, 3.2vw, 56px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f0ece4", lineHeight: 1.12 }}
                  initial={{ opacity: 0, y: 20 }} animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  What<br />we<br />believe
                </motion.h2>
              </div>
              <div>
                {values.map((v, i) => <ValueCard key={i} v={v} index={i} />)}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: `0 ${PAD} 88px` }}>
          <div ref={timelineRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "48px" }}
              initial={{ opacity: 0 }} animate={timelineInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Our Journey
            </motion.p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  style={{ display: "flex", gap: "60px", alignItems: "baseline", padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  initial={{ opacity: 0, x: -20 }} animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span style={{ fontSize: "clamp(13px, 1vw, 15px)", fontWeight: 700, color: "#F8931E", minWidth: "48px", letterSpacing: "0.03em" }}>{t.year}</span>
                  <span style={{ fontSize: "clamp(15px, 1.2vw, 19px)", fontWeight: 300, color: "rgba(240,236,228,0.65)", lineHeight: 1.6 }}>{t.event}</span>
                </motion.div>
              ))}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
            </div>
          </div>
        </section>

        {/* Founder */}
        <section style={{ padding: `0 ${PAD} 88px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.div
              ref={founderRef}
              style={{ background: "#F8931E", borderRadius: "14px", overflow: "hidden", padding: "52px 60px" }}
              initial={{ opacity: 0, y: 32, clipPath: "inset(15% 0% 0% 0%)" }}
              animate={founderInView ? { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ display: "flex", gap: "56px", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "10px", color: "rgba(0,0,0,0.35)", letterSpacing: "0.08em" }}>PHOTO</span>
                  </div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "rgba(0,0,0,0.65)", marginTop: "14px", letterSpacing: "0.02em" }}>Ar. Manas Makwana</p>
                  <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.45)", marginTop: "2px" }}>Founder, Ranzospace</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "clamp(14px, 1.15vw, 17px)", fontWeight: 300, color: "rgba(0,0,0,0.82)", lineHeight: 1.85, marginBottom: "18px" }}>
                    "I started Ranzospace because I saw a gap between what people needed and what the industry was offering. Too much style, not enough substance. Too many promises, not enough accountability."
                  </p>
                  <p style={{ fontSize: "clamp(15px, 1.2vw, 18px)", fontWeight: 700, color: "rgba(0,0,0,0.92)" }}>
                    We built the studio we wished had always existed.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: `0 ${PAD} 100px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "clamp(28px, 3vw, 52px)", fontWeight: 700, color: "#f0ece4", letterSpacing: "-0.025em", marginBottom: "24px" }}>
              Ready to start something?
            </p>
            <Link href="/contact" style={{
              display: "inline-block", padding: "16px 40px", background: "#F8931E",
              color: "#0e0e0c", fontWeight: 700, fontSize: "15px", textDecoration: "none",
              borderRadius: "6px", letterSpacing: "0.01em",
            }}>
              Get in touch
            </Link>
          </div>
        </section>

      </main>
      <FooterSection />
    </>
  );
}
