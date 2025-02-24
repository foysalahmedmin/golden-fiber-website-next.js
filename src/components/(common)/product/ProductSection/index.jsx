"use client";

import { Tabs, TabsContent } from "@/components/ui/Tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductPs from "./ProductPs";
import ProductThumbnail from "./ProductThumbnail";

const ProductSection = ({ product }) => {
  const { stocks = [] } = product || {};
  const isVariant = stocks.length > 0;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedColor = decodeURIComponent(searchParams.get("color") || "");

  const [tab, setTab] = useState(stocks[0]?._id || "");

  // Handle color selection from URL
  useEffect(() => {
    if (selectedColor) {
      const selectedStock = stocks?.find(
        (stock) => stock?.color?.code === selectedColor,
      );
      if (selectedStock) {
        setTab(selectedStock?._id);
      }
    } else if (stocks[0]?.color?.code) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("color", encodeURIComponent(stocks[0]?.color?.code));
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
        replace: true,
      });
    }
  }, [selectedColor, product, stocks, router, pathname, searchParams]);

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

// Extracted reusable content for better readability
const ProductContent = ({ product, stocks, isVariant }) => (
  <div className="flex flex-col items-center gap-y-6 md:gap-x-8 lg:flex-row xl:gap-x-12">
    <ProductThumbnail product={product} isVariant={isVariant} />
    <TabsContent className="flex-1">
      {stocks?.map((stock) => (
        <ProductPs
          key={stock._id}
          product={product}
          stock={stock}
          isVariant={isVariant}
        />
      ))}
    </TabsContent>
  </div>
);

export default ProductSection;
