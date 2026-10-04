import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ranzospace",
  description: "How Ranzospace handles the name, phone number and email you share through our enquiry forms. We use them only to reply to you and we never sell them.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Ranzospace",
    description: "What Ranzospace collects through its enquiry forms, how it is used, and how to ask for it to be deleted.",
    url: "/privacy",
    siteName: "Ranzospace",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.jpg"] },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
