import {
  Tabs,
  TabsContent,
  TabsItem,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";

const ProductTabSection = ({ product }) => {
  return (
    <section className="container">
      <div className="rounded-md border">
        <div className="p-6 md:p-8">
          <Tabs value="description">
            <TabsList className="mb-6 gap-2 border-b md:mb-8 md:justify-start">
              <TabsTrigger value="description" activeClassName="shadow-inner">
                <span className="inline-block px-4 py-1 text-xl font-semibold capitalize md:text-2xl">
                  Description
                </span>
              </TabsTrigger>
              {/* <TabsTrigger value="reviews" activeClassName="shadow-inner">
                <span className="inline-block px-4 py-1 text-xl font-semibold capitalize md:text-2xl">
                  Reviews <span>({5})</span>
                </span>
              </TabsTrigger> */}
            </TabsList>
            <TabsContent>
              <TabsItem value="description">
                <ProductDescription product={product} />
              </TabsItem>
              <TabsItem value="reviews">
                <ProductReviews product={product} />
              </TabsItem>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ProductTabSection;
