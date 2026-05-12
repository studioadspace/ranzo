import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Interior Design & Architecture Projects in Mumbai | Ranzospace",
  description: "100+ completed design projects: residential interiors, commercial spaces, modular kitchens, and custom furniture. Browse our portfolio of honest, proportional design across Mumbai.",
  openGraph: {
    title: "Portfolio - Interior Design & Architecture Projects in Mumbai | Ranzospace",
    description: "100+ completed design projects: residential interiors, commercial spaces, modular kitchens, and custom furniture across Mumbai.",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
