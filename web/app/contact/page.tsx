"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const interests = ["Design Consultation", "Full-Home Interior", "Architecture", "Modular Kitchen", "Furniture & Decor", "Commercial Space", "Other"];

export default function ContactPage() {
  const isMobile = useBreakpoint(768);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: isMobile ? "0px" : "-40px" });

  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const toggleInterest = (item: string) => {
    setSelected(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const webhookUrl = "https://script.google.com/macros/s/AKfycby339jyqZrKJIsqCt9HCx2VdIAnTowiTLQSLeG2XO0LLQi5K50Tmt8UAKgAGMC8Ql3z/exec";
    try {
        await fetch(webhookUrl, {
          method: "POST",
          // no-cors: Apps Script redirects strip CORS headers; data still posts fine
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            source: selected.length > 0 ? selected.join(", ") : "Contact Form",
          }),
        });
    } catch {
      // no-cors fetch always resolves; catch is a safety net only
    }
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "6px",
    padding: "14px 18px",
    fontSize: "15px",
    color: "#fefefe",
    fontFamily: "inherit",
    fontWeight: 300,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "#c8c4bc",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: "8px",
  };

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: isMobile ? `100px 20px 48px` : `140px ${PAD} 80px` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "12px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Let's Talk
            </motion.p>
            <motion.h1
              style={{ fontSize: isMobile ? "clamp(44px, 11vw, 64px)" : "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Start a<br />conversation.
            </motion.h1>
          </div>
        </section>

        {/* Main content */}
        <section style={{ padding: isMobile ? `0 20px 48px` : `0 ${PAD} 100px` }}>
          <div style={{
            maxWidth: MAX_W,
            margin: "0 auto",
            display: isMobile ? "flex" : "grid",
            flexDirection: isMobile ? "column" : undefined,
            gridTemplateColumns: isMobile ? undefined : "1fr 1.6fr",
            gap: isMobile ? "48px" : "100px",
          }}>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              <p style={{ fontSize: isMobile ? "15px" : "clamp(15px, 1.2vw, 19px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85, marginBottom: "16px" }}>
                Tell us about your project. We&apos;ll get back to you within 24 hours with a clear understanding of whether we&apos;re the right fit.
              </p>
              <p style={{ fontSize: isMobile ? "13px" : "clamp(13px, 1vw, 15px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75, marginBottom: "40px" }}>
                We typically work on full-home interiors, architecture projects, and commercial spaces across Mumbai and India.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "8px" }}>Email</p>
                  <a href="mailto:info@ranzospace.in" style={{ fontSize: isMobile ? "16px" : "clamp(14px, 1.1vw, 17px)", color: "#fefefe", fontWeight: 400, textDecoration: "none" }}>
                    info@ranzospace.in
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "8px" }}>Phone</p>
                  <a href="tel:+919699147145" style={{ fontSize: isMobile ? "16px" : "clamp(14px, 1.1vw, 17px)", color: "#fefefe", fontWeight: 400, textDecoration: "none" }}>
                    +91 96991 47145
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "8px" }}>Studio</p>
                  <p style={{ fontSize: isMobile ? "15px" : "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.65 }}>
                    Mumbai, India<br />
                    <span style={{ fontSize: "13px" }}>ranzospace.in</span>
                  </p>
                </div>

                <div>
                  <a
                    href="https://wa.me/919699147145"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "10px",
                      padding: "14px 28px",
                      background: "transparent",
                      border: "1.5px solid #fefefe",
                      borderRadius: "6px",
                      fontSize: isMobile ? "15px" : "clamp(14px, 1.1vw, 16px)",
                      color: "#fefefe",
                      fontWeight: 700,
                      textDecoration: "none",
                      letterSpacing: "0.01em",
                      transition: "background-color 0.25s ease, border-color 0.25s ease",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>

                <div style={{ paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#c8c4bc", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "12px" }}>Response time</p>
                  <p style={{ fontSize: isMobile ? "15px" : "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300 }}>
                    We respond to every inquiry within <strong style={{ color: "#F8931E", fontWeight: 600 }}>24 hours</strong>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 24 }} animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {submitted ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", minHeight: "400px" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p style={{ fontSize: "48px", marginBottom: "24px" }}>✓</p>
                    <h2 style={{ fontSize: isMobile ? "clamp(26px, 7vw, 36px)" : "clamp(28px, 2.5vw, 40px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", marginBottom: "16px" }}>
                      Message received.
                    </h2>
                    <p style={{ fontSize: isMobile ? "15px" : "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75 }}>
                      We'll be in touch within 24 hours.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: isMobile ? "flex" : "grid", flexDirection: isMobile ? "column" : undefined, gridTemplateColumns: isMobile ? undefined : "1fr 1fr", gap: "20px" }}>
                    <div>
                      <label style={labelStyle}>Name</label>
                      <input
                        style={inputStyle}
                        placeholder="Priya Sharma"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input
                        style={inputStyle}
                        placeholder="+91 98XXX XXXXX"
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      style={inputStyle}
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>

                  {/* Interest selector */}
                  <div>
                    <label style={labelStyle}>I'm interested in</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {interests.map(item => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => toggleInterest(item)}
                          style={{
                            padding: "8px 18px",
                            border: `1px solid ${selected.includes(item) ? "#F8931E" : "rgba(255,255,255,0.12)"}`,
                            background: selected.includes(item) ? "rgba(248,147,30,0.12)" : "transparent",
                            color: selected.includes(item) ? "#F8931E" : "#c8c4bc",
                            borderRadius: "100px", fontSize: "13px", fontWeight: 500,
                            cursor: "pointer", transition: "all 0.2s ease", fontFamily: "inherit",
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Tell us about your project</label>
                    <textarea
                      style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
                      placeholder="Brief us on the space, your timeline, approximate budget..."
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "16px 40px", background: "#F8931E", border: "none",
                      color: "#0e0e0c", fontWeight: 700, fontSize: "15px",
                      borderRadius: "6px", cursor: loading ? "default" : "pointer", fontFamily: "inherit",
                      alignSelf: isMobile ? "stretch" : "flex-start",
                      letterSpacing: "0.01em",
                      opacity: loading ? 0.65 : 1,
                      transition: "opacity 0.2s ease",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    }}
                  >
                    {loading ? "Sending..." : <>{`Send message`} <ArrowRight size={16} weight="bold" /></>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

      </main>
      <FooterSection />
      <style>{`
        .whatsapp-btn:hover {
          background-color: #25d366 !important;
          border-color: #25d366 !important;
        }
      `}</style>
    </>
  );
}
