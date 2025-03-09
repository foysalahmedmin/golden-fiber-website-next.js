"use client";

import { Button } from "@/components/ui/Button";
import { TabsTrigger } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";

const StocksList = ({ className, stocks }) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="inline-block text-xl">Colors:</span>
      <div className="flex flex-wrap justify-start gap-[0.5em] overflow-visible overflow-x-visible overflow-y-visible px-[0.25em]">
        {stocks?.map((stock, i) => {
          return (
            <TabsTrigger
              key={i}
              value={stock?._id}
              className="flex size-[1.5rem] overflow-hidden rounded-full border-0 after:hidden"
              activeClassName="ring-[0.15rem] ring-muted-foreground/50 ring-offset-[0.15rem]"
            >
              <Button
                style={{ background: stock?.color?.code }}
                className="size-full rounded-full"
                variant="none"
                shape="icon"
                size="sm"
                asChild={true}
              />
            </TabsTrigger>
          );
        })}
      </div>
    </div>
  );
};

export default StocksList;
