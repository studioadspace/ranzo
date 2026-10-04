import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Ranzospace - Interior Design & Architecture Studio in Mumbai",
  description: "Meet the team behind Ranzospace. A considered design philosophy, 8+ years of experience, 100+ completed projects across Mumbai. Spaces shaped for legacy.",
  openGraph: {
    url: "/about",
    siteName: "Ranzospace",
    locale: "en_IN",
    type: "website",
    title: "About Ranzospace - Interior Design & Architecture Studio in Mumbai",
    description: "Meet the team behind Ranzospace. 8+ years of experience, 100+ completed projects across Mumbai. Spaces shaped for legacy.",
    images: [{ url: "/og-about.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-about.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
