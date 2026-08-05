import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Consultation - Where Your Legacy Begins | Ranzospace",
  description: "A focused design consultation with Ranzospace. We listen to your lifestyle, your vision, and your space's potential before drawing a single line. Clarity on direction, materials, and budget.",
  openGraph: {
    title: "Design Consultation | Ranzospace",
    description: "Every space begins with a conversation. Our design consultation gives you clarity on design direction, materials, and budget before a single line is drawn.",
    images: [{ url: "/interiors/amir-study-nook.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/interiors/amir-study-nook.jpg"],
  },
};

export default function DesignConsultationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
