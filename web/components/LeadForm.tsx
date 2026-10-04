"use client";
import { useState } from "react";
import Link from "next/link";
import { submitLead } from "@/lib/lead";

const field: React.CSSProperties = {
  width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #8b877e",
  borderRadius: 0, padding: "10px 0 14px", fontSize: "18px", color: "#fefefe",
  fontFamily: "inherit", fontWeight: 400, outline: "none", boxSizing: "border-box",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
};
const label: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: 500, color: "#c8c4bc", letterSpacing: "0.04em", marginBottom: "2px" };

export default function LeadForm({ source, isMobile }: { source: string; isMobile: boolean }) {
  const [data, setData] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData(d => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitLead({ ...data, source });
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div role="status" style={{ padding: "8px 0" }}>
        <p style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", marginBottom: "10px" }}>Thank you.</p>
        <p style={{ fontSize: "16px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75 }}>We have your details and will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "26px" : "30px 32px" }}>
      <div>
        <label htmlFor={`lf-name-${source}`} style={label}>Name</label>
        <input id={`lf-name-${source}`} required autoComplete="name" value={data.name} onChange={set("name")} className="ui-field" style={field} />
      </div>
      <div>
        <label htmlFor={`lf-phone-${source}`} style={label}>Phone</label>
        <input id={`lf-phone-${source}`} required type="tel" autoComplete="tel" value={data.phone} onChange={set("phone")} className="ui-field" style={field} />
      </div>
      <div style={{ gridColumn: isMobile ? "auto" : "1 / -1" }}>
        <label htmlFor={`lf-email-${source}`} style={label}>Email</label>
        <input id={`lf-email-${source}`} required type="email" autoComplete="email" value={data.email} onChange={set("email")} className="ui-field" style={field} />
      </div>
      <div style={{ gridColumn: isMobile ? "auto" : "1 / -1" }}>
        <label htmlFor={`lf-msg-${source}`} style={label}>Tell us about your project</label>
        <textarea id={`lf-msg-${source}`} rows={2} value={data.message} onChange={set("message")} className="ui-field" style={{ ...field, resize: "none" }} />
      </div>
      <div style={{ gridColumn: isMobile ? "auto" : "1 / -1" }}>
        <button type="submit" disabled={loading} style={{
          width: isMobile ? "100%" : "auto", minHeight: "52px", padding: "16px 40px", border: "none", borderRadius: "6px",
          background: "#F8931E", color: "#0e0e0c", fontSize: "15px", fontWeight: 700, cursor: loading ? "wait" : "pointer", fontFamily: "inherit",
        }}>
          {loading ? "Sending..." : "Send message"}
        </button>
        <p style={{ marginTop: "16px", fontSize: "13px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.6 }}>
          We use your details only to reply to you and never sell them. <Link href="/privacy" style={{ color: "#F8931E", textDecoration: "none" }}>Privacy Policy</Link>
        </p>
      </div>
    </form>
  );
}
