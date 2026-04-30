import AboutSection from "@/components/public/AboutSection";
import FeaturedTattoos from "@/components/public/FeaturedTattoos";
import Hero from "@/components/public/Hero";
import ReviewSection from "@/components/public/ReviewSection";

const PublicHomePage = () => {
  return (
    <div className="mt-24">
      <Hero></Hero>
      <AboutSection></AboutSection>
      <FeaturedTattoos></FeaturedTattoos>
      <ReviewSection></ReviewSection>
    </div>
  );
};

export default PublicHomePage;
