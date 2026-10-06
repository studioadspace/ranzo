"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePathname } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

// First entry is the guaranteed fallback - always shown on first paint before the rotation kicks in
const CLOSING_IMAGES = [
  { src: "/gallery/pramod-sofa-marble.jpg", alt: "Living room by Ranzospace, Mumbai, with an orange sofa and marble feature wall" },
  { src: "/gallery/maddy-bedroom-blue.jpg", alt: "Bedroom by Ranzospace, Mumbai, with a blue velvet fluted headboard" },
  { src: "/gallery/priya-dining.jpg", alt: "Dining room by Ranzospace, Mumbai, with panelled walls and a statement pendant" },
  { src: "/gallery/priya-living-aerial.jpg", alt: "Living room by Ranzospace, Mumbai, with a grey sofa and wood panelling" },
];

type Ctx = { heading: string; body: string; source: string };
const CONTEXT: Record<string, Ctx> = {
  "/": { heading: "Let's talk about your space.", body: "Tell us what you are planning. We will reply within 24 hours with a clear first step.", source: "Home page" },
  "/about": { heading: "Want to work with the studio?", body: "Share a little about your project and we will set up a conversation with the founder's team.", source: "About page" },
  "/work": { heading: "Liked what you saw?", body: "Tell us about your own space and we will show you how a similar approach could work for it.", source: "Work page" },
  "/services": { heading: "Not sure which service fits?", body: "Describe what you have in mind. We will point you to the right starting point.", source: "Services page" },
  "/services/interior-design": { heading: "Planning a home or office interior?", body: "Share your space, timeline and budget. We will come back with a clear plan for the first step.", source: "Full-Home Interior" },
  "/services/architecture": { heading: "Have a plot or a brief?", body: "Tell us about the site and what it needs to hold. We will take it from concept to construction.", source: "Architecture" },
  "/services/furniture": { heading: "Looking for furniture and decor?", body: "Tell us the rooms and the look you want. We will source, coordinate and install it.", source: "Furniture & Decor" },
  "/services/design-consultation": { heading: "Ready to book a consultation?", body: "Tell us a little about your space. We will schedule a focused session on direction, materials and budget.", source: "Design Consultation" },
};
const DEFAULT_CTX = CONTEXT["/"];

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

  const pathname = (usePathname() || "/").replace(/\/$/, "") || "/";
  const ctx = CONTEXT[pathname] ?? DEFAULT_CTX;

  return (
    <footer style={{ background: "#0e0e0c" }}>
      {/* Closing: rotating image background with a page-aware lead form (form hidden on /contact, which has the full one) */}
      {(() => {
        const showForm = pathname !== "/contact" && pathname !== "/privacy";
        return (
          <div ref={closingRef} style={{ position: "relative", overflow: "hidden", minHeight: showForm ? undefined : (isMobile ? "clamp(320px, 78vw, 460px)" : "clamp(440px, 40vw, 560px)") }}>
            <motion.div style={{ y: isMobile ? 0 : imgY, position: "absolute", inset: 0 }}>
              <AnimatePresence>
                <motion.div key={imgIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }} style={{ position: "absolute", inset: 0 }}>
                  <Image src={CLOSING_IMAGES[imgIndex].src} alt={CLOSING_IMAGES[imgIndex].alt} fill style={{ objectFit: "cover", objectPosition: "center 40%" }} sizes="100vw" priority={imgIndex === 0} />
                </motion.div>
              </AnimatePresence>
              <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,12,0.80)" }} />
            </motion.div>

            <div style={{
              position: "relative", padding: isMobile ? "var(--section-y) 20px" : `var(--section-y) ${PAD}`,
              display: "flex", alignItems: "center", justifyContent: "center", minHeight: "inherit",
            }}>
              <div style={{
                width: "100%", maxWidth: MAX_W,
                display: "grid", gridTemplateColumns: showForm && !isMobile ? "minmax(0, 5fr) minmax(0, 6fr)" : "1fr",
                columnGap: "clamp(48px, 6vw, 112px)", rowGap: "var(--stack-lg)", alignItems: showForm && !isMobile ? "center" : "start",
                textAlign: showForm ? "left" : "center", justifyItems: showForm ? "stretch" : "center",
              }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={closingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  <p style={{ fontSize: isMobile ? "16px" : "19px", fontWeight: 400, color: "#fefefe", fontFamily: "var(--font-serif-display), Georgia, serif", fontStyle: "italic", letterSpacing: "0.03em", marginBottom: isMobile ? "14px" : "20px" }}>
                    Where Space Becomes Legacy
                  </p>
                  <h2 style={{ fontSize: isMobile ? "clamp(32px, 9vw, 44px)" : "clamp(36px, 3.6vw, 60px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fefefe", marginBottom: "20px", textWrap: "balance" }}>
                    {showForm ? ctx.heading : "Spaces that endure."}
                  </h2>
                  <p style={{ fontSize: isMobile ? "16px" : "clamp(16px, 1.2vw, 19px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.8, maxWidth: "460px", margin: showForm ? 0 : "0 auto" }}>
                    {showForm ? ctx.body : "Founded on the belief that true luxury isn't about excess. It's about understanding."}
                  </p>
                </motion.div>
                {showForm && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={closingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
                    <LeadForm source={ctx.source} isMobile={isMobile} />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* CTA + footer columns */}
      {isMobile ? (
        /* Mobile: fully centred single-column layout */
        <div ref={ref} style={{ padding: "56px 24px 40px", textAlign: "center" }}>
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
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#c8c4bc", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-serif), Georgia, serif", marginBottom: "24px" }}>Contact</p>
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
            <p style={{ fontSize: "14px", fontWeight: 400, color: "#c8c4bc", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-serif), Georgia, serif", marginBottom: "24px" }}>Reach Us</p>
            <a href="mailto:info@ranzospace.in" style={{ display: "block", fontSize: "17px", color: "#fefefe", fontWeight: 300, marginBottom: "16px", textDecoration: "none" }}>info@ranzospace.in</a>
            <a href="tel:+919699147145" style={{ display: "block", fontSize: "17px", color: "#fefefe", fontWeight: 300, marginBottom: "16px", textDecoration: "none" }}>+91 96991 47145</a>
            <p style={{ fontSize: "17px", color: "#fefefe", fontWeight: 300, marginTop: "8px" }}>Mumbai, India</p>
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
        <div ref={ref} style={{ padding: `60px ${PAD}` }}>
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
              <p style={{ fontSize: "14px", fontWeight: 400, color: "#c8c4bc", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-serif), Georgia, serif", marginBottom: "20px" }}>Navigate</p>
              {["About", "Work", "Services", "Contact"].map(link => (
                <div key={link} style={{ marginBottom: "12px" }}>
                  <Link href={`/${link.toLowerCase()}`} style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, textDecoration: "none" }}>{link}</Link>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.18 }}>
              <p style={{ fontSize: "14px", fontWeight: 400, color: "#c8c4bc", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-serif), Georgia, serif", marginBottom: "20px" }}>Reach Us</p>
              <a href="mailto:info@ranzospace.in" style={{ display: "block", fontSize: "15px", color: "#c8c4bc", fontWeight: 300, marginBottom: "10px", textDecoration: "none" }}>info@ranzospace.in</a>
              <a href="tel:+919699147145" style={{ display: "block", fontSize: "15px", color: "#c8c4bc", fontWeight: 300, marginBottom: "10px", textDecoration: "none" }}>+91 96991 47145</a>
              <p style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, marginTop: "10px", lineHeight: 1.6 }}>Mumbai, India</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div style={{
        padding: isMobile ? "16px 20px" : `16px ${PAD}`,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: "center",
        gap: isMobile ? "4px" : "12px",
        textAlign: isMobile ? "center" : undefined,
      }}>
        <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300 }}>© {new Date().getFullYear()} Ranzospace. All rights reserved.</p>
        <nav aria-label="Legal and site files" style={{ display: "flex", gap: isMobile ? "18px" : "24px", alignItems: "center" }}>
          <Link href="/privacy" style={{ fontSize: "13px", color: "#c8c4bc", fontWeight: 400, textDecoration: "none" }}>Privacy Policy</Link>
          <a href="/sitemap.xml" style={{ fontSize: "13px", color: "#c8c4bc", fontWeight: 400, textDecoration: "none" }}>Sitemap</a>
          <a href="/robots.txt" style={{ fontSize: "13px", color: "#c8c4bc", fontWeight: 400, textDecoration: "none" }}>Robots</a>
        </nav>
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
