import ProductCard from "@/components/partials/Cards/ProductCard";
import Sidebar from "@/components/partials/Sidebar";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { QueryPagination } from "@/components/ui/QueryPagination";
import { getAllProducts } from "@/network/products/api";
import { Menu } from "lucide-react";
import ProductSort from "./ProductSort";

const ProductSection = async ({ searchParams }) => {
  const {
    page = 1,
    limit = 12,
    category,
    sub_category,
    colors,
    price_min,
    price_max,
    sort,
  } = await searchParams;
  const { data: products, total = 0 } = await getAllProducts({
    page,
    limit,
    category,
    sub_category,
    colors,
    price_min,
    price_max,
    sort,
  });
  return (
    <section>
      <Drawer className="relative flex md:gap-x-6 lg:drawer-open xl:gap-x-8">
        <>
          <DrawerBackdrop />
          <DrawerContent
            size="sm"
            className="border-none bg-transparent md:w-80"
          >
            <aside className="self-stretch py-4 md:space-y-6 md:py-6 xl:py-8">
              <Sidebar className="space-y-4" />
            </aside>
          </DrawerContent>
        </>

        <div className="flex-1 space-y-6 py-6 md:space-y-8 md:py-8">
          <div className="flex w-full items-center justify-between gap-6 rounded-md border px-4 py-4">
            <div>
              <DrawerTrigger
                className="flex items-center"
                variant="none"
                size="none"
                shape="none"
              >
                <Menu />
              </DrawerTrigger>
            </div>
            <ProductSort />
          </div>
          <div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {products?.map((item, index) => (
                <ProductCard key={index} item={item} />
              ))}
            </div>
            {total === 0 && (
              <div className="flex h-48 items-center justify-center">
                <p className="text-gray-400">No products found</p>
              </div>
            )}
            {total > 0 && (
              <div className="mt-6 flex items-center justify-between md:mt-8">
                <div></div>
                <QueryPagination
                  pages={Math.ceil(total / limit)}
                  currentPage={page}
                />
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </section>
  );
};

export default ProductSection;
