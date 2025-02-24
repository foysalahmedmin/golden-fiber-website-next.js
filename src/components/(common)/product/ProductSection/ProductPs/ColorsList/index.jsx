"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const ColorsList = ({ className, colors }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("color");
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="inline-block text-xl">Colors:</span>
      <div className="flex-wrap justify-start gap-[0.5em] overflow-visible overflow-x-visible overflow-y-visible px-[0.25em]">
        {colors?.map((color, i) => {
          const isActive = selectedColor === color?.code;
          return (
            <Link
              key={i}
              className="flex size-[1.5rem] overflow-hidden rounded-full after:hidden"
              activeClassName="ring-[0.15rem] ring-muted-foreground/50 ring-offset-[0.15rem]"
              href={`${pathname}?color=${encodeURIComponent(color?.code)}`}
              replace={true}
              scroll={false}
            >
              <Button
                style={{ background: color?.code }}
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

export default ColorsList;
