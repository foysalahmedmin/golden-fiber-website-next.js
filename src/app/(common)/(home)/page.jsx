import BannerSection from "@/components/(common)/home/BannerSection";
import FeatureSection from "@/components/(common)/home/FeatureSection";
import InstagramSection from "@/components/(common)/home/InstagramSection";
import SpacialOfferSection from "@/components/(common)/home/SpacialOfferSection";
import TrendingProductSection from "@/components/(common)/home/TrendingProductSection";
import FlashSalesProductSection from "@/components/partials/Sections/FlashSalesProductSection";
import ServicesSection from "@/components/partials/Sections/ServicesSection";
import TestimonialSection from "@/components/partials/Sections/TestimonialSection";
import Categories from "@/components/partials/Sidebar/Categories";
import { titleGenerator } from "@/lib/utils";

export const metadata = {
  title: titleGenerator(["Home"]),
  description: "Investment management made simple",
};

const HomePage = () => {
  return (
    <main>
      <div className="container relative flex overflow-hidden md:gap-x-6 xl:gap-x-8">
        <aside className="hidden self-stretch py-4 md:w-60 md:py-6 lg:block xl:w-80 xl:py-8">
          <Categories className="h-full" />
        </aside>
        <div className="w-full flex-1 self-stretch py-4 md:py-6 lg:w-auto xl:py-8">
          <BannerSection />
        </div>
      </div>
      <div className="container">
        <hr />
      </div>
      <ServicesSection />
      <div className="container">
        <hr />
      </div>
      <FlashSalesProductSection />
      <div className="container">
        <hr />
      </div>
      {/* <CategorySection /> */}
      <TrendingProductSection />
      <SpacialOfferSection />
      <TestimonialSection />
      <FeatureSection />
      <InstagramSection />
    </main>
  );
};

export default HomePage;
