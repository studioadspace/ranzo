"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";

const MAX_W = "1440px";
const PAD = "48px";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px",
  padding: "14px 18px",
  fontSize: "15px",
  color: "#f0ece4",
  fontFamily: "inherit",
  fontWeight: 300,
  outline: "none",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s ease",
};

const labelStyle = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  color: "rgba(240,236,228,0.75)",
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  marginBottom: "8px",
};

const interests = ["Full-Home Interior", "Architecture", "Modular Kitchen", "Furniture & Décor", "Commercial Space", "Other"];

export default function ContactPage() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: "-40px" });

  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const toggleInterest = (item: string) => {
    setSelected(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              Let's Talk
            </motion.p>
            <motion.h1
              style={{ fontSize: "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#f0ece4", letterSpacing: "-0.03em", lineHeight: 1.05 }}
              initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Start a<br />conversation.
            </motion.h1>
          </div>
        </section>

        {/* Main content */}
        <section style={{ padding: `0 ${PAD} 100px` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "100px" }}>

            {/* Left — contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              <p style={{ fontSize: "clamp(15px, 1.2vw, 19px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.85, marginBottom: "52px" }}>
                Tell us about your project. We'll get back to you within 24 hours with an honest assessment of whether we're the right fit.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "10px" }}>Email</p>
                  <a href="mailto:info@ranzospace.in" style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#f0ece4", fontWeight: 400, textDecoration: "none" }}>
                    info@ranzospace.in
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "10px" }}>Phone</p>
                  <a href="tel:+919699147145" style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#f0ece4", fontWeight: 400, textDecoration: "none" }}>
                    +91 96991 47145
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "10px" }}>Studio</p>
                  <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "rgba(240,236,228,0.6)", fontWeight: 300, lineHeight: 1.65 }}>
                    Mumbai, India<br />
                    <span style={{ fontSize: "13px", color: "rgba(240,236,228,0.6)" }}>ranzospace.in</span>
                  </p>
                </div>

                <div style={{ marginTop: "8px", paddingTop: "36px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(240,236,228,0.75)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "16px" }}>Response time</p>
                  <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "rgba(240,236,228,0.75)", fontWeight: 300 }}>
                    We respond to every inquiry within <strong style={{ color: "#F8931E", fontWeight: 600 }}>24 hours</strong>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
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
                    <h2 style={{ fontSize: "clamp(28px, 2.5vw, 40px)", fontWeight: 700, color: "#f0ece4", letterSpacing: "-0.02em", marginBottom: "16px" }}>
                      Message received.
                    </h2>
                    <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "rgba(240,236,228,0.75)", fontWeight: 300, lineHeight: 1.75 }}>
                      We'll be in touch within 24 hours.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
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
                            color: selected.includes(item) ? "#F8931E" : "rgba(240,236,228,0.75)",
                            borderRadius: "100px", fontSize: "13px", fontWeight: 500,
                            cursor: "none", transition: "all 0.2s ease", fontFamily: "inherit",
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
                    style={{
                      padding: "16px 40px", background: "#F8931E", border: "none",
                      color: "#0e0e0c", fontWeight: 700, fontSize: "15px",
                      borderRadius: "6px", cursor: "none", fontFamily: "inherit",
                      alignSelf: "flex-start", letterSpacing: "0.01em",
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    Send message →
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

      </main>
      <FooterSection />
    </>
  );
}
