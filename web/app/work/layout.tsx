import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Interior Design & Architecture Projects in Mumbai | Ranzospace",
  description: "100+ completed design projects across Mumbai. Residential interiors, architecture, and custom furniture. Proportional, considered, built to last.",
  openGraph: {
    title: "Portfolio - Interior Design & Architecture Projects in Mumbai | Ranzospace",
    description: "100+ completed design projects across Mumbai. Residential interiors, architecture, and custom furniture. Built to last.",
    images: [{ url: "/projects-photos/pramod-02.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/projects-photos/pramod-02.jpg"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
