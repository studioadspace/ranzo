"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const IMAGES = [
  { src: "/gallery/arch-concrete.jpg", alt: "Concrete residence with folding timber shutters by Ranzospace", title: "Architecture", body: "Every building starts as a line on paper. We carry it from concept sketch to construction with precision." },
  { src: "/gallery/amir-console-front.jpg", alt: "Living room by Ranzospace with a cove-lit wall and a floating oak console", title: "Interiors", body: "Rooms planned around how you live: proportion, light and a calm, layered palette." },
  { src: "/gallery/maddy-wardrobe-fluted.jpg", alt: "Fluted timber and lacquer wardrobe wall by Ranzospace", title: "Furniture", body: "Wardrobes, consoles and kitchens built to the millimetre for your walls, never off a shelf." },
  { src: "/gallery/priya-board-swatches.jpg", alt: "Material board with walnut, fluted oak, terrazzo and marble samples", title: "Materials", body: "Timber, stone, metal and fabric chosen together, so every surface agrees." },
];

const RATIO = "4 / 5";

function Tile({ src, alt, delay = 0, parallax }: { src: string; alt: string; delay?: number; parallax: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <motion.div
      ref={ref}
      style={{ aspectRatio: RATIO, overflow: "hidden", position: "relative", borderRadius: "6px", background: "#141410" }}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.95, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {parallax ? (
        <motion.div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: "-10%", y }}>
          <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="25vw" />
        </motion.div>
      ) : (
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} sizes="50vw" />
      )}
    </motion.div>
  );
}

const DRIFT = [56, -24, 84, -48];

function Figure({ img, i, isMobile }: { img: (typeof IMAGES)[0]; i: number; isMobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref as React.RefObject<HTMLElement>, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 0.5, 1], [DRIFT[i % 4], 0, -DRIFT[i % 4]]);
  return (
    <motion.figure ref={ref} style={{ margin: 0, y: isMobile ? 0 : drift }}>
      <Tile src={img.src} alt={img.alt} delay={i * 0.08} parallax={!isMobile} />
      <figcaption style={{ marginTop: "18px" }}>
        <p style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: isMobile ? "19px" : "clamp(19px, 1.5vw, 24px)", color: "#fefefe", lineHeight: 1.2, marginBottom: "8px" }}>{img.title}</p>
        <p style={{ fontSize: isMobile ? "14px" : "clamp(14px, 1vw, 15px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.7 }}>{img.body}</p>
      </figcaption>
    </motion.figure>
  );
}

export default function TheCraftSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const intro =
    "At Ranzospace, we design beyond what is seen. We shape environments that influence how you live, move, and feel every day. Our work is not about surfaces alone. It is about creating spaces with depth, balance, and intention.";
  const bodyStyle = { fontSize: isMobile ? "16px" : "clamp(15px, 1.1vw, 17px)", color: "#fefefe", fontWeight: 300, lineHeight: 1.85 } as const;

  return (
    <section style={{ background: "#0e0e0c", padding: isMobile ? "var(--section-y) 20px 0" : `var(--section-y) ${PAD} 0` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            columnGap: "clamp(48px, 6vw, 96px)",
            rowGap: "20px",
            marginBottom: "var(--stack-lg)",
            alignItems: "end",
          }}
        >
          <div style={{ overflow: "hidden", paddingBottom: "0.12em" }}>
            <motion.h2
              style={{ fontSize: isMobile ? "clamp(34px, 10vw, 48px)" : "clamp(40px, 3.8vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fefefe", lineHeight: 1.05 }}
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              The Craft
            </motion.h2>
          </div>
          <motion.p
            style={bodyStyle}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            {intro}
          </motion.p>
        </div>

        {/* Modular grid: every tile shares one ratio, so edges and gutters line up at any width */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
          columnGap: isMobile ? "12px" : "clamp(16px, 1.6vw, 24px)",
          rowGap: isMobile ? "32px" : "0",
          alignItems: "start",
        }}>
          {IMAGES.map((img, i) => <Figure key={img.src} img={img} i={i} isMobile={isMobile} />)}
        </div>

      </div>
    </section>
  );
}
