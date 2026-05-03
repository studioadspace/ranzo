import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Ranzospace – Interior Design & Architecture in Mumbai",
  description: "Get in touch with Ranzospace. Talk to us about your interior design, architecture, or furniture project in Mumbai. Honest conversation, no templates.",
  openGraph: {
    title: "Contact Ranzospace – Interior Design & Architecture in Mumbai",
    description: "Contact Ranzospace to discuss your design project in Mumbai. We work on residential, commercial, and furniture projects.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
