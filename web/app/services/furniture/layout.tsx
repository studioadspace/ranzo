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

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Furniture & Decor",
  "provider": { "@id": "https://ranzospace.in/#organization" },
  "serviceType": "Interior Furnishing",
  "description": "Curated modular furniture and decor selection for Mumbai homes. Sourced for proportion, material, and function. Includes custom fabrication options and white-glove delivery and installation.",
  "areaServed": { "@type": "City", "name": "Mumbai" },
  "url": "https://ranzospace.in/services/furniture"
};

export default function FurnitureLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
