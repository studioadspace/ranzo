import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/services/interior-design" },
  title: "Interior Design Services in Mumbai - Full-Home & Commercial | Ranzospace",
  description: "Full-home and commercial interior design in Mumbai. Residential kitchens, bedrooms, living rooms, offices designed proportionally from start to finish. 2D/3D plans, AI simulations, 140-point quality check.",
  openGraph: {
    url: "/services/interior-design",
    siteName: "Ranzospace",
    locale: "en_IN",
    type: "website",
    title: "Interior Design Services in Mumbai - Full-Home & Commercial | Ranzospace",
    description: "Full-home and commercial interior design in Mumbai. End-to-end design with 2D/3D plans, AI simulations, and complete on-site execution.",
    images: [{ url: "/og-interior.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-interior.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Interior Design",
  "provider": { "@id": "https://ranzospace.in/#organization" },
  "serviceType": "Interior Design",
  "description": "Full-home and commercial interior design in Mumbai. Covers kitchens, bedrooms, living areas, workspaces, and storage with 2D/3D plans, AI simulations, and complete on-site execution including a 140-point quality check.",
  "areaServed": { "@type": "City", "name": "Mumbai" },
  "url": "https://ranzospace.in/services/interior-design"
};

export default function InteriorDesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
