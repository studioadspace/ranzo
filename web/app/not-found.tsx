"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main style={{
      background: "#0e0e0c",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      textAlign: "center",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" style={{ display: "inline-block", marginBottom: "56px" }}>
          <Image src="/logo.svg" alt="Ranzospace" width={96} height={24} />
        </Link>

        <p style={{
          fontSize: "clamp(80px, 16vw, 140px)",
          fontWeight: 800,
          color: "rgba(248,147,30,0.12)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          marginBottom: "0",
        }}>
          404
        </p>

        <p style={{
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 800,
          color: "#fefefe",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginTop: "-24px",
          marginBottom: "20px",
        }}>
          This space is blank.
        </p>

        <p style={{
          fontSize: "clamp(14px, 1.2vw, 17px)",
          fontWeight: 300,
          color: "#c8c4bc",
          lineHeight: 1.75,
          maxWidth: "400px",
          marginBottom: "40px",
        }}>
          The page you are looking for does not exist. Every well-designed space has a purpose. This one does not.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "14px 36px",
            background: "#F8931E",
            color: "#0e0e0c",
            fontWeight: 700,
            fontSize: "14px",
            textDecoration: "none",
            borderRadius: "6px",
            letterSpacing: "0.01em",
          }}
        >
          Back to home
        </Link>
      </motion.div>
    </main>
  );
}
