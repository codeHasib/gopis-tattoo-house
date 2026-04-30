// "use client";

import AboutSection from "@/components/public/AboutSection";
import ArtistsSection from "@/components/public/ArtistsSection";
import BlogSection from "@/components/public/BlogSection";
import ContactSection from "@/components/public/ContactCompo";
import FeaturedTattoos from "@/components/public/FeaturedTattoos";
import Hero from "@/components/public/Hero";
import ReviewSection from "@/components/public/ReviewSection";

const PublicHomePage = () => {
  return (
    <div>
      <Hero></Hero>
      <AboutSection></AboutSection>
      <FeaturedTattoos></FeaturedTattoos>
      <ReviewSection></ReviewSection>
      <BlogSection></BlogSection>
      <ArtistsSection></ArtistsSection>
      <ContactSection></ContactSection>
    </div>
  );
};

export default PublicHomePage;
