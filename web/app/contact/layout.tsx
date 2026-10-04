import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Ranzospace - Interior Design & Architecture in Mumbai",
  description: "Get in touch with Ranzospace. Every conversation begins with your brief, not ours. Interior design, architecture, and furniture projects in Mumbai.",
  openGraph: {
    url: "/contact",
    siteName: "Ranzospace",
    locale: "en_IN",
    type: "website",
    title: "Contact Ranzospace - Interior Design & Architecture in Mumbai",
    description: "Start a conversation with Ranzospace. Interior design, architecture, and furniture projects in Mumbai.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
