"use client";

import { Tabs, TabsContent, TabsItem } from "@/components/ui/Tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductPs from "./ProductPs";
import ProductThumbnail from "./ProductThumbnail";

const ProductSection = ({ product }) => {
  const { stocks = [] } = product || {};
  const isVariant = stocks.length > 0;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState(
    searchParams?.get("stock") || stocks[0]?._id || "",
  );

  useEffect(() => {
    if (tab && tab !== searchParams?.get("stock")) {
      const currentParams = new URLSearchParams(searchParams?.toString());
      currentParams.set("stock", tab);
      router.replace(`?${currentParams?.toString()}`, {
        scroll: false,
        replace: true,
      });
    }
  }, [tab]);

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <Tabs value={tab} setValue={setTab}>
          <TabsContent>
            {stocks?.map((stock, index) => (
              <TabsItem value={stock?._id} key={index}>
                <div className="flex flex-col items-center gap-y-6 md:gap-x-8 lg:flex-row xl:gap-x-12">
                  <ProductThumbnail
                    product={product}
                    stock={stock}
                    isVariant={isVariant}
                  />
                  <ProductPs
                    product={product}
                    stock={stock}
                    isVariant={isVariant}
                  />
                </div>
              </TabsItem>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductSection;
