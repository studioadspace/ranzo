import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior Design Services in Mumbai - Full-Home & Commercial | Ranzospace",
  description: "Full-home and commercial interior design in Mumbai. Residential kitchens, bedrooms, living rooms, offices designed proportionally from start to finish. 2D/3D plans, AI simulations, 140-point quality check.",
  openGraph: {
    title: "Interior Design Services in Mumbai - Full-Home & Commercial | Ranzospace",
    description: "Full-home and commercial interior design in Mumbai. End-to-end design with 2D/3D plans, AI simulations, and complete on-site execution.",
    images: [{ url: "/interiors/amir-living-sofa.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/interiors/amir-living-sofa.jpg"],
  },
};

export default function InteriorDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
