import ProductSection from "@/components/(common)/product/ProductSection";
import ProductTabSection from "@/components/(common)/product/ProductTabSection";
import RelatedProductSection from "@/components/(common)/product/RelatedProductSection";
import { getProductDetails } from "@/network/products/api";

const ProductPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductDetails(id);
  console.log(product);
  return (
    <main>
      <ProductSection product={product} />
      <ProductTabSection product={product} />
      <RelatedProductSection product={product} />
    </main>
  );
};

export default ProductPage;
