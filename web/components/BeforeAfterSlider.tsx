"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

export default function BeforeAfterSlider({
  beforeSrc, beforeAlt, afterSrc, afterAlt,
  beforeLabel = "Concept", afterLabel = "Realized",
  aspectRatio = "4 / 5",
  mirrorBefore = false, mirrorAfter = false,
  beforeObjectPosition = "center center",
  afterObjectPosition = "center center",
}: {
  beforeSrc: string; beforeAlt: string;
  afterSrc: string; afterAlt: string;
  beforeLabel?: string; afterLabel?: string;
  aspectRatio?: string;
  mirrorBefore?: boolean; mirrorAfter?: boolean;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const stopDragging = () => { draggingRef.current = false; };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos(p => Math.max(0, p - 3));
    if (e.key === "ArrowRight") setPos(p => Math.min(100, p + 3));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
      data-cursor="hover"
      style={{
        position: "relative", aspectRatio, overflow: "hidden", borderRadius: "10px",
        cursor: "ew-resize", userSelect: "none", touchAction: "none", background: "#0e0e0c",
      }}
    >
      {/* After (base layer - always fully visible on the right of the handle) */}
      <Image
        src={afterSrc} alt={afterAlt} fill
        style={{ objectFit: "cover", objectPosition: afterObjectPosition, pointerEvents: "none", transform: mirrorAfter ? "scaleX(-1)" : undefined }}
        sizes="(max-width: 768px) 100vw, 900px"
      />

      {/* Before (clipped to the left of the handle) */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={beforeSrc} alt={beforeAlt} fill
          style={{ objectFit: "cover", objectPosition: beforeObjectPosition, pointerEvents: "none", transform: mirrorBefore ? "scaleX(-1)" : undefined }}
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>

      {/* Labels */}
      <span style={{
        position: "absolute", top: "16px", left: "16px", fontSize: "11px", letterSpacing: "0.1em",
        textTransform: "uppercase", fontWeight: 600, color: "#fefefe",
        background: "rgba(14,14,12,0.55)", padding: "5px 12px", borderRadius: "100px", pointerEvents: "none",
      }}>
        {beforeLabel}
      </span>
      <span style={{
        position: "absolute", top: "16px", right: "16px", fontSize: "11px", letterSpacing: "0.1em",
        textTransform: "uppercase", fontWeight: 600, color: "#0e0e0c",
        background: "#F8931E", padding: "5px 12px", borderRadius: "100px", pointerEvents: "none",
      }}>
        {afterLabel}
      </span>

      {/* Divider line */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "2px",
        background: "#fefefe", transform: "translateX(-1px)", pointerEvents: "none",
      }} />

      {/* Drag handle */}
      <div
        role="slider"
        aria-label="Drag to compare the concept sketch with the realized build"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{
          position: "absolute", top: "50%", left: `${pos}%`, width: "44px", height: "44px",
          transform: "translate(-50%, -50%)", borderRadius: "100%",
          background: "#fefefe", display: "flex", alignItems: "center", justifyContent: "center", gap: "1px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)", cursor: "ew-resize", pointerEvents: "none",
        }}
      >
        <CaretLeft size={12} weight="bold" color="#0e0e0c" />
        <CaretRight size={12} weight="bold" color="#0e0e0c" />
      </div>
    </div>
  );
}
