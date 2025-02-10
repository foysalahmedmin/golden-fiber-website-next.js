import ProductCard from "@/components/partials/Cards/ProductCard";
import Sidebar from "@/components/partials/Sidebar";
import { Button } from "@/components/ui/Button";
import { Drawer, DrawerBackdrop, DrawerContent } from "@/components/ui/Drawer";
import { Pagination } from "@/components/ui/Pagination";
import { getAllProducts } from "@/network/products/api";
import { Menu } from "lucide-react";

const ProductSection = async () => {
  const { data: products } = await getAllProducts();
  return (
    <section>
      <>
        <div className="relative flex md:gap-x-6 xl:gap-x-8">
          <Drawer className="lg:drawer-open">
            <DrawerBackdrop />
            <DrawerContent
              size="sm"
              className="border-none bg-transparent md:w-80"
            >
              <aside className="self-stretch py-4 md:space-y-6 md:py-6 xl:py-8">
                <Sidebar className="space-y-4" />
              </aside>
            </DrawerContent>
          </Drawer>

          <div className="flex-1 space-y-6 py-6 md:space-y-8 md:py-8">
            <div className="flex w-full items-center justify-between gap-6 rounded-md bg-card py-4">
              <div>
                <Button
                  className="lg:hidden"
                  variant="none"
                  size="none"
                  shape="none"
                >
                  <Menu />
                </Button>
              </div>
              <div className="flex items-center gap-2"></div>
            </div>
            <div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {products?.map((item, index) => (
                  <ProductCard key={index} item={item} />
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between md:mt-8">
                <div></div>
                <Pagination pages={1} currentPage={1} />
              </div>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default ProductSection;
