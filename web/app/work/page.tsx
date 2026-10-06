"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import FooterSection from "@/components/FooterSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import AutoVideo from "@/components/AutoVideo";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useLightbox } from "@/components/LightboxProvider";

const MAX_W = "1440px";
const PAD = "clamp(16px, 5vw, 48px)";

const categories = ["All", "Residential", "Architectural", "Modular Furniture"];

// One real concept-to-built pairing (not a generic strip) - same house, sketch vs. finished render
// Both frames are registered to the same viewpoint and scale, so the building
// stays continuous as the divider moves. Replacing them means re-registering the pair.
const conceptPair = {
  sketch: { src: "/gallery/slider-concept.jpg", alt: "Concept elevation sketch by Ranzospace for a Mumbai residence, showing the rooftop pergola, perforated metal screen and mango tree" },
  built: { src: "/gallery/slider-built.jpg", alt: "The same Mumbai residence completed by Ranzospace, in concrete, timber screens and perforated metal" },
};

const RATIOS: Record<string, number> = {
  "/gallery/amir-console-front.jpg": 0.7467,
  "/gallery/amir-study-bedroom.jpg": 0.7467,
  "/gallery/arch-concrete.jpg": 0.8004,
  "/gallery/arch-details-bl.jpg": 0.7439,
  "/gallery/arch-details-br.jpg": 0.741,
  "/gallery/arch-details-tl.jpg": 0.7439,
  "/gallery/arch-details-tr.jpg": 0.741,
  "/gallery/arch-facade.jpg": 0.745,
  "/gallery/arch-garden-bl.jpg": 0.7441,
  "/gallery/arch-garden-br.jpg": 0.7412,
  "/gallery/arch-garden-tl.jpg": 0.7447,
  "/gallery/arch-garden-tr.jpg": 0.7418,
  "/gallery/arch-shutters-bl.jpg": 0.803,
  "/gallery/arch-shutters-br.jpg": 0.7933,
  "/gallery/arch-shutters-tl.jpg": 0.8033,
  "/gallery/arch-shutters-tr.jpg": 0.7937,
  "/gallery/arch-sketch-elevation.jpg": 0.8153,
  "/gallery/arch-sketch-mass.jpg": 0.8767,
  "/gallery/maddy-bedroom-dresser.jpg": 0.7467,
  "/gallery/maddy-bedroom-tv.jpg": 0.7467,
  "/gallery/maddy-wardrobe-fluted.jpg": 0.7467,
  "/gallery/maddy-wardrobe-wall.jpg": 0.7467,
  "/gallery/pramod-bedroom-palm.jpg": 0.7492,
  "/gallery/pramod-console.jpg": 0.7492,
  "/gallery/pramod-dining-colour.jpg": 0.7492,
  "/gallery/pramod-living-wide.jpg": 0.7462,
  "/gallery/pramod-mandir.jpg": 0.75,
  "/gallery/priya-board-wood.jpg": 1.3393,
  "/gallery/priya-kids-built-in.jpg": 0.7467,
  "/gallery/priya-kids-reading.jpg": 0.7467,
  "/gallery/priya-kids-study.jpg": 0.7467,
  "/gallery/priya-kitchen-black.jpg": 0.7467,
  "/gallery/priya-kitchen-oak.jpg": 0.7467,
  "/gallery/priya-materials-still.jpg": 0.7467,
  "/gallery/priya-pink-wardrobe.jpg": 0.7467,
  "/gallery/rishi-bedroom-arch.jpg": 1.7778,
  "/gallery/rishi-bedroom-landscape.jpg": 1.7778,
  "/gallery/rishi-bookcase.jpg": 0.7567,
  "/gallery/rishi-pendant-corner.jpg": 0.7296,
  "/gallery/rishi-study-unit.jpg": 0.7296,
  "/video/walk-1-poster.jpg": 0.75,
  "/video/walk-2-poster.jpg": 0.75,
  "/video/walk-3-poster.jpg": 0.75,
};

const projects = [
  {
    src: "/video/walk-3-poster.jpg",
    video: "/video/walk-3.mp4",
    alt: "Walkthrough of a living room by Ranzospace with cove lighting",
    label: "Living Room Walkthrough", location: "Mumbai", category: "Residential", area: "620 sq ft",
    description: "A slow walk through the finished room in morning light.",
  },
  {
    src: "/video/walk-1-poster.jpg",
    video: "/video/walk-1.mp4",
    alt: "Walkthrough of a living and dining space by Ranzospace",
    label: "Living and Dining Walkthrough", location: "Mumbai", category: "Residential", area: "900 sq ft",
    description: "A finished home, from the console and stone art to the dining table.",
  },
  {
    src: "/video/walk-2-poster.jpg",
    video: "/video/walk-2.mp4",
    alt: "Walkthrough of a dining and living room by Ranzospace in evening light",
    label: "Dining and Living Walkthrough", location: "Mumbai", category: "Residential", area: "780 sq ft",
    description: "Warm evening light moves across a panelled dining room and a quiet living room.",
  },
  {
    src: "/gallery/pramod-dining-colour.jpg",
    alt: "Dining room by Ranzospace Mumbai with mirror wall and colour art",
    label: "Dining Room", location: "Mumbai", category: "Residential", area: "260 sq ft",
    description: "Round mirrors and one bold artwork lift a compact dining room.",
  },
  {
    src: "/gallery/amir-study-bedroom.jpg",
    alt: "Bedroom with a built-in study desk and shelving by Ranzospace",
    label: "Bedroom Study Nook", location: "Mumbai", category: "Residential", area: "140 sq ft",
    description: "A built-in desk and floating shelves sized to a bedroom corner, with no space wasted.",
  },
  {
    src: "/gallery/priya-kitchen-black.jpg",
    alt: "Modular kitchen by Ranzospace Mumbai in oak and cream",
    label: "Modular Kitchen", location: "Mumbai", category: "Residential", area: "110 sq ft",
    description: "Oak veneer and cream shutters keep a compact kitchen light, warm and easy to clean.",
  },
  {
    src: "/gallery/amir-console-front.jpg",
    alt: "Living room by Ranzospace Mumbai with a floating oak TV console",
    label: "Floating TV Console", location: "Mumbai", category: "Residential", area: "540 sq ft",
    description: "A floating oak console and an arched, cove-lit wall frame the television as architecture.",
  },
  {
    src: "/gallery/priya-kids-study.jpg",
    alt: "Children's study corner by Ranzospace with built-in shelving",
    label: "Study Corner", location: "Mumbai", category: "Residential", area: "140 sq ft",
    description: "A built-in desk and shelving wall with a soft pink accent panel.",
  },
  {
    src: "/gallery/maddy-bedroom-tv.jpg",
    alt: "Bedroom by Ranzospace with a panelled TV wall and a white chest of drawers",
    label: "Bedroom", location: "Mumbai", category: "Residential", area: "380 sq ft",
    description: "Pale vertical panelling and daylight from a full-height window keep the room calm.",
  },
  {
    src: "/gallery/pramod-living-wide.jpg",
    alt: "Living room by Ranzospace with a cove ceiling, pooja niche and rust sofa",
    label: "Living Room", location: "Mumbai", category: "Residential", area: "640 sq ft",
    description: "A layered ceiling, a pooja niche and a rust sofa give an open living room its centre.",
  },
  {
    src: "/gallery/maddy-bedroom-dresser.jpg",
    alt: "Bedroom by Ranzospace with a timber panel wall and a blue chest of drawers",
    label: "Bedroom", location: "Mumbai", category: "Residential", area: "380 sq ft",
    description: "A timber feature wall and a blue chest of drawers add warmth against pale panelling.",
  },
  {
    src: "/gallery/pramod-bedroom-palm.jpg",
    alt: "Bedroom by Ranzospace with an illustrated palm headboard wall",
    label: "Bedroom", location: "Mumbai", category: "Residential", area: "360 sq ft",
    description: "An illustrated palm wallpaper sits inside a layered, backlit headboard frame.",
  },
  {
    src: "/gallery/priya-kids-reading.jpg",
    alt: "Child's reading corner by Ranzospace with a built-in desk and shelving",
    label: "Reading Corner", location: "Mumbai", category: "Residential", area: "140 sq ft",
    description: "A built-in desk, tall shelving and a window seat of light for a child's room.",
  },
  {
    src: "/gallery/rishi-bedroom-landscape.jpg",
    alt: "Bedroom by Ranzospace with a built-in study desk",
    label: "Bedroom and Study", location: "Mumbai", category: "Residential", area: "320 sq ft",
    description: "A bed, a study desk and a wall of shelving share one calm room.",
  },
  {
    src: "/gallery/rishi-bedroom-arch.jpg",
    alt: "Bedroom by Ranzospace with an arched, backlit headboard wall",
    label: "Bedroom", location: "Mumbai", category: "Residential", area: "300 sq ft",
    description: "An arched, backlit headboard wall frames the bed beneath soft cove light.",
  },
  {
    src: "/gallery/pramod-mandir.jpg",
    alt: "Pooja niche by Ranzospace with a backlit arched alcove",
    label: "Pooja Niche", location: "Mumbai", category: "Residential", area: "Custom",
    description: "A backlit, arched alcove gives the home a quiet place for daily prayer.",
  },
  {
    src: "/gallery/arch-concrete.jpg",
    alt: "Concrete residence with timber shutters by Ranzospace, Mumbai",
    label: "Concrete Residence", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "A board-formed concrete volume with folding timber shutters opening the home to its garden.",
  },
  {
    src: "/gallery/arch-facade.jpg",
    alt: "Residence by Ranzospace in concrete, timber and perforated metal",
    label: "The Residence", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "Concrete, timber and perforated metal resolved into one calm, layered facade.",
  },
  {
    src: "/gallery/arch-details-tl.jpg",
    alt: "Curved perforated metal screen above board-formed concrete by Ranzospace",
    label: "Perforated Metal and Concrete", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "A curved, perforated metal screen sits on a board-formed concrete plinth.",
  },
  {
    src: "/gallery/arch-shutters-tr.jpg",
    alt: "Folding timber shutters opening onto a timber deck by Ranzospace",
    label: "Folding Timber Shutters", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "Folding timber shutters open a living space to the deck and the garden beyond.",
  },
  {
    src: "/gallery/arch-sketch-elevation.jpg",
    alt: "Concept elevation sketch by Ranzospace, annotated with materials",
    label: "Concept Elevation", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "Every building begins as a line on paper, where proportion, light and material are first decided.",
  },
  {
    src: "/gallery/arch-details-tr.jpg",
    alt: "Timber soffit, fluted timber wall and glass balcony by Ranzospace",
    label: "Timber Soffit and Glass Balcony", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "A timber soffit and fluted wall wrap a glazed balcony over a curved concrete slab.",
  },
  {
    src: "/gallery/arch-garden-tr.jpg",
    alt: "Timber and glass pergola roof by Ranzospace",
    label: "Pergola Roof", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "Timber rafters and a glazed roof let the light through while shading the terrace.",
  },
  {
    src: "/gallery/arch-shutters-tl.jpg",
    alt: "Rounded concrete mass with a glass balustrade by Ranzospace",
    label: "Concrete Massing", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "A rounded concrete volume with a glass balustrade, above a dark fluted plinth.",
  },
  {
    src: "/gallery/arch-details-bl.jpg",
    alt: "Perforated steel gate, concrete wall and entry steps by Ranzospace",
    label: "Perforated Gate and Entry Steps", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "A perforated steel gate and a concrete wall frame a stepped entry with native planting.",
  },
  {
    src: "/gallery/arch-sketch-mass.jpg",
    alt: "Early massing sketch by Ranzospace with concrete and wood screen notes",
    label: "Massing Sketch", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "The first idea on paper: a concrete mass, a wood screen and a canopy.",
  },
  {
    src: "/gallery/arch-garden-tl.jpg",
    alt: "Perforated metal screen below a timber and glass pergola by Ranzospace",
    label: "Metal Screen and Pergola", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "A perforated metal screen sits beneath a timber and glass rooftop pergola.",
  },
  {
    src: "/gallery/arch-shutters-bl.jpg",
    alt: "Timber-slat carport canopy over a concrete plinth by Ranzospace",
    label: "Carport Canopy", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "A timber-slat canopy on slim steel columns shelters the carport and entry.",
  },
  {
    src: "/gallery/arch-details-br.jpg",
    alt: "Timber pergola canopy against a pale sky by Ranzospace",
    label: "Timber Canopy", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "Layered timber louvres on a steel frame project over a planted terrace.",
  },
  {
    src: "/gallery/arch-garden-bl.jpg",
    alt: "Steel lattice gate beside a concrete wall and planting by Ranzospace",
    label: "Steel Gate and Garden Wall", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "A steel lattice gate, a concrete wall and a rock garden, resolved as one threshold.",
  },
  {
    src: "/gallery/arch-shutters-br.jpg",
    alt: "Large-leaf planting against a concrete boundary wall by Ranzospace",
    label: "Concrete Wall and Foliage", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "Large-leaf planting against a raw concrete wall at the edge of the plot.",
  },
  {
    src: "/gallery/arch-garden-br.jpg",
    alt: "Ferns and bromeliads against a board-formed concrete wall by Ranzospace",
    label: "Native Planting", location: "Mumbai", category: "Architectural", area: "4,200 sq ft",
    description: "Ferns and bromeliads soften a board-formed concrete boundary wall.",
  },
  {
    src: "/gallery/maddy-wardrobe-fluted.jpg",
    alt: "Fluted timber and lacquer wardrobe wall by Ranzospace Mumbai",
    label: "Fluted Wardrobe Wall", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "Fluted oak panels and pale lacquer doors run as one continuous wardrobe wall.",
  },
  {
    src: "/gallery/pramod-console.jpg",
    alt: "Arched pale blue console cabinet by Ranzospace Mumbai",
    label: "Arched Console", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "A sculpted console in soft blue with arched detail, set against stone-patterned art.",
  },
  {
    src: "/gallery/rishi-bookcase.jpg",
    alt: "Built-in timber bookcase and partition by Ranzospace Mumbai",
    label: "Bookcase Partition", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "A grid bookcase doubles as a room divider, warm in oak and full of light.",
  },
  {
    src: "/gallery/priya-pink-wardrobe.jpg",
    alt: "Floor-to-ceiling pink wardrobe by Ranzospace Mumbai",
    label: "Kids Wardrobe", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "A full-height wardrobe in soft pink with scalloped detail and slim black handles.",
  },
  {
    src: "/gallery/rishi-study-unit.jpg",
    alt: "Built-in study desk with overhead shelving by Ranzospace Mumbai",
    label: "Study Unit", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "A desk, open shelving and a full wardrobe packed into a single wall.",
  },
  {
    src: "/gallery/priya-board-wood.jpg",
    alt: "Material board with marble, fluted oak and brass samples by Ranzospace",
    label: "Material Palette", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "Marble, fluted oak, brass and linen laid out together before a single piece is built.",
  },
  {
    src: "/gallery/rishi-pendant-corner.jpg",
    alt: "Entry corner by Ranzospace with woven pendant lights and an orange console",
    label: "Console Corner", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "An orange console and a cluster of woven pendants turn a corner into a feature.",
  },
  {
    src: "/gallery/priya-kitchen-oak.jpg",
    alt: "Modular kitchen by Ranzospace in oak veneer and cream",
    label: "Oak Modular Kitchen", location: "Mumbai", category: "Modular Furniture", area: "110 sq ft",
    description: "Oak veneer, cream shutters and a stone backsplash in a tidy L-shaped kitchen.",
  },
  {
    src: "/gallery/priya-kids-built-in.jpg",
    alt: "Children's bedroom built-ins by Ranzospace with arched shelves and a pink panel",
    label: "Kids Room Built-ins", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "Arched shelves and a scalloped pink panel built around a trundle bed.",
  },
  {
    src: "/gallery/maddy-wardrobe-wall.jpg",
    alt: "Wardrobe and headboard wall by Ranzospace in fluted oak and lacquer",
    label: "Wardrobe and Headboard Wall", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "Fluted oak and lacquer wrap the wardrobe and the headboard in one move.",
  },
  {
    src: "/gallery/priya-materials-still.jpg",
    alt: "Stacked wood, stone and marble panel samples chosen by Ranzospace",
    label: "Material Samples", location: "Mumbai", category: "Modular Furniture", area: "Custom",
    description: "Wood, stone and marble samples stacked together before a single piece is made.",
  },
];



function ProjectCard({ p, index, isMobile }: { p: typeof projects[0]; index: number; isMobile: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: isMobile ? "0px" : "-40px" });
  const [hovered, setHovered] = useState(false);
  const { openLightbox } = useLightbox();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={p.video ? undefined : () => openLightbox(p.src, p.alt)}
      data-cursor="hover"
      style={{ position: "relative", overflow: "hidden", cursor: p.video ? "default" : "pointer", aspectRatio: String(RATIOS[p.src] || 0.75), borderRadius: isMobile ? "16px" : "20px", background: "#141410" }}
    >
      <motion.div
        animate={{ scale: hovered && !isMobile ? 1.05 : 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0 }}
      >
        {p.video ? <AutoVideo src={p.video} poster={p.src} label={p.alt} /> : <Image src={p.src} alt={p.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 33vw" />}
      </motion.div>

      {/* Desktop: label on hover. Mobile: no label, clean image. */}
      {!isMobile && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(14,14,12,0.92) 0%, rgba(14,14,12,0.4) 55%, transparent 100%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 600, color: "#fefefe", letterSpacing: "-0.01em", marginBottom: "4px" }}>{p.label}</p>
          <p style={{ fontSize: "13px", color: "#c8c4bc", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 400, marginBottom: "10px" }}>
            {p.location} · {p.area}
          </p>
          <p style={{ fontSize: "12px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.6, opacity: 0.85 }}>{p.description}</p>
        </motion.div>
      )}

      {/* Category chip - desktop only */}
      {!isMobile && (
        <div style={{
          position: "absolute", top: "18px", left: "18px",
          background: "rgba(14,14,12,0.72)", backdropFilter: "blur(8px)",
          padding: "4px 12px", borderRadius: "100px",
        }}>
          <span style={{ fontSize: "11px", color: "#c8c4bc", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
            {p.category}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function WorkPage() {
  const isMobile = useBreakpoint(768);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeFilter, setActiveFilter] = useState("All");
  const { openLightbox } = useLightbox();

  const filtered = (() => {
    if (activeFilter !== "All") return projects.filter(p => p.category === activeFilter);
    // All: the films lead, then the three disciplines interleave
    const films = projects.filter(p => p.video);
    const by = ["Residential", "Architectural", "Modular Furniture"].map(c => projects.filter(p => p.category === c && !p.video));
    const mixed: typeof projects = [];
    for (let i = 0; by.some(g => i < g.length); i++) by.forEach(g => { if (g[i]) mixed.push(g[i]); });
    return [...films, ...mixed];
  })();
  const colCount = isMobile ? 2 : 3;
  const PAGE = isMobile ? 8 : 12;
  const [shown, setShown] = useState(PAGE);
  const isAll = activeFilter === "All";
  const visible = isAll ? filtered.slice(0, shown) : filtered;
  const hasMore = isAll && shown < filtered.length;
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [clipH, setClipH] = useState<number | null>(null);
  useEffect(() => { setShown(PAGE); }, [activeFilter, PAGE]);
  useEffect(() => {
    if (!hasMore) { setClipH(null); return; }
    const measure = () => {
      const hs = colRefs.current.filter(Boolean).map(c => (c as HTMLDivElement).offsetHeight);
      if (hs.length) setClipH(Math.max(0, Math.min(...hs) - 150));
    };
    measure();
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, [hasMore, shown, activeFilter, colCount]);
  const columns = (() => {
    const cols: (typeof projects)[] = Array.from({ length: colCount }, () => []);
    const heights = Array(colCount).fill(0);
    visible.forEach(p => {
      const i = heights.indexOf(Math.min(...heights));
      cols[i].push(p);
      heights[i] += 1 / (RATIOS[p.src] || 0.75);
    });
    return cols;
  })();

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: "#0e0e0c", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: isMobile ? `100px 20px var(--hero-gap)` : `140px ${PAD} var(--hero-gap)` }}>
          <div ref={heroRef} style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <motion.p
              style={{ fontSize: "12px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px" }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Portfolio
            </motion.p>
            {isMobile ? (
              <div>
                <motion.h1
                  style={{ fontSize: "clamp(44px, 11vw, 64px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "16px" }}
                  initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Our Work
                </motion.h1>
                <motion.p
                  style={{ fontSize: "15px", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75 }}
                  initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.2 }}
                >
                  100+ completed projects across Mumbai. Every space designed from life, not from a catalogue.
                </motion.p>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px" }}>
                <motion.h1
                  style={{ fontSize: "clamp(44px, 5vw, 88px)", fontWeight: 800, color: "#fefefe", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                  initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Our Work
                </motion.h1>
                <motion.p
                  style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, maxWidth: "380px", lineHeight: 1.75, paddingBottom: "8px" }}
                  initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.2 }}
                >
                  100+ completed projects across Mumbai. Every space designed from life, not from a catalogue.
                </motion.p>
              </div>
            )}
          </div>
        </section>

        {/* From sketch to structure - one real concept/built pairing, drag to compare */}
        <section style={{ padding: isMobile ? "0 20px var(--section-y)" : `0 ${PAD} var(--section-y)` }}>
          <div style={{
            maxWidth: MAX_W, margin: "0 auto",
            display: "flex", flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            gap: isMobile ? "28px" : "clamp(48px, 6vw, 96px)",
          }}>
            <div style={{ flex: "1 1 0", minWidth: 0 }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#F8931E", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                The Process
              </p>
              <h2 style={{ fontSize: isMobile ? "clamp(28px, 8vw, 40px)" : "clamp(32px, 3.2vw, 48px)", fontWeight: 700, color: "#fefefe", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
                From Sketch to Structure
              </h2>
              <p style={{ fontSize: isMobile ? "15px" : "clamp(15px, 1.1vw, 17px)", color: "#c8c4bc", fontWeight: 300, lineHeight: 1.75, maxWidth: "440px" }}>
                Every project starts as a line on paper. This concept elevation for our Mumbai residence became the concrete-and-timber facade our client walks through today. Drag to see the journey.
              </p>
            </div>

            <div style={{ flex: isMobile ? "1 1 auto" : "0 0 46%", minWidth: 0 }}>
              <BeforeAfterSlider
                beforeSrc={conceptPair.sketch.src}
                beforeAlt={conceptPair.sketch.alt}
                afterSrc={conceptPair.built.src}
                afterAlt={conceptPair.built.alt}
                beforeLabel="Concept"
                afterLabel="Realized"
                aspectRatio="4 / 5"
              />
            </div>
          </div>
        </section>

        {/* Filters */}
        <section style={{ padding: isMobile ? "0 20px var(--stack-lg)" : `0 ${PAD} var(--stack-lg)` }}>
          <div role="group" aria-label="Filter projects" style={{
            maxWidth: MAX_W, margin: "0 auto", display: "flex", flexWrap: "wrap",
            gap: isMobile ? "10px" : "14px",
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
                data-cursor="hover"
                style={{
                  padding: isMobile ? "0 20px" : "0 26px", minHeight: "44px", border: "none",
                  background: activeFilter === cat ? "#F8931E" : "#1b1b17",
                  color: activeFilter === cat ? "#0e0e0c" : "#c8c4bc",
                  borderRadius: "100px", fontSize: "14px", fontWeight: 500,
                  cursor: "none", transition: "all 0.25s ease", letterSpacing: "0.03em",
                  fontFamily: "inherit", whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section style={{ padding: isMobile ? "0 20px var(--section-y)" : `0 ${PAD} var(--section-y)` }}>
          <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
            <AnimatePresence mode="wait">
              <div style={{ position: "relative" }}>
                <div style={{
                  overflow: hasMore ? "hidden" : "visible",
                  maxHeight: hasMore && clipH !== null ? `${clipH}px` : undefined,
                  transition: "max-height 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}>
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", alignItems: "flex-start", gap: isMobile ? "10px" : "clamp(12px, 1.2vw, 18px)" }}
              >
                {columns.map((col, ci) => (
                  <div key={ci} ref={el => { colRefs.current[ci] = el; }} style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: isMobile ? "10px" : "clamp(12px, 1.2vw, 18px)" }}>
                    {col.map((p, i) => <ProjectCard key={p.src} p={p} index={i} isMobile={isMobile} />)}
                  </div>
                ))}
              </motion.div>
                </div>
                {hasMore && clipH !== null && (
                  <>
                    <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "min(300px, 45%)", pointerEvents: "none", background: "linear-gradient(to bottom, rgba(14,14,12,0) 0%, #0e0e0c 95%)" }} />
                    <div style={{ position: "absolute", left: 0, right: 0, bottom: "clamp(16px, 3vw, 40px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                      <button
                        type="button" onClick={() => setShown(n => n + PAGE)} data-cursor="hover"
                        style={{ minHeight: "52px", padding: "16px 40px", border: "none", borderRadius: "6px", background: "#F8931E", color: "#0e0e0c", fontSize: "15px", fontWeight: 700, fontFamily: "inherit", cursor: "pointer", width: isMobile ? "calc(100% - 8px)" : "auto" }}
                      >
                        Load more
                      </button>
                      <p aria-live="polite" style={{ fontSize: "13px", color: "#c8c4bc", fontWeight: 300 }}>Showing {visible.length} of {filtered.length}</p>
                    </div>
                  </>
                )}
              </div>
            </AnimatePresence>
          </div>
        </section>

      </main>
      <FooterSection />
    </>
  );
}
