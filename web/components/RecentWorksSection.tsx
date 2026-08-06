"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLightbox } from "@/components/LightboxProvider";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const projects = [
  { src: "/interiors/amir-living-tv-01.jpg",     alt: "Living room interior design by Ranzospace Mumbai - floating wood console and sculptural coffee table", label: "Living Room · Mumbai" },
  { src: "/interiors/amir-bedroom-orange.jpg",    alt: "Master bedroom interior design Mumbai - upholstered bed frame by Ranzospace", label: "Master Bedroom · Mumbai" },
  { src: "/interiors/amir-living-cove.jpg",       alt: "Living room TV nook by Ranzospace Mumbai - arched cove-lit alcove", label: "Living Room · Mumbai" },
  { src: "/interiors/amir-study-nook.jpg",        alt: "Built-in study desk and shelving Mumbai by Ranzospace", label: "Study Nook · Mumbai" },
  { src: "/interiors/amir-living-sofa.jpg",       alt: "Lounge corner interior design Mumbai - bouclé sofa and oak coffee table by Ranzospace", label: "Lounge Corner · Mumbai" },
  { src: "/architecture/arch-01.jpg",             alt: "Contemporary residence facade by Ranzospace Mumbai - concrete and timber screen architecture", label: "Architecture · Mumbai" },
  { src: "/interiors/amir-bedroom-wardrobe.jpg",  alt: "Custom wardrobe design Mumbai - two-tone built-in joinery by Ranzospace", label: "Custom Wardrobe · Mumbai" },
  { src: "/interiors/amir-tv-unit-01.jpg",        alt: "Custom floating TV console design Mumbai by Ranzospace", label: "TV Console · Mumbai" },
  { src: "/interiors/amir-dining-nook.jpg",       alt: "Dining nook interior design Mumbai - custom shelving by Ranzospace", label: "Dining Nook · Mumbai" },
  { src: "/interiors/amir-modern-01.jpg",         alt: "Modern luxury interior design Mumbai by Ranzospace", label: "Interior Design · Mumbai" },
  { src: "/architecture/arch-02.jpg",             alt: "Architectural elevation with folding wooden shutters by Ranzospace Mumbai", label: "Architecture · Mumbai" },
  { src: "/interiors/amir-modern-02.jpg",         alt: "Contemporary interior design Mumbai - warm tones and considered proportions by Ranzospace", label: "Interior Design · Mumbai" },
  { src: "/interiors/amir-living-wall.jpg",       alt: "Living room wall detail Mumbai by Ranzospace - textured finishes and layered greenery", label: "Living Room · Mumbai" },
  { src: "/interiors/amir-tv-unit-02.jpg",        alt: "Custom TV unit and wall panelling design Mumbai by Ranzospace", label: "TV Unit · Mumbai" },
  { src: "/interiors/amir-living-02.jpg",         alt: "Warm luxury living room interior design Mumbai by Ranzospace", label: "Living Room · Mumbai" },
];

function Card({ p, isMobile }: { p: (typeof projects)[0]; isMobile: boolean }) {
  const { openLightbox } = useLightbox();

  return (
    <div
      onClick={() => openLightbox(p.src, p.alt)}
      data-cursor="hover"
      style={{
        position: "relative", cursor: "pointer", overflow: "hidden", flexShrink: 0,
        width: isMobile ? "72vw" : "clamp(340px, 26vw, 460px)",
        aspectRatio: "4 / 3",
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const track = [...projects, ...projects];

  return (
    <section style={{ background: "#0e0e0c", padding: isMobile ? `0 20px 32px` : `0 ${PAD} 48px` }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.h2
          ref={ref}
          style={{ fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(28px, 2.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", marginBottom: isMobile ? "24px" : "36px" }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Recent Works
        </motion.h2>
      </div>

      {/* Negative margins break the marquee out of the section padding for full-bleed effect */}
      <div className="rw-marquee-viewport" style={{ overflow: "hidden", marginLeft: isMobile ? "-20px" : "clamp(-48px, -5vw, -16px)", marginRight: isMobile ? "-20px" : "clamp(-48px, -5vw, -16px)" }}>
        <div className="rw-marquee-track" style={{ display: "flex", width: "max-content" }}>
          {track.map((p, i) => <Card key={i} p={p} isMobile={isMobile} />)}
        </div>
      </div>

      <style>{`
        .rw-marquee-track {
          animation: rw-scroll ${isMobile ? 58 : 76}s linear infinite;
        }
        .rw-marquee-viewport:hover .rw-marquee-track {
          animation-play-state: paused;
        }
        @keyframes rw-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
