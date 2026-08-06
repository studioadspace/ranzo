"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const links = ["About", "Work", "Services", "Contact"];

export default function Navbar() {
  const isMobile = useBreakpoint(768);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: isMobile ? "16px 20px" : "18px clamp(16px, 5vw, 48px)",
          background: "linear-gradient(to bottom, rgba(14,14,12,0.96) 0%, transparent 100%)",
        }}
      >
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.svg" alt="Ranzospace" width={isMobile ? 116 : 140} height={isMobile ? 19 : 23} priority />
        </Link>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.25 }}
              style={{ display: "block", width: "22px", height: "1.5px", background: "#fefefe", transformOrigin: "center" }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }}
              style={{ display: "block", width: "22px", height: "1.5px", background: "#fefefe" }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.25 }}
              style={{ display: "block", width: "22px", height: "1.5px", background: "#fefefe", transformOrigin: "center" }} />
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 4vw, 36px)" }}>
            {links.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
              >
                <Link href={`/${link.toLowerCase()}`} style={{
                  fontSize: "14px", fontWeight: 500,
                  color: "#fefefe",
                  textDecoration: "none", letterSpacing: "0.01em",
                }}>
                  {link}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "#0e0e0c",
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "40px 20px",
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Link
                  href={`/${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block", padding: "24px 0",
                    fontSize: "36px", fontWeight: 700, color: "#fefefe",
                    textDecoration: "none", letterSpacing: "-0.02em",
                  }}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
            <div style={{ marginTop: "40px" }}>
              <p style={{ fontSize: "13px", color: "#c8c4bc", marginBottom: "8px" }}>info@ranzospace.in</p>
              <p style={{ fontSize: "13px", color: "#c8c4bc" }}>+91 96991 47145</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
