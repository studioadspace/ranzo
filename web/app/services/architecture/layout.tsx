import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture Services in Mumbai - Design & Space Planning | Ranzospace",
  description: "Architecture and space planning in Mumbai. From concept design to construction documents. Schematic design, 3D modeling, structural coordination, building permits, site supervision.",
  openGraph: {
    title: "Architecture Services in Mumbai - Design & Space Planning | Ranzospace",
    description: "Architecture and space planning in Mumbai. Concept to construction documents with 3D modeling and structural coordination.",
    images: [{ url: "/architecture/arch-01.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/architecture/arch-01.jpg"],
  },
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
