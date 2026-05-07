"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLightbox } from "@/components/LightboxProvider";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const values = [
  { num: "01", title: "Honesty over agreement", body: "We tell clients what their space needs, not what they want to hear. Honest conversations early save costly revisions later." },
  { num: "02", title: "Substance before style", body: "Every material, every detail earns its place. We start with function and let beauty follow, never the reverse." },
  { num: "03", title: "Accountability by default", body: "We own our timelines, our costs, and our outcomes. 140 quality checks per project. No excuses, no surprises." },
  { num: "04", title: "Design that compounds", body: "The spaces we create should feel better with every passing year. We make decisions for the long run, not for the photograph." },
];

const timeline = [
  { year: "2018", event: "Started with architecture and interiors" },
  { year: "2020", event: "Introduced AI design and simulation" },
  { year: "2022", event: "Expanded into large scale projects" },
  { year: "2024", event: "Moved into the premium market" },
];

function ValueCard({ v, index, isMobile }: { v: typeof values[0]; index: number; isMobile: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: isMobile ? "0px" : "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: isMobile ? "24px 0" : "32px 0",
      }}
    >
      <p style={{ fontSize: "11px", color: "#F8931E", letterSpacing: "0.18em", fontWeight: 600, marginBottom: "14px" }}>{v.num}</p>
      <p style={{ fontSize: isMobile ? "clamp(16px, 4.5vw, 20px)" : "clamp(18px, 1.5vw, 24px)", fontWeight: 700, color: "#fefefe", marginBottom: "12px", letterSpacing: "-0.02em" }}>{v.title}</p>
      <p style={{ fontSize: isMobile ? "14px" : "clamp(14px, 1.05vw, 16px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75 }}>{v.body}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const isMobile = useBreakpoint(768);
  const { openLightbox } = useLightbox();
  const storyRef = useRef(null);
  const timelineRef = useRef(null);
  const founderRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: isMobile ? "0px" : "-40px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: isMobile ? "0px" : "-40px" });
  const founderInView = useInView(founderRef, { once: true, margin: isMobile ? "0px" : "-40px" });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero — above the fold, animate on mount (no useInView needed) */}
        <section style={{
          padding: isMobile ? `100px 20px 48px` : `140px ${PAD} 80px`,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div>
                <motion.p
                  style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  About Ranzospace
                </motion.p>
                <motion.h1
                  style={{ fontSize: "clamp(44px, 11vw, 64px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "24px" }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  A studio built<br />on conviction.
                </motion.h1>
                <motion.p
                  style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.2 }}
                >
                  Ranzospace is a Mumbai-based architecture and interior design studio. We work with clients who are done with average. People who want spaces that genuinely reflect how they live, not just how spaces look on Instagram.
                </motion.p>
                <motion.p
                  style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85, marginTop: "16px" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.28 }}
                >
                  Founded in 2018. 100+ projects. One north star: design that lasts.
                </motion.p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}>
                <div>
                  <motion.p
                    style={{ fontSize: "11px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    About Ranzospace
                  </motion.p>
                  <motion.h1
                    style={{ fontSize: "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    A studio built<br />on conviction.
                  </motion.h1>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  style={{ paddingBottom: "8px" }}
                >
                  <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85 }}>
                    Ranzospace is a Mumbai-based architecture and interior design studio. We work with clients who are done with average. People who want spaces that genuinely reflect how they live, not just how spaces look on Instagram.
                  </p>
                  <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85, marginTop: "20px" }}>
                    Founded in 2018. 100+ projects. One north star: design that lasts.
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        {/* Full-width image — clickable lightbox */}
        <div
          onClick={() => openLightbox("/projects-photos/pramod-02.jpg", "Ranzospace designed living room")}
          data-cursor="hover"
          style={{ position: "relative", height: isMobile ? "56vw" : "clamp(260px, 36vw, 520px)", minHeight: isMobile ? "220px" : undefined, overflow: "hidden", cursor: "pointer" }}
        >
          <Image src="/projects-photos/pramod-02.jpg" alt="Ranzospace designed living room" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,12,0.35)" }} />
        </div>

        {/* Values */}
        <section style={{ padding: isMobile ? `48px 20px` : `88px ${PAD}` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div>
                <motion.h2
                  ref={storyRef}
                  style={{ fontSize: "clamp(28px, 8vw, 40px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", lineHeight: 1.12, marginBottom: "32px" }}
                  initial={{ opacity: 0, y: 20 }} animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  What we believe
                </motion.h2>
                {values.map((v, i) => <ValueCard key={i} v={v} index={i} isMobile={isMobile} />)}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "80px", alignItems: "start" }}>
                <div>
                  <motion.h2
                    ref={storyRef}
                    style={{ fontSize: "clamp(34px, 3.2vw, 56px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", lineHeight: 1.12 }}
                    initial={{ opacity: 0, y: 20 }} animate={storyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    What<br />we<br />believe
                  </motion.h2>
                </div>
                <div>
                  {values.map((v, i) => <ValueCard key={i} v={v} index={i} isMobile={isMobile} />)}
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div ref={timelineRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "11px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "32px" }}
              initial={{ opacity: 0 }} animate={timelineInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Our Journey
            </motion.p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  style={{
                    display: "flex",
                    gap: isMobile ? "20px" : "60px",
                    alignItems: "baseline",
                    padding: isMobile ? "18px 0" : "24px 0",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                  }}
                  initial={{ opacity: 0, x: -20 }} animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span style={{ fontSize: isMobile ? "12px" : "clamp(13px, 1vw, 15px)", fontWeight: 700, color: "#F8931E", minWidth: isMobile ? "38px" : "48px", letterSpacing: "0.03em", flexShrink: 0 }}>{t.year}</span>
                  <span style={{ fontSize: isMobile ? "14px" : "clamp(15px, 1.2vw, 19px)", fontWeight: 300, color: "#c8c4bc", lineHeight: 1.6 }}>{t.event}</span>
                </motion.div>
              ))}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
            </div>
          </div>
        </section>

        {/* Founder */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.div
              ref={founderRef}
              style={{ background: "#F8931E", borderRadius: "14px", overflow: "hidden", padding: isMobile ? "32px 24px" : "52px 60px" }}
              initial={{ opacity: 0, y: 32 }}
              animate={founderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              {isMobile ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.35)", letterSpacing: "0.08em" }}>PHOTO</span>
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "rgba(0,0,0,0.65)", letterSpacing: "0.02em" }}>Ar. Manas Makwana</p>
                      <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.45)", marginTop: "2px" }}>Founder, Ranzospace</p>
                    </div>
                  </div>
                  <p style={{ fontSize: "15px", fontWeight: 300, color: "rgba(0,0,0,0.82)", lineHeight: 1.85, marginBottom: "16px" }}>
                    "I started Ranzospace because I saw a gap between what people needed and what the industry was offering. Too much style, not enough substance. Too many promises, not enough accountability."
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "rgba(0,0,0,0.92)" }}>
                    We built the studio we wished had always existed.
                  </p>
                </div>
              ) : (
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
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 100px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: isMobile ? "clamp(26px, 7vw, 36px)" : "clamp(28px, 3vw, 52px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.025em", marginBottom: "24px" }}>
              Ready to start something?
            </p>
            <Link href="/contact" style={{
              display: isMobile ? "block" : "inline-block",
              padding: "16px 40px",
              background: "#F8931E",
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
