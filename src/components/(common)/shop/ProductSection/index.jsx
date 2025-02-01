import ProductCard from "@/components/partials/Cards/ProductCard";
import { Pagination } from "@/components/ui/Pagination";
import { SectionTitle, Subtitle, Title } from "@/components/ui/SectionTitle";
import { getAllProducts } from "@/network/products/api";

const ProductSection = async () => {
  const { data: products } = await getAllProducts();
  return (
    <section>
      <div>
        <div className="flex flex-wrap items-end gap-4">
          <SectionTitle>
            <Subtitle>Products</Subtitle>
            <Title>All Products</Title>
          </SectionTitle>
        </div>
        <div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between md:mt-8">
            <div></div>
            <Pagination pages={5} currentPage={2} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
