"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StocksList = ({ className, stocks, stock }) => {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="inline-block text-xl">Colors:</span>
      <div className="flex flex-wrap justify-start gap-[0.5em] overflow-visible overflow-x-visible overflow-y-visible px-[0.25em]">
        {stocks?.map((item, i) => {
          const isActive = stock?._id === item?._id;
          return (
            <Link
              key={i}
              className={cn(
                "flex size-[1.5rem] overflow-hidden rounded-full after:hidden",
                {
                  "ring-[0.15rem] ring-muted-foreground/50 ring-offset-[0.15rem]":
                    isActive,
                },
              )}
              href={`${pathname}?stock=${item?._id}`}
              replace={true}
              scroll={false}
            >
              <Button
                style={{ background: item?.color?.code }}
                className="size-full rounded-full"
                variant="none"
                shape="icon"
                size="sm"
                asChild={true}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default StocksList;
