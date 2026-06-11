"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { siInstagram, siLinkedin } from "simple-icons";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

export default function FooterSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const closingRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const closingInView = useInView(closingRef, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: closingRef, offset: ["start end", "end end"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "0%"]);

  return (
    <footer style={{ background: "#0e0e0c" }}>
      {/* Closing — full-width image with headline */}
      <div ref={closingRef} style={{ position: "relative", overflow: "hidden", height: isMobile ? "clamp(280px, 72vw, 420px)" : "clamp(380px, 50vw, 640px)" }}>
        <motion.div style={{ y: isMobile ? 0 : imgY, position: "absolute", inset: 0 }}>
          <Image src="/img17.jpeg" alt="Ranzospace designed spaces" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,12,0.65)" }} />
        </motion.div>

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "24px 20px" : "48px", textAlign: "center" }}>
          {/* Tagline above headline */}
          <motion.p
            style={{
              fontSize: isMobile ? "12px" : "13px",
              fontWeight: 400,
              color: "#c8c4bc",
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              letterSpacing: "0.06em",
              marginBottom: isMobile ? "14px" : "20px",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Where Space Becomes Legacy
          </motion.p>
          {/* Main headline: SPACES that ENDURE */}
          <motion.h2
            style={{
              fontSize: isMobile ? "clamp(36px, 11vw, 60px)" : "clamp(56px, 7.5vw, 112px)",
              lineHeight: 1.0,
              letterSpacing: isMobile ? "-0.02em" : "-0.03em",
              color: "#fefefe",
              marginBottom: isMobile ? "20px" : "28px",
              userSelect: "none",
              fontWeight: 800,
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            SPACES{" "}
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, fontStyle: "italic", letterSpacing: "0.01em" }}>
              that
            </span>
            {" "}ENDURE
          </motion.h2>

          {/* Subtext */}
          <motion.p
            style={{
              fontSize: isMobile ? "clamp(13px, 3.8vw, 17px)" : "clamp(15px, 1.2vw, 19px)",
              color: "#c8c4bc",
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: isMobile ? "320px" : "480px",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={closingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            Founded on the belief that true luxury isn&apos;t about excess.{" "}
            <strong style={{ color: "#fefefe", fontWeight: 700 }}>It&apos;s about understanding.</strong>
          </motion.p>
        </div>
      </div>

      {/* CTA + footer columns */}
      {isMobile ? (
        /* Mobile: fully centred single-column layout */
        <div ref={ref} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "56px 24px 40px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }}>
            <Image src="/logo.svg" alt="Ranzospace" width={120} height={30} style={{ margin: "0 auto 36px" }} />
            <p style={{ fontSize: "28px", fontWeight: 700, color: "#fefefe", lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.02em" }}>
              Let&apos;s build something<br />that endures.
            </p>
            <Link href="/contact" style={{ fontSize: "16px", fontWeight: 600, color: "#F8931E", textDecoration: "none" }}>
              Get in touch →
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.12 }}
            style={{ marginTop: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "24px" }}>Contact</p>
            {["About", "Work", "Services", "Contact"].map(link => (
              <div key={link} style={{ marginBottom: "20px" }}>
                <Link href={`/${link.toLowerCase()}`} style={{ fontSize: "18px", color: "#fefefe", fontWeight: 300, textDecoration: "none" }}>
                  {link}
                </Link>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.22 }}
            style={{ marginTop: "40px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "24px" }}>Reach Us</p>
            <p style={{ fontSize: "17px", color: "#fefefe", fontWeight: 300, marginBottom: "16px" }}>info@ranzospace.in</p>
            <p style={{ fontSize: "17px", color: "#fefefe", fontWeight: 300, marginBottom: "16px" }}>+91 96991 47145</p>
            <p style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, marginTop: "8px" }}>Mumbai, India</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.3 }}
            style={{ marginTop: "40px", display: "flex", gap: "20px", justifyContent: "center" }}>
            <Link href="https://instagram.com/ranzospace" target="_blank" rel="noopener noreferrer" aria-label="Ranzospace on Instagram" style={{ color: "#c8c4bc", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}>
              <svg role="img" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d={siInstagram.path} /></svg>
            </Link>
            <Link href="https://linkedin.com/company/ranzospace" target="_blank" rel="noopener noreferrer" aria-label="Ranzospace on LinkedIn" style={{ color: "#c8c4bc", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}>
              <svg role="img" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d={siLinkedin.path} /></svg>
            </Link>
          </motion.div>
        </div>
      ) : (
        /* Desktop: 3-column grid */
        <div ref={ref} style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: `60px ${PAD}` }}>
          <div style={{
            maxWidth: MAX_W, margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}>
            <div>
              <Image src="/logo.svg" alt="Ranzospace" width={88} height={22} style={{ marginBottom: "24px" }} />
              <motion.p
                style={{ fontSize: "clamp(22px, 2vw, 32px)", fontWeight: 700, color: "#fefefe", lineHeight: 1.25, marginBottom: "16px", letterSpacing: "-0.02em" }}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65 }}
              >
                Let&apos;s build something<br />that endures.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 }}>
                <Link href="/contact" style={{ fontSize: "15px", fontWeight: 600, color: "#F8931E", textDecoration: "none" }}>
                  Get in touch →
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.55, delay: 0.25 }}
                style={{ display: "flex", gap: "16px", marginTop: "28px" }}
              >
                <Link href="https://instagram.com/ranzospace" target="_blank" rel="noopener noreferrer" aria-label="Ranzospace on Instagram" style={{ color: "#c8c4bc", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}>
                  <svg role="img" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d={siInstagram.path} /></svg>
                </Link>
                <Link href="https://linkedin.com/company/ranzospace" target="_blank" rel="noopener noreferrer" aria-label="Ranzospace on LinkedIn" style={{ color: "#c8c4bc", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}>
                  <svg role="img" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d={siLinkedin.path} /></svg>
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>Navigate</p>
              {["About", "Work", "Services", "Contact"].map(link => (
                <div key={link} style={{ marginBottom: "12px" }}>
                  <Link href={`/${link.toLowerCase()}`} style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, textDecoration: "none" }}>{link}</Link>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.18 }}>
              <p style={{ fontSize: "11px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>Reach Us</p>
              <p style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, marginBottom: "10px" }}>info@ranzospace.in</p>
              <p style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, marginBottom: "10px" }}>+91 96991 47145</p>
              <p style={{ fontSize: "13px", color: "#c8c4bc", fontWeight: 300, marginTop: "20px", lineHeight: 1.6 }}>Mumbai, India</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: isMobile ? `14px 20px` : `16px ${PAD}`, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300 }}>© {new Date().getFullYear()} Ranzospace. All rights reserved.</p>
        <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300, textAlign: "center" }}>
          Built with ♥️ by{" "}
          <Link href="https://studioadspace.com/?ref=ranzo" target="_blank" rel="noopener noreferrer" style={{ color: "#c8c4bc", fontWeight: 700, textDecoration: "none" }}>
            Studio AdSpace
          </Link>
        </p>
        <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300 }}>ranzospace.in</p>
      </div>
    </footer>
  );
}
