"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import LightboxProvider from "@/components/LightboxProvider";

// Pages open with fixed elements (cursor, navbar), so Next can treat the top as already visible and keep the old scroll position
function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <LightboxProvider>
      <ScrollToTop />
      {children}
    </LightboxProvider>
  );
}
