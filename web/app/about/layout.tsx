import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ranzospace - Interior Design & Architecture Studio in Mumbai",
  description: "Meet the team behind Ranzospace. A considered design philosophy, 7+ years of experience, 100+ completed projects across Mumbai. Spaces shaped for legacy.",
  openGraph: {
    title: "About Ranzospace - Interior Design & Architecture Studio in Mumbai",
    description: "Meet the team behind Ranzospace. 7+ years of experience, 100+ completed projects across Mumbai. Spaces shaped for legacy.",
    images: [{ url: "/projects-photos/pramod-02.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/projects-photos/pramod-02.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
