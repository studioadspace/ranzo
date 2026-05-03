"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const links = ["About", "Work", "Services", "Contact"];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px clamp(16px, 5vw, 48px)",
        background: "linear-gradient(to bottom, rgba(14,14,12,0.96) 0%, transparent 100%)",
      }}
    >
      <Link href="/">
        <Image src="/logo.svg" alt="Ranzospace" width={88} height={22} priority />
      </Link>

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
              color: "rgba(240,236,228,0.6)",
              textDecoration: "none", letterSpacing: "0.01em",
            }}>
              {link}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
}
