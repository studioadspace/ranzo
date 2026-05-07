"use client";
import LightboxProvider from "@/components/LightboxProvider";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return <LightboxProvider>{children}</LightboxProvider>;
}
