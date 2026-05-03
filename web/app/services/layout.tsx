import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services – Interior Design, Architecture & Furniture in Mumbai | Ranzospace",
  description: "Full-home interior design, architecture, and curated furniture services in Mumbai. From concept to execution—140 quality checks, complete accountability.",
  openGraph: {
    title: "Services – Interior Design, Architecture & Furniture in Mumbai | Ranzospace",
    description: "Full-home interior design, architecture, and curated furniture services in Mumbai. End-to-end project management with 140 quality checks.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
