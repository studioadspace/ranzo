"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

export default function FooterSection() {
  const ref = useRef(null);
  const closingRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const closingInView = useInView(closingRef, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: closingRef, offset: ["start end", "end end"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "0%"]);

  return (
    <footer style={{ background: "#0e0e0c" }}>
      {/* Closing — real image + ghost type + tagline */}
      <div ref={closingRef} style={{ position: "relative", overflow: "hidden", height: "clamp(320px, 40vw, 580px)" }}>
        <motion.div style={{ y: imgY, position: "absolute", inset: 0 }}>
          <Image src="/img17.jpeg" alt="Ranzospace designed spaces" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,12,0.62)" }} />
        </motion.div>

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center" }}>
          <motion.p
            style={{ fontSize: "clamp(80px, 14vw, 220px)", fontWeight: 800, color: "rgba(240,236,228,0.05)", letterSpacing: "-0.04em", lineHeight: 1, userSelect: "none" }}
            initial={{ opacity: 0, y: 30 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            RANZO
          </motion.p>
          <motion.div
            style={{ marginTop: "-10px" }}
            initial={{ opacity: 0, y: 16 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{ fontSize: "14px", color: "rgba(240,236,228,0.75)", fontWeight: 300, letterSpacing: "0.06em", marginBottom: "10px" }}>
              Founded on the belief that true luxury is in refined spaces.
            </p>
            <p style={{ fontSize: "clamp(20px, 2vw, 32px)", color: "rgba(240,236,228,0.72)", fontWeight: 300, fontStyle: "italic", letterSpacing: "0.03em" }}>
              It's about understanding.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA + footer columns */}
      <div ref={ref} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: `60px ${PAD}` }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "48px", alignItems: "start" }}>

          {/* Logo + CTA */}
          <div>
            <Image src="/logo.svg" alt="Ranzospace" width={100} height={25} style={{ marginBottom: "28px" }} />
            <motion.p
              style={{ fontSize: "clamp(22px, 2vw, 32px)", fontWeight: 700, color: "#f0ece4", lineHeight: 1.25, marginBottom: "16px", letterSpacing: "-0.02em" }}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
            >
              Would like to talk<br />about a project?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <Link href="/contact" style={{ fontSize: "15px", fontWeight: 600, color: "#F8931E", textDecoration: "none" }}>
                Get in touch →
              </Link>
            </motion.div>
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>Contact</p>
            {["About", "Work", "Services", "Contact"].map(link => (
              <div key={link} style={{ marginBottom: "12px" }}>
                <Link href={`/${link.toLowerCase()}`} style={{ fontSize: "15px", color: "rgba(240,236,228,0.75)", fontWeight: 300, textDecoration: "none" }}>
                  {link}
                </Link>
              </div>
            ))}
          </motion.div>

          {/* Reach Us */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>Reach Us</p>
            <p style={{ fontSize: "15px", color: "rgba(240,236,228,0.75)", fontWeight: 300, marginBottom: "10px" }}>info@ranzospace.in</p>
            <p style={{ fontSize: "15px", color: "rgba(240,236,228,0.75)", fontWeight: 300, marginBottom: "10px" }}>+91 96991 47145</p>
            <p style={{ fontSize: "13px", color: "rgba(240,236,228,0.75)", fontWeight: 300, marginTop: "20px", lineHeight: 1.6 }}>Mumbai, India</p>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: `16px ${PAD}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "12px", color: "rgba(240,236,228,0.72)", fontWeight: 300 }}>© 2025 Ranzospace. All rights reserved.</p>
        <p style={{ fontSize: "12px", color: "rgba(240,236,228,0.72)", fontWeight: 300 }}>ranzospace.in</p>
      </div>
    </footer>
  );
}
