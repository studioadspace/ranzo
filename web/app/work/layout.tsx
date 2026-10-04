import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Portfolio - Interior Design & Architecture Projects in Mumbai | Ranzospace",
  description: "100+ completed design projects across Mumbai. Residential interiors, architecture, and custom furniture. Proportional, considered, built to last.",
  openGraph: {
    url: "/work",
    siteName: "Ranzospace",
    locale: "en_IN",
    type: "website",
    title: "Portfolio - Interior Design & Architecture Projects in Mumbai | Ranzospace",
    description: "100+ completed design projects across Mumbai. Residential interiors, architecture, and custom furniture. Built to last.",
    images: [{ url: "/og-work.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-work.jpg"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
