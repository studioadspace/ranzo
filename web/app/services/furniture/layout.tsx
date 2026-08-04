import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modular Furniture & Décor in Mumbai - Curated Selection | Ranzospace",
  description: "Curated modular furniture and décor in Mumbai. Living room, bedroom, kitchen, and dining furniture sourced for proportion, function, and aesthetics. Coordinated installation included.",
  openGraph: {
    title: "Modular Furniture & Décor in Mumbai - Curated Selection | Ranzospace",
    description: "Curated modular furniture and décor in Mumbai. Sourced, coordinated, and installed by our team. A considered edit for your space.",
    images: [{ url: "/interiors/amir-tv-unit-01.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/interiors/amir-tv-unit-01.jpg"],
  },
};

export default function FurnitureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
