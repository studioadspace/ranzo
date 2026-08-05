"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";
const AUTO_ADVANCE_MS = 7000;

const testimonials = [
  {
    quote: "Truly satisfied with the designing, space styling and complete home makeover, in such a short span and at a reasonable cost. Ranzo Space carried out our work in a very professional manner. Materials are of very good quality.",
    client: "Sameera Ansari",
    type: "Google Review",
  },
  {
    quote: "We had an excellent experience working with Manas, Umesh and the entire team at Ranzo Space for our home interiors. They helped us design and install modular wardrobes for all three bedrooms and two beautiful crockery units.",
    client: "Jay Shah",
    type: "Google Review",
  },
  {
    quote: "Working with Ranzo Space was an amazing experience. From the start, Manas really listened to my ideas and understood exactly what I wanted. I had so many references, and he not only embraced them but improved on them.",
    client: "Gauri Sawant",
    type: "Google Review",
  },
  {
    quote: "Working with Ranzospace felt less like hiring a vendor and more like adding a partner to the family. They caught details we hadn't even thought to ask about.",
    client: "S.K.",
    type: "Residential Client, Thane",
  },
  {
    quote: "Our clinic waiting room finally feels like the practice we always wanted to run. Patients comment on it daily.",
    client: "Dr. N.R.",
    type: "Commercial Client, Mumbai",
  },
  {
    quote: "Two renovations in, and Ranzospace is still the only studio we'd trust with a third.",
    client: "V.M.",
    type: "Residential Client, Navi Mumbai",
  },
];

// The reel is built from the studio's own logomark shapes (square / circle / triangle) - a
// scattered brand motif rather than generic decorative rectangles.
const SHAPE_SEQUENCE: Array<"square" | "circle" | "triangle"> = ["square", "circle", "triangle", "square", "circle", "square", "triangle", "circle"];
const OPACITY_SEQUENCE = [0.14, 0.42, 0.2, 0.58, 0.12, 0.3, 0.18, 0.46];
const SCALE_SEQUENCE = [0.4, 0.56, 0.46, 0.62, 0.36, 0.5, 0.42, 0.58];
const ROTATION_SEQUENCE = [0, 0, 10, -8, 0, 14, -12, 0];

function LogoBitShape({ type, size, opacity }: { type: "square" | "circle" | "triangle"; size: number; opacity: number }) {
  const color = `rgba(248,147,30,${opacity})`;
  if (type === "circle") {
    return <div style={{ width: size, height: size, borderRadius: "50%", background: color }} />;
  }
  if (type === "triangle") {
    return (
      <div style={{
        width: 0, height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid ${color}`,
      }} />
    );
  }
  return <div style={{ width: size, height: size, borderRadius: size * 0.14, background: color }} />;
}

function ReelColumn({ seed, reverse, tileCount, tileHeightPx }: { seed: number; reverse: boolean; tileCount: number; tileHeightPx: number }) {
  const tiles = Array.from({ length: tileCount }, (_, i) => (i + seed) % SHAPE_SEQUENCE.length);
  const track = [...tiles, ...tiles];

  return (
    <div style={{ overflow: "hidden", height: "100%", position: "relative" }}>
      <div
        className={reverse ? "reel-col reel-col-reverse" : "reel-col"}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}
      >
        {track.map((variant, i) => (
          <div key={i} style={{ height: tileHeightPx, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ transform: `rotate(${ROTATION_SEQUENCE[variant]}deg)` }}>
              <LogoBitShape
                type={SHAPE_SEQUENCE[variant]}
                size={Math.round(tileHeightPx * SCALE_SEQUENCE[variant])}
                opacity={OPACITY_SEQUENCE[variant]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsReelSection() {
  const isMobile = useBreakpoint(768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex(i => (i + 1) % testimonials.length), []);
  const prev = useCallback(() => setIndex(i => (i - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, inView, next]);

  const active = testimonials[index];
  const columns = isMobile ? 3 : 5;
  const reelHeight = isMobile ? "380px" : "clamp(420px, 42vw, 560px)";
  const arrowBtnStyle = {
    background: "none", border: "none", color: "#fefefe", cursor: "pointer",
    padding: "8px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
    opacity: 0.7, transition: "opacity 0.2s ease",
  } as const;

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ background: "#0e0e0c", padding: isMobile ? "0 20px 64px" : `0 ${PAD} 100px` }}
    >
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <motion.h2
          style={{ fontSize: isMobile ? "clamp(28px, 9vw, 40px)" : "clamp(34px, 3.2vw, 56px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", lineHeight: 1.12, marginBottom: isMobile ? "24px" : "36px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Hear from<br />our Clients
        </motion.h2>

        <div style={{ position: "relative", height: reelHeight, borderRadius: "20px", overflow: "hidden" }}>
          {/* Reel background */}
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "10px", padding: "10px" }}>
            {Array.from({ length: columns }, (_, c) => (
              <ReelColumn key={c} seed={c * 2} reverse={c % 2 === 1} tileCount={14} tileHeightPx={isMobile ? 56 : 68} />
            ))}
          </div>

          {/* Fade overlays top/bottom */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0e0e0c 0%, transparent 16%, transparent 84%, #0e0e0c 100%)" }} />
          {/* Darken behind the card */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 62% 60% at 50% 50%, rgba(14,14,12,0.94) 0%, rgba(14,14,12,0.55) 50%, transparent 78%)" }} />

          {/* Central row: prev arrow - card - next arrow, grouped together */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? "8px" : "20px", padding: isMobile ? "20px 12px" : "20px" }}>
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              data-cursor="hover"
              style={arrowBtnStyle}
            >
              <ArrowLeft size={isMobile ? 20 : 24} weight="regular" />
            </button>

            <div style={{
              width: "100%", maxWidth: "560px",
              background: "rgba(14,14,12,0.72)", backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px",
              padding: isMobile ? "28px 22px" : "40px 44px",
              textAlign: "center",
            }}>
              <p style={{
                fontSize: isMobile ? "40px" : "52px", lineHeight: 0.7, color: "#F8931E",
                fontFamily: "Georgia, serif", marginBottom: isMobile ? "12px" : "16px", userSelect: "none",
              }}>&ldquo;</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p style={{
                    fontSize: isMobile ? "17px" : "clamp(19px, 1.7vw, 24px)",
                    fontWeight: 600, color: "#fefefe", lineHeight: 1.5,
                    letterSpacing: "-0.01em", marginBottom: isMobile ? "16px" : "22px",
                  }}>
                    {active.quote}
                  </p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#fefefe", letterSpacing: "0.03em" }}>{active.client}</p>
                  <p style={{ fontSize: "11px", color: "#c8c4bc", fontWeight: 300, marginTop: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{active.type}</p>
                </motion.div>
              </AnimatePresence>

              <p style={{ fontSize: "11px", color: "#c8c4bc", letterSpacing: "0.1em", marginTop: isMobile ? "16px" : "22px" }}>
                {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </p>
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              data-cursor="hover"
              style={arrowBtnStyle}
            >
              <ArrowRight size={isMobile ? 20 : 24} weight="regular" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .reel-col {
          animation: reel-up 26s linear infinite;
        }
        .reel-col-reverse {
          animation: reel-down 26s linear infinite;
        }
        @keyframes reel-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes reel-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
