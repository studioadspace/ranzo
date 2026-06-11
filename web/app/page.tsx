import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import TheCraftSection from "@/components/TheCraftSection";
import RecentWorksSection from "@/components/RecentWorksSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import OurStorySection from "@/components/OurStorySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FounderCTASection from "@/components/FounderCTASection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="bg-[#0e0e0c] min-h-screen">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <TheCraftSection />
      <RecentWorksSection />
      <WhatWeDoSection />
      <OurStorySection />
      <TestimonialsSection />
      <FounderCTASection />
      <FooterSection />
    </main>
  );
}
