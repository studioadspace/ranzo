"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChatCircle, MapPin, PencilLine, FileText } from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const whatToExpect = [
  {
    Icon: ChatCircle,
    title: "A genuine conversation",
    body: "Not a sales pitch. We ask the right questions about how you live, what you value, and what your space needs to become.",
  },
  {
    Icon: MapPin,
    title: "Site walk-through",
    body: "We visit your space and read its conditions. Light, proportions, structural reality, and hidden potential.",
  },
  {
    Icon: PencilLine,
    title: "Direction, not guesswork",
    body: "Clear design direction, material guidance, and an honest budget framework. So when work begins, it begins right.",
  },
  {
    Icon: FileText,
    title: "A written summary",
    body: "Everything discussed, agreed, and documented. Your next steps are clear before you leave the room.",
  },
];

const process = [
  { step: "01", title: "The Brief", body: "Tell us about your space, your vision, and your goals ahead of the session. The more we know, the more precise we can be." },
  { step: "02", title: "Site Walk-Through", body: "We visit and assess your space in person. We observe what drawings cannot capture and listen before we suggest." },
  { step: "03", title: "The Consultation", body: "A focused session covering design direction, spatial changes, material choices, and an honest conversation about budget and timeline." },
  { step: "04", title: "The Report", body: "A written summary of everything discussed. Direction agreed. Next steps defined. This becomes the foundation your project is built on." },
];

export default function DesignConsultationPage() {
  const isMobile = useBreakpoint(768);
  const heroRef = useRef(null);
  const expectRef = useRef(null);
  const processRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const expectInView = useInView(expectRef, { once: true, margin: isMobile ? "0px" : "-40px" });
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
              style={{ fontSize: "12px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Services / Design Consultation
            </motion.p>

            {isMobile ? (
              /* Mobile: stacked */
              <>
                <motion.h1
                  style={{ fontSize: "clamp(44px, 11vw, 64px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "20px" }}
                  initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Design<br />Consultation
                </motion.h1>
                <motion.p
                  style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.82, marginBottom: "32px" }}
                  initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.2 }}
                >
                  Every space begins with a conversation. Our design consultation is where we listen: your lifestyle, your vision, your space&apos;s potential, before we draw a single line. We discuss design direction, materials, and budget, giving you clarity on how your ideas can take architectural form. Whether it is a new build or a space reimagined, this is where your legacy begins.
                </motion.p>
              </>
            ) : (
              /* Desktop: 2-col — big heading left, body right aligned to heading baseline */
              <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "clamp(40px, 5vw, 80px)", alignItems: "end", paddingBottom: "48px" }}>
                <motion.h1
                  style={{ fontSize: "clamp(52px, 6vw, 96px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.0 }}
                  initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Design<br />Consultation
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.25 }}
                >
                  <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.82, marginBottom: "28px" }}>
                    Every space begins with a conversation. Our design consultation is where we listen: your lifestyle, your vision, your space&apos;s potential, before we draw a single line. We discuss design direction, materials, and budget, giving you clarity on how your ideas can take architectural form. Whether it is a new build or a space reimagined, this is where your legacy begins.
                  </p>
                  <Link href="/contact" style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "13px 28px", background: "#F8931E",
                    color: "#0e0e0c", fontWeight: 700, fontSize: "14px",
                    textDecoration: "none", borderRadius: "6px", letterSpacing: "0.01em",
                  }}>
                    Book a consultation
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        {/* Hero image */}
        <div style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 80px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div style={{ position: "relative", height: "56vw", minHeight: "220px", overflow: "hidden", borderRadius: "10px" }}>
                <Image src="/interiors/amir-study-nook.jpg" alt="Design consultation at Ranzospace" fill style={{ objectFit: "cover" }} sizes="100vw" />
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ position: "relative", height: "clamp(300px, 38vw, 540px)", overflow: "hidden", borderRadius: "10px" }}>
                  <Image src="/interiors/amir-study-nook.jpg" alt="Design consultation at Ranzospace" fill style={{ objectFit: "cover" }} sizes="50vw" />
                </div>
                <div style={{ display: "grid", gap: "12px" }}>
                  <div style={{ position: "relative", flex: 1, overflow: "hidden", borderRadius: "10px", minHeight: "clamp(140px, 18vw, 260px)" }}>
                    <Image src="/architecture/in-process-01.jpg" alt="Design sketches and process at Ranzospace" fill style={{ objectFit: "cover" }} sizes="50vw" />
                  </div>
                  <div style={{ position: "relative", flex: 1, overflow: "hidden", borderRadius: "10px", minHeight: "clamp(140px, 18vw, 260px)" }}>
                    <Image src="/architecture/in-process-02.jpg" alt="Architecture sketches at Ranzospace" fill style={{ objectFit: "cover" }} sizes="50vw" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* What to expect */}
        <section ref={expectRef} style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "16px" }}>What to Expect</p>
                <h2 style={{ fontSize: "clamp(28px, 8vw, 40px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "32px" }}>
                  Clarity before<br />commitment.
                </h2>
                {whatToExpect.map(({ Icon, title, body }, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }} animate={expectInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    style={{ display: "flex", gap: "16px", padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <Icon size={20} weight="regular" color="#F8931E" style={{ flexShrink: 0, marginTop: "3px" }} />
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#fefefe", marginBottom: "6px", letterSpacing: "-0.01em" }}>{title}</p>
                      <p style={{ fontSize: "14px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.78 }}>{body}</p>
                    </div>
                  </motion.div>
                ))}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
              </div>
            ) : (
              /* Desktop: heading left, editorial rows right */
              <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "80px", alignItems: "start" }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={expectInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  style={{ paddingTop: "28px" }}
                >
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>What to Expect</p>
                  <h2 style={{ fontSize: "clamp(28px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                    Clarity before<br />commitment.
                  </h2>
                </motion.div>
                <div>
                  {whatToExpect.map(({ Icon, title, body }, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 16 }} animate={expectInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: "grid", gridTemplateColumns: "36px clamp(180px, 22%, 240px) 1fr", gap: "0 32px", alignItems: "start", padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <Icon size={22} weight="regular" color="#F8931E" style={{ marginTop: "3px" }} />
                      <p style={{ fontSize: "clamp(15px, 1.2vw, 18px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{title}</p>
                      <p style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.8 }}>{body}</p>
                    </motion.div>
                  ))}
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Process */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 88px` }}>
          <div ref={processRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            {isMobile ? (
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "28px" }}>How It Works</p>
                {process.map((p, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    style={{ display: "flex", gap: "20px", padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <span style={{ fontSize: "11px", color: "#F8931E", letterSpacing: "0.18em", fontWeight: 600, flexShrink: 0, paddingTop: "4px", minWidth: "24px" }}>{p.step}</span>
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#fefefe", marginBottom: "6px", letterSpacing: "-0.01em" }}>{p.title}</p>
                      <p style={{ fontSize: "14px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.78 }}>{p.body}</p>
                    </div>
                  </motion.div>
                ))}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
              </div>
            ) : (
              /* Desktop: heading left, numbered rows right */
              <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "80px", alignItems: "start" }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  style={{ paddingTop: "28px" }}
                >
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-instrument), serif", marginBottom: "20px" }}>How It Works</p>
                  <h2 style={{ fontSize: "clamp(28px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                    Four steps<br />to clarity.
                  </h2>
                </motion.div>
                <div>
                  {process.map((p, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 16 }} animate={processInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "0 24px", padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <span style={{ fontSize: "11px", color: "#F8931E", letterSpacing: "0.18em", fontWeight: 600, paddingTop: "5px" }}>{p.step}</span>
                      <div>
                        <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", fontWeight: 700, color: "#fefefe", marginBottom: "8px", letterSpacing: "-0.01em" }}>{p.title}</p>
                        <p style={{ fontSize: "clamp(13px, 1vw, 15px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.8 }}>{p.body}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 100px`, textAlign: "center" }}>
          <p style={{ fontSize: isMobile ? "clamp(24px, 7vw, 36px)" : "clamp(26px, 2.5vw, 44px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.025em", marginBottom: "12px" }}>
            Ready to start the conversation?
          </p>
          <p style={{ fontSize: isMobile ? "15px" : "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75, marginBottom: "28px" }}>
            This is where your legacy begins.
          </p>
          <Link href="/contact" style={{
            display: isMobile ? "block" : "inline-block",
            padding: "16px 40px", background: "#F8931E",
            color: "#0e0e0c", fontWeight: 700, fontSize: "15px", textDecoration: "none",
            borderRadius: "6px",
          }}>
            Book a consultation
          </Link>
        </section>

      </main>
      <FooterSection />
    </>
  );
}
