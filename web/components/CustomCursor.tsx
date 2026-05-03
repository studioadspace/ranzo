"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const dotSpringX = useSpring(dotX, { stiffness: 800, damping: 35 });
  const dotSpringY = useSpring(dotY, { stiffness: 800, damping: 35 });

  const isHovering = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        ringRef.current?.classList.add("scale-[2.5]", "border-[var(--accent)]", "bg-[rgba(248,147,30,0.08)]");
      }
    };
    const out = () => {
      ringRef.current?.classList.remove("scale-[2.5]", "border-[var(--accent)]", "bg-[rgba(248,147,30,0.08)]");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 pointer-events-none z-[9999] transition-all duration-300"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#F8931E] pointer-events-none z-[9999]"
        style={{ x: dotSpringX, y: dotSpringY }}
      />
    </>
  );
}
