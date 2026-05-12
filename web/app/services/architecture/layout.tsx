import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture Services in Mumbai - Design & Space Planning | Ranzospace",
  description: "Architecture and space planning in Mumbai. From concept design to construction documents. Schematic design, 3D modeling, structural coordination, building permits, site supervision.",
  openGraph: {
    title: "Architecture Services in Mumbai - Design & Space Planning | Ranzospace",
    description: "Architecture and space planning in Mumbai. Concept to construction documents with 3D modeling and structural coordination.",
  },
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
