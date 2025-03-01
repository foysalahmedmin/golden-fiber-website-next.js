"use client";

import { Tabs, TabsContent, TabsItem } from "@/components/ui/Tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductPs from "./ProductPs";
import ProductThumbnail from "./ProductThumbnail";

const ProductContent = ({ product, stocks, isVariant }) => (
  <TabsContent>
    {stocks?.map((stock, index) => (
      <TabsItem value={stock?._id} key={index}>
        <div className="flex flex-col items-center gap-y-6 md:gap-x-8 lg:flex-row xl:gap-x-12">
          <ProductThumbnail
            product={product}
            stock={stock}
            isVariant={isVariant}
          />
          <ProductPs product={product} stock={stock} isVariant={isVariant} />
        </div>
      </TabsItem>
    ))}
  </TabsContent>
);

const ProductSection = ({ product }) => {
  const { stocks = [] } = product || {};
  const isVariant = stocks.length > 0;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedStockId = searchParams.get("stock");

  const [tab, setTab] = useState(stocks[0]?._id || "");

  useEffect(() => {
    if (selectedStockId) {
      setTab(selectedStockId);
    } else if (stocks[0]?._id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("stock", stocks[0]?._id);
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
        replace: true,
      });
    }
  }, [selectedStockId, stocks, router, pathname, searchParams]);

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        {isVariant ? (
          <Tabs value={tab}>
            <ProductContent
              product={product}
              stocks={stocks}
              isVariant={isVariant}
            />
          </Tabs>
        ) : (
          <div>
            <ProductContent
              product={product}
              stocks={stocks}
              isVariant={isVariant}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
