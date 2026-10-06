"use client";
import { useEffect, useState, type RefObject } from "react";

export function useInView(
  ref: RefObject<Element | null>,
  { once = false, margin = "0px" }: { once?: boolean; margin?: string } = {},
) {
  const [inView, setInView] = useState(false);
  const [node, setNode] = useState<Element | null>(null);

  useEffect(() => {
    if (ref.current !== node) setNode(ref.current);
  });

  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin: margin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, margin, once]);

  return inView;
}
