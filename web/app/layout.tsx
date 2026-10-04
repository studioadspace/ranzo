import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import ClientRoot from "@/components/ClientRoot";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

const serifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const serifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ranzospace.in"),
  alternates: { canonical: "/", types: { "text/plain": [{ url: "/llms.txt", title: "LLMs.txt" }] } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "Interior design and architecture",
  title: "Interior Design & Architecture Studio in Mumbai - Ranzospace",
  description: "Mumbai's most considered architecture and interior design studio. Residential, commercial, and hospitality spaces shaped for legacy, not just living. Ranzospace.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-og.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/favicon-og.png", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: "Interior Design & Architecture Studio in Mumbai - Ranzospace",
    description: "Mumbai's most considered architecture and interior design studio. Residential, commercial, and hospitality spaces shaped for legacy, not just living.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Ranzospace, interior design and architecture studio in Mumbai" }],
    url: "/",
    siteName: "Ranzospace",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design & Architecture Studio in Mumbai - Ranzospace",
    description: "Mumbai's most considered architecture and interior design studio. Spaces shaped for legacy.",
    images: ["/og-default.jpg"],
  },
};

const SITE = "https://ranzospace.in";

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      "name": "Ranzospace",
      "url": SITE,
      "logo": { "@type": "ImageObject", "url": `${SITE}/favicon-og.png`, "width": 512, "height": 512 },
      "image": `${SITE}/og-default.jpg`,
      "description": "Interior design and architecture studio in Mumbai. Residential, commercial and hospitality spaces designed and built end to end.",
      "foundingDate": "2018",
      "founder": { "@type": "Person", "name": "Manas Makwana", "jobTitle": "Architect and Founder" },
      "email": "info@ranzospace.in",
      "telephone": "+91 96991 47145",
      "contactPoint": [{
        "@type": "ContactPoint", "contactType": "customer service", "email": "info@ranzospace.in",
        "telephone": "+91 96991 47145", "areaServed": "IN", "availableLanguage": ["English", "Hindi"]
      }],
      "address": { "@type": "PostalAddress", "addressLocality": "Mumbai", "addressRegion": "Maharashtra", "addressCountry": "IN" },
      "areaServed": ["Mumbai", "Thane", "Navi Mumbai"],
      "knowsAbout": ["Interior design", "Architecture", "Space planning", "Custom furniture", "Modular kitchens", "Material specification"],
      "sameAs": ["https://instagram.com/ranzospace", "https://linkedin.com/company/ranzospace"]
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE}/#localbusiness`,
      "name": "Ranzospace",
      "url": SITE,
      "image": `${SITE}/og-default.jpg`,
      "description": "Interior design and architecture studio in Mumbai. Residential, commercial and hospitality spaces designed for legacy.",
      "telephone": "+91 96991 47145",
      "email": "info@ranzospace.in",
      "priceRange": "₹₹₹",
      "parentOrganization": { "@id": `${SITE}/#organization` },
      "address": { "@type": "PostalAddress", "addressLocality": "Mumbai", "addressRegion": "Maharashtra", "addressCountry": "IN" },
      "geo": { "@type": "GeoCoordinates", "latitude": "19.0760", "longitude": "72.8777" },
      "areaServed": ["Mumbai", "Thane", "Navi Mumbai"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Ranzospace services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Design", "url": `${SITE}/services/interior-design`, "areaServed": "Mumbai" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Architecture", "url": `${SITE}/services/architecture`, "areaServed": "Mumbai" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Furniture and Decor", "url": `${SITE}/services/furniture`, "areaServed": "Mumbai" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Design Consultation", "url": `${SITE}/services/design-consultation`, "areaServed": "Mumbai" } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      "url": SITE,
      "name": "Ranzospace",
      "inLanguage": "en-IN",
      "publisher": { "@id": `${SITE}/#organization` }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${serifText.variable} ${serifDisplay.variable}`}>
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="alternate" type="text/markdown" title="Ranzospace full reference for LLMs" href="/llms-full.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body><ClientRoot>{children}</ClientRoot></body>
    </html>
  );
}
