import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ranzospace – Interior Design & Architecture Studio in Mumbai",
  description: "Meet the team behind Ranzospace. Honest design philosophy, 7+ years of experience, 100+ completed projects across Mumbai. We design spaces for how you actually live.",
  openGraph: {
    title: "About Ranzospace – Interior Design & Architecture Studio in Mumbai",
    description: "Meet the team behind Ranzospace. Honest design philosophy, 7+ years of experience, 100+ completed projects across Mumbai.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
