"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

// First entry is the guaranteed fallback - always shown on first paint before the rotation kicks in
const CLOSING_IMAGES = [
  { src: "/interiors/amir-living-02.jpg", alt: "Warm luxury living room interior by Ranzospace, Mumbai" },
  { src: "/architecture/arch-01.jpg", alt: "Contemporary concrete and timber residence facade by Ranzospace, Mumbai" },
  { src: "/interiors/amir-living-sofa.jpg", alt: "Bouclé sofa lounge corner interior design by Ranzospace, Mumbai" },
  { src: "/architecture/arch-02.jpg", alt: "Architectural elevation with folding timber shutters by Ranzospace, Mumbai" },
];

export default function FooterSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const closingRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const closingInView = useInView(closingRef, { once: true, margin: "-60px" });
  const { scrollYProgress } = useScroll({ target: closingRef, offset: ["start end", "end end"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "0%"]);

  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setImgIndex(i => (i + 1) % CLOSING_IMAGES.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer style={{ background: "#0e0e0c" }}>
      {/* Closing - full-width image with headline */}
      <div ref={closingRef} style={{ position: "relative", overflow: "hidden", height: isMobile ? "clamp(320px, 78vw, 460px)" : "clamp(440px, 56vw, 700px)" }}>
        <motion.div style={{ y: isMobile ? 0 : imgY, position: "absolute", inset: 0 }}>
          <AnimatePresence>
            <motion.div
              key={imgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0 }}
            >
              <Image
                src={CLOSING_IMAGES[imgIndex].src}
                alt={CLOSING_IMAGES[imgIndex].alt}
                fill
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
                sizes="100vw"
                priority={imgIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,12,0.74)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(14,14,12,0.35) 0%, rgba(14,14,12,0.15) 60%, transparent 85%)" }} />
        </motion.div>

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "24px 20px" : "48px", textAlign: "center" }}>
          {/* Tagline above headline */}
          <motion.p
            style={{
              fontSize: isMobile ? "16px" : "19px",
              fontWeight: 400,
              color: "#fefefe",
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              letterSpacing: "0.03em",
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
            <Image src="/logo.svg" alt="Ranzospace" width={122} height={20} style={{ margin: "0 auto 36px" }} />
            <p style={{ fontSize: "28px", fontWeight: 700, color: "#fefefe", lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.02em" }}>
              Let&apos;s build something<br />that endures.
            </p>
            <Link href="/contact" style={{ fontSize: "16px", fontWeight: 600, color: "#F8931E", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Get in touch <ArrowRight size={16} weight="bold" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.12 }}
            style={{ marginTop: "48px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "24px" }}>Contact</p>
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
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "24px" }}>Reach Us</p>
            <a href="mailto:info@ranzospace.in" style={{ display: "block", fontSize: "17px", color: "#fefefe", fontWeight: 300, marginBottom: "16px", textDecoration: "none" }}>info@ranzospace.in</a>
            <a href="tel:+919699147145" style={{ display: "block", fontSize: "17px", color: "#fefefe", fontWeight: 300, marginBottom: "16px", textDecoration: "none" }}>+91 96991 47145</a>
            <p style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, marginTop: "8px" }}>Mumbai, India</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.3 }}
            style={{ marginTop: "40px", display: "flex", gap: "20px", justifyContent: "center" }}>
            <Link href="https://instagram.com/ranzospace" target="_blank" rel="noopener noreferrer" aria-label="Ranzospace on Instagram" style={{ color: "#c8c4bc", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}>
              <InstagramLogo size={20} weight="regular" />
            </Link>
            <Link href="https://linkedin.com/company/ranzospace" target="_blank" rel="noopener noreferrer" aria-label="Ranzospace on LinkedIn" style={{ color: "#c8c4bc", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}>
              <LinkedinLogo size={20} weight="regular" />
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
              <Image src="/logo.svg" alt="Ranzospace" width={110} height={18} style={{ marginBottom: "24px" }} />
              <motion.p
                style={{ fontSize: "clamp(22px, 2vw, 32px)", fontWeight: 700, color: "#fefefe", lineHeight: 1.25, marginBottom: "16px", letterSpacing: "-0.02em" }}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65 }}
              >
                Let&apos;s build something<br />that endures.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 }}>
                <Link href="/contact" style={{ fontSize: "15px", fontWeight: 600, color: "#F8931E", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  Get in touch <ArrowRight size={15} weight="bold" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.55, delay: 0.25 }}
                style={{ display: "flex", gap: "16px", marginTop: "28px" }}
              >
                <Link href="https://instagram.com/ranzospace" target="_blank" rel="noopener noreferrer" aria-label="Ranzospace on Instagram" style={{ color: "#c8c4bc", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}>
                  <InstagramLogo size={18} weight="regular" />
                </Link>
                <Link href="https://linkedin.com/company/ranzospace" target="_blank" rel="noopener noreferrer" aria-label="Ranzospace on LinkedIn" style={{ color: "#c8c4bc", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}>
                  <LinkedinLogo size={18} weight="regular" />
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>Navigate</p>
              {["About", "Work", "Services", "Contact"].map(link => (
                <div key={link} style={{ marginBottom: "12px" }}>
                  <Link href={`/${link.toLowerCase()}`} style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, textDecoration: "none" }}>{link}</Link>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.18 }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>Reach Us</p>
              <a href="mailto:info@ranzospace.in" style={{ display: "block", fontSize: "15px", color: "#c8c4bc", fontWeight: 300, marginBottom: "10px", textDecoration: "none" }}>info@ranzospace.in</a>
              <a href="tel:+919699147145" style={{ display: "block", fontSize: "15px", color: "#c8c4bc", fontWeight: 300, marginBottom: "10px", textDecoration: "none" }}>+91 96991 47145</a>
              <p style={{ fontSize: "13px", color: "#c8c4bc", fontWeight: 300, marginTop: "20px", lineHeight: 1.6 }}>Mumbai, India</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: isMobile ? "16px 20px" : `16px ${PAD}`,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: "center",
        gap: isMobile ? "4px" : "12px",
        textAlign: isMobile ? "center" : undefined,
      }}>
        <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300 }}>© {new Date().getFullYear()} Ranzospace. All rights reserved.</p>
        <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300 }}>ranzospace.in</p>
        <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300, marginTop: isMobile ? "8px" : undefined }}>
          Built with ♥️ by{" "}
          <Link href="https://studioadspace.com/?ref=ranzo" target="_blank" rel="noopener noreferrer" style={{ color: "#c8c4bc", fontWeight: 700, textDecoration: "none" }}>
            Studio AdSpace
          </Link>
        </p>
      </div>
    </footer>
  );
}
