import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modular Furniture & Décor in Mumbai - Curated Selection | Ranzospace",
  description: "Curated modular furniture and décor in Mumbai. Living room, bedroom, kitchen, and dining furniture sourced for proportion, function, and aesthetics. Coordinated installation included.",
  openGraph: {
    title: "Modular Furniture & Décor in Mumbai - Curated Selection | Ranzospace",
    description: "Curated modular furniture and décor in Mumbai. Sourced, coordinated, and installed by our team. Not a catalogue, a considered edit for your space.",
  },
};

export default function FurnitureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
