import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services - Interior Design, Architecture & Furniture in Mumbai | Ranzospace",
  description: "Full-home interior design, architecture, and curated furniture services in Mumbai. From concept to execution with 140 quality checks and complete accountability.",
  openGraph: {
    url: "/services",
    siteName: "Ranzospace",
    locale: "en_IN",
    type: "website",
    title: "Services - Interior Design, Architecture & Furniture in Mumbai | Ranzospace",
    description: "Full-home interior design, architecture, and curated furniture services in Mumbai. End-to-end project management with 140 quality checks.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
