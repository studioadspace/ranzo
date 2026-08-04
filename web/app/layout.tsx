import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ClientRoot from "@/components/ClientRoot";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ranzospace.in"),
  title: "Interior Design & Architecture Studio in Mumbai - Ranzospace",
  description: "Mumbai's most considered architecture and interior design studio. Residential, commercial, and hospitality spaces shaped for legacy, not just living. Ranzospace.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Interior Design & Architecture Studio in Mumbai - Ranzospace",
    description: "Mumbai's most considered architecture and interior design studio. Residential, commercial, and hospitality spaces shaped for legacy, not just living.",
    images: [{ url: "/interiors/amir-living-cove.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design & Architecture Studio in Mumbai - Ranzospace",
    description: "Mumbai's most considered architecture and interior design studio. Spaces shaped for legacy.",
    images: ["/interiors/amir-living-cove.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrumentSerif.variable}`}>
      <body><ClientRoot>{children}</ClientRoot></body>
    </html>
  );
}
