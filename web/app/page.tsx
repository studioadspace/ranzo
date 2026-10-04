import { MotionConfig } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import TheCraftSection from "@/components/TheCraftSection";
import RecentWorksSection from "@/components/RecentWorksSection";
import MotionSection from "@/components/MotionSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import OurStorySection from "@/components/OurStorySection";
import TestimonialsReelSection from "@/components/TestimonialsReelSection";
import FounderCTASection from "@/components/FounderCTASection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
    <main className="bg-[#0e0e0c] min-h-screen">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <TheCraftSection />
      <RecentWorksSection />
      <MotionSection />
      <WhatWeDoSection />
      <OurStorySection />
      {/* TestimonialsSection hidden per client request - TestimonialsReelSection replaces it */}
      <TestimonialsReelSection />
      <FounderCTASection />
      <FooterSection />
    </main>
    </MotionConfig>
  );
}
