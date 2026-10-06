"use client";
import { useRef, useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLightbox } from "@/components/LightboxProvider";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const projects = [
  { src: "/gallery/amir-sofa-oak.jpg", alt: "Living corner with a bouclé sofa and oak table by Ranzospace Mumbai", label: "Living Room · Mumbai" },
  { src: "/gallery/maddy-bedroom-headboard.jpg", alt: "Bedroom by Ranzospace Mumbai with a timber headboard wall", label: "Master Bedroom · Mumbai" },
  { src: "/gallery/priya-living-white.jpg", alt: "Living room by Ranzospace Mumbai with panelled TV wall and timber detail", label: "Living Room · Mumbai" },
  { src: "/gallery/pramod-living-cove.jpg", alt: "Living room by Ranzospace Mumbai with cove lighting and a pooja niche", label: "Living Room · Mumbai" },
  { src: "/gallery/amir-bedroom-orange.jpg", alt: "Bedroom by Ranzospace Mumbai with a terracotta upholstered bed", label: "Bedroom · Mumbai" },
  { src: "/gallery/priya-kitchen-cream.jpg", alt: "Modular kitchen by Ranzospace Mumbai in cream and oak", label: "Modular Kitchen · Mumbai" },
  { src: "/gallery/amir-cove-tv.jpg", alt: "Living room by Ranzospace Mumbai with a cove-lit TV wall", label: "TV Wall · Mumbai" },
  { src: "/gallery/pramod-dining-mirrors.jpg", alt: "Dining room by Ranzospace Mumbai with a round mirror feature wall", label: "Dining Room · Mumbai" },
  { src: "/gallery/arch-facade.jpg", alt: "Residence by Ranzospace Mumbai in concrete, timber and perforated metal", label: "Architecture · Mumbai" },
  { src: "/gallery/priya-kids-bedroom.jpg", alt: "Children's bedroom by Ranzospace Mumbai with arched shelves", label: "Kids Bedroom · Mumbai" },
  { src: "/gallery/amir-wardrobe-bedroom.jpg", alt: "Bedroom by Ranzospace Mumbai with a full-height wardrobe wall", label: "Wardrobe · Mumbai" },
  { src: "/gallery/rishi-dining-chandelier.jpg", alt: "Dining room by Ranzospace Mumbai with an arched niche and chandelier", label: "Dining Room · Mumbai" },
];

function Card({ p, isMobile }: { p: (typeof projects)[0]; isMobile: boolean }) {
  const { openLightbox } = useLightbox();

  return (
    <div
      onClick={() => openLightbox(p.src, p.alt)}
      data-cursor="hover"
      style={{
        position: "relative", cursor: "pointer", overflow: "hidden", flexShrink: 0,
        borderRadius: "6px",
        width: isMobile ? "58vw" : "clamp(240px, 19vw, 340px)",
        aspectRatio: "3 / 4",
        marginRight: isMobile ? "10px" : "16px",
      }}
    >
      <Image src={p.src} alt={p.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 72vw, 26vw" />
      {!isMobile && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(14,14,12,0.75) 0%, transparent 55%)",
          display: "flex", alignItems: "flex-end", padding: "20px",
        }}>
          <p style={{ fontSize: "13px", color: "#fefefe", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
            {p.label}
          </p>
        </div>
      )}
    </div>
  );
}

export default function RecentWorksSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) setShift(Math.max(0, t.scrollWidth - window.innerWidth + 48));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  const heading = (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", marginBottom: isMobile ? "24px" : "clamp(28px, 3vw, 44px)" }}>
      <div ref={ref} style={{ overflow: "hidden", paddingBottom: "0.12em" }}>
        <motion.h2
          style={{ fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(28px, 2.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe" }}
          initial={{ y: "108%" }} animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          Recent Works
        </motion.h2>
      </div>
      <motion.div initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ paddingBottom: "8px", flexShrink: 0 }}>
        <Link href="/work" className="rw-ghost" style={{ fontSize: "15px", fontWeight: 600, color: "#F8931E", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px" }}>
          View all work <ArrowRight size={16} weight="bold" className="rw-ghost-arrow" aria-hidden="true" />
        </Link>
      </motion.div>
      <style>{`
        .rw-ghost-arrow { transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
        .rw-ghost:hover .rw-ghost-arrow { transform: translateX(5px); }
        .rw-ghost:focus-visible { outline: 2px solid #fefefe; outline-offset: 4px; border-radius: 2px; }
      `}</style>
    </div>
  );

  if (isMobile) {
    return (
      <section style={{ background: "#0e0e0c", padding: "var(--section-y) 20px 0" }}>
        {heading}
        <div style={{ overflowX: "auto", marginRight: "-20px", paddingRight: "20px", scrollSnapType: "x proximity" }}>
          <div style={{ display: "flex", width: "max-content" }}>
            {projects.map((p, i) => <div key={i} style={{ scrollSnapAlign: "start" }}><Card p={p} isMobile /></div>)}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: the section pins while vertical scroll drives the strip sideways.
  return (
    <section style={{ background: "#0e0e0c", paddingTop: "var(--section-y)" }}>
      <div ref={outerRef} style={{ height: `calc(100vh + ${Math.round(shift * 0.85)}px)`, position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ padding: `0 ${PAD}`, width: "100%", maxWidth: `calc(${MAX_W} + 2 * ${PAD})`, margin: "0 auto" }}>{heading}</div>
          <motion.div ref={trackRef} style={{ x, display: "flex", width: "max-content", paddingLeft: `calc(${PAD} + max(0px, (100vw - 2 * ${PAD} - ${MAX_W}) / 2))`, willChange: "transform" }}>
            {projects.map((p, i) => <Card key={i} p={p} isMobile={false} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
