import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Interior Design, Architecture & Furniture in Mumbai | Ranzospace",
  description: "Full-home interior design, architecture, and curated furniture services in Mumbai. From concept to execution with 140 quality checks and complete accountability.",
  openGraph: {
    title: "Services - Interior Design, Architecture & Furniture in Mumbai | Ranzospace",
    description: "Full-home interior design, architecture, and curated furniture services in Mumbai. End-to-end project management with 140 quality checks.",
    images: [{ url: "/architecture/arch-01.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/architecture/arch-01.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
