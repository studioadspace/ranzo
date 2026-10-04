"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const sections = [
  {
    title: "What we collect",
    body: [
      "When you send an enquiry through the contact page, or the form at the foot of any page, we collect what you type in: your name, phone number, email address, the services you are interested in, and anything you tell us about your project.",
      "We do not ask for payment details, home addresses or identity documents. If you message us on WhatsApp, we can see your number and what you send, and WhatsApp's own terms apply to that conversation.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "Only to reply to your enquiry, talk through your project and follow up on that conversation. We do not use your details for advertising and we do not build profiles of visitors.",
    ],
  },
  {
    title: "Who sees it",
    body: [
      "Our small team. Enquiries are stored in our Google Workspace account (Google Sheets), which Google processes on our behalf.",
      "We never sell, rent or trade your details. We share them with a third party only where the law requires it.",
    ],
  },
  {
    title: "Cookies and tracking",
    body: [
      "This website does not use advertising or analytics trackers. Our hosting provider, Cloudflare, may keep standard technical logs, such as your IP address, to keep the site secure and running.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "For as long as we need to answer your enquiry and, if you become a client, to run your project and keep our records. If you would rather we deleted your details sooner, ask us.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can ask to see, correct or delete the details we hold about you at any time. Email info@ranzospace.in and we will respond within a reasonable time.",
    ],
  },
  {
    title: "Security and children",
    body: [
      "Access to enquiries is limited to our team and protected by our account security. No system is perfectly secure, but we take care of what you share with us.",
      "This website is meant for adults. We do not knowingly collect details from children.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "If we change how we handle your details, we will update this page and the date above.",
    ],
  },
];

export default function PrivacyPage() {
  const isMobile = useBreakpoint(768);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>
        <section style={{ padding: isMobile ? "110px 20px var(--section-y)" : `160px ${PAD} var(--section-y)` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 5fr) minmax(0, 7fr)", columnGap: "clamp(48px, 6vw, 112px)", rowGap: "var(--stack-lg)", alignItems: "start" }}>
            <div style={{ position: isMobile ? "static" : "sticky", top: "140px" }}>
              <p style={{ fontSize: "14px", fontWeight: 400, color: "#c8c4bc", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-serif), Georgia, serif", marginBottom: "20px" }}>Legal</p>
              <h1 style={{ fontSize: isMobile ? "clamp(40px, 11vw, 56px)" : "clamp(44px, 4.6vw, 76px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "24px" }}>
                Privacy Policy
              </h1>
              <p style={{ fontSize: isMobile ? "16px" : "17px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.8, maxWidth: "440px", marginBottom: "12px" }}>
                Ranzospace is an interior design and architecture studio in Mumbai. This page explains what we collect when you contact us through ranzospace.in, and what we do with it.
              </p>
              <p style={{ fontSize: "14px", color: "#c8c4bc", fontWeight: 300 }}>Last updated 4 October 2026</p>
            </div>

            <div>
              {sections.map((s, i) => (
                <div key={s.title} style={{ marginBottom: i === sections.length - 1 ? 0 : "var(--stack-lg)" }}>
                  <h2 style={{ fontSize: isMobile ? "22px" : "clamp(22px, 1.8vw, 28px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "14px" }}>{s.title}</h2>
                  {s.body.map((para, j) => (
                    <p key={j} style={{ fontSize: isMobile ? "16px" : "17px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85, marginBottom: "14px", maxWidth: "680px" }}>{para}</p>
                  ))}
                </div>
              ))}

              <div style={{ marginTop: "var(--stack-lg)" }}>
                <h2 style={{ fontSize: isMobile ? "22px" : "clamp(22px, 1.8vw, 28px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", marginBottom: "14px" }}>Contact us</h2>
                <p style={{ fontSize: isMobile ? "16px" : "17px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.85 }}>
                  Ranzospace, Mumbai, India<br />
                  <a href="mailto:info@ranzospace.in" style={{ color: "#F8931E", textDecoration: "none" }}>info@ranzospace.in</a><br />
                  <a href="tel:+919699147145" style={{ color: "#F8931E", textDecoration: "none" }}>+91 96991 47145</a>
                </p>
                <p style={{ marginTop: "18px", fontSize: "15px" }}>
                  <Link href="/contact" className="text-link" style={{ color: "#F8931E", textDecoration: "none", fontWeight: 600 }}>Send us an enquiry</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
