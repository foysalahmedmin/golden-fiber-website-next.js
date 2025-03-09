import ProductSection from "@/components/(common)/shop/ProductSection";
import FlashSalesProductSection from "@/components/partials/Sections/FlashSalesProductSection";
import SubscriptionBanner from "@/components/partials/Sections/SubscriptionBanner";

const ShopePage = ({ searchParams }) => {
  return (
    <main>
      <div className="container">
        <SubscriptionBanner />
      </div>
      <div className="container">
        <ProductSection searchParams={searchParams} />
      </div>
      <div className="container">
        <hr />
      </div>
      <FlashSalesProductSection />
    </main>
  );
};

export default ShopePage;
