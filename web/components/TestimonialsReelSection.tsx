"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";
const NEG_PAD = "calc(-1 * clamp(16px, 5vw, 48px))";
const AUTO_ADVANCE_MS = 6500;
const BUFFER = 2;

const testimonials = [
  {
    quote: "Truly satisfied with the designing, space styling and complete home makeover, in such a short span and at a reasonable cost. Ranzo Space carried out our work in a very professional manner. Materials are of very good quality.",
    client: "Sameera Ansari",
    type: "Residential Client, Mumbai",
  },
  {
    quote: "We had an excellent experience working with Manas, Umesh and the entire team at Ranzo Space for our home interiors. They helped us design and install modular wardrobes for all three bedrooms and two beautiful crockery units.",
    client: "Jay Shah",
    type: "Home Interiors, Mumbai",
  },
  {
    quote: "Working with Ranzo Space was an amazing experience. From the start, Manas really listened to my ideas and understood exactly what I wanted. I had so many references, and he not only embraced them but improved on them.",
    client: "Gauri Sawant",
    type: "Residential Client, Andheri",
  },
  {
    quote: "We were building from scratch and did not really know where to begin. They asked questions I had not thought to ask myself. By the time we were done, I understood my own home better. Very patient, very thorough.",
    client: "Shruti Kapoor",
    type: "Residential Client, Thane",
  },
  {
    quote: "I needed the clinic to feel calming without losing the professional edge. It has been a year and patients still comment on it. Exactly what I was looking for.",
    client: "Dr. Nalini Rao",
    type: "Commercial Client, Mumbai",
  },
  {
    quote: "Got my bedroom and living room done last year. No delays, no back and forth. The furniture has held up well. That kind of reliability is harder to find than good design.",
    client: "Vikram Mehta",
    type: "Residential Client, Navi Mumbai",
  },
];

const n = testimonials.length;
const extended = [...testimonials.slice(-BUFFER), ...testimonials, ...testimonials.slice(0, BUFFER)];

export default function TestimonialsReelSection() {
  const isMobile = useBreakpoint(768);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: "-60px" });
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paused, setPaused] = useState(false);

  const [vi, setVi] = useState(BUFFER);
  const [trackX, setTrackX] = useState(0);
  const [animated, setAnimated] = useState(true);

  const realIdx = ((vi - BUFFER) % n + n) % n;

  // Desktop: left-align active card with the heading text.
  // Section has padding: 0 PAD (matching OurStorySection's pattern).
  // The viewport breaks out via negative margins, so its left edge = viewport left.
  // Heading text starts at: PAD + max(0, (viewport - 2*PAD - 1440) / 2)
  // Mobile: center the full-width card.
  const positionTrack = useCallback((idx: number) => {
    const card = cardRefs.current[idx];
    const vp = viewportRef.current;
    if (!card || !vp) return;
    if (isMobile) {
      setTrackX(vp.clientWidth / 2 - card.offsetLeft - card.offsetWidth / 2);
    } else {
      const vw = vp.clientWidth;
      const padVal = Math.min(48, Math.max(16, vw * 0.05));
      const contentW = vw - 2 * padVal;
      const centering = Math.max(0, (contentW - 1440) / 2);
      setTrackX(padVal + centering - card.offsetLeft);
    }
  }, [isMobile]);

  const goNext = useCallback(() => setVi(i => i + 1), []);
  const goPrev = useCallback(() => setVi(i => i - 1), []);

  useEffect(() => { positionTrack(vi); }, [vi, positionTrack]);

  useEffect(() => {
    const h = () => positionTrack(vi);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [vi, positionTrack]);

  useEffect(() => {
    if (vi < BUFFER || vi >= BUFFER + n) {
      const timer = setTimeout(() => {
        const newVi = vi < BUFFER ? n + vi : vi - n;
        setAnimated(false);
        setVi(newVi);
      }, 780);
      return () => clearTimeout(timer);
    }
  }, [vi]);

  useEffect(() => {
    if (!animated) {
      const r1 = requestAnimationFrame(() => {
        const r2 = requestAnimationFrame(() => setAnimated(true));
        return () => cancelAnimationFrame(r2);
      });
      return () => cancelAnimationFrame(r1);
    }
  }, [animated]);

  useEffect(() => {
    if (paused || !inView) return;
    const t = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, inView, goNext]);

  const cardW = isMobile ? "calc(100vw - 32px)" : "clamp(380px, 34vw, 480px)";
  const gap = isMobile ? 16 : 18;

  return (
    // Section has horizontal padding matching OurStorySection — keeps headings in the same column
    <section
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: "#0e0e0c",
        padding: isMobile ? "16px 20px 64px" : `16px ${PAD} 100px`,
        overflow: "hidden",
      }}
    >
      {/* Heading row — h2 left, dots right (desktop only) */}
      <motion.div
        style={{
          maxWidth: MAX_W, margin: "0 auto", paddingBottom: isMobile ? "28px" : "44px",
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 style={{
          fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(28px, 2.6vw, 44px)",
          fontWeight: 700, letterSpacing: "-0.025em", color: "#fefefe", lineHeight: 1.12,
        }}>
          Hear from<br />our Clients
        </h2>

        {/* Dots — top right on desktop */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAnimated(true); setVi(BUFFER + i); }}
                aria-label={`Go to testimonial ${i + 1}`}
                data-cursor="hover"
                style={{
                  width: realIdx === i ? "22px" : "7px", height: "7px", borderRadius: "100px",
                  background: realIdx === i ? "#F8931E" : "rgba(255,255,255,0.18)",
                  border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Carousel viewport — breaks out of section padding with negative margins */}
      <motion.div
        ref={viewportRef}
        style={{
          overflow: "hidden",
          marginLeft: isMobile ? "-20px" : NEG_PAD,
          marginRight: isMobile ? "-20px" : NEG_PAD,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.2 }}
      >
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            transform: `translateX(${trackX}px)`,
            transition: animated ? "transform 0.72s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            willChange: "transform",
          }}
        >
          {extended.map((t, i) => {
            const dist = i - vi;
            const isActive = dist === 0;
            const isAdjacent = Math.abs(dist) === 1;
            const inactiveTextStyle: React.CSSProperties = {
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            };

            return (
              <motion.div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                animate={{
                  scale: (isMobile || isActive) ? 1 : 0.95,
                  // All inactive cards share the same opacity — no progressive dimming
                  opacity: isMobile ? 1 : (isActive ? 1 : 0.45),
                }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => {
                  if (!isActive && isAdjacent && !isMobile) dist < 0 ? goPrev() : goNext();
                }}
                style={{
                  flexShrink: 0,
                  width: cardW,
                  background: isActive ? "#fefefe" : "rgba(255,255,255,0.05)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  padding: isMobile ? "28px 24px" : "44px 48px",
                  cursor: (!isMobile && !isActive && isAdjacent) ? "pointer" : "default",
                  transformOrigin: "center center",
                  minHeight: isMobile ? "200px" : "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                  pointerEvents: (!isMobile && !isActive && !isAdjacent) ? "none" : "auto",
                }}
              >
                <p
                  style={{
                    fontSize: isMobile ? "17px" : "clamp(17px, 1.5vw, 21px)",
                    fontWeight: 400,
                    color: isActive ? "#0e0e0c" : "#c8c4bc",
                    lineHeight: 1.72,
                    letterSpacing: "-0.015em",
                    marginBottom: isMobile ? "20px" : "28px",
                    flex: 1,
                    ...(isActive ? {} : inactiveTextStyle),
                  }}
                >
                  {t.quote}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "16px", height: "1px", background: "#F8931E", flexShrink: 0, display: "block" }} />
                  <div>
                    <p style={{
                      fontSize: "13px", fontWeight: 600,
                      color: isActive ? "#0e0e0c" : "#fefefe",
                      letterSpacing: "0.03em",
                    }}>
                      {t.client}
                    </p>
                    <p style={{
                      fontSize: "11px",
                      color: isActive ? "#888882" : "#c8c4bc",
                      fontWeight: 300, marginTop: "2px",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>
                      {t.type}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
}
