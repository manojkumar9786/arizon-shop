import HeroSection from "./HeroSection"
import FeaturedProducts from "./FeaturedProducts"
import CategorySection from "./CategorySection"
import TestimonialSection from "./TestimonialSection"
import PromoBanner from "./PromoBanner"

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
      <TestimonialSection />
    </div>
  )
}

export default HomePage
