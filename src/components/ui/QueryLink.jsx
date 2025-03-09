"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { forwardRef } from "react";

const QueryLink = forwardRef(
  (
    { href, params = {}, replace = true, scroll = false, className, ...props },
    ref,
  ) => {
    const searchParams = useSearchParams();
    const currentParams = new URLSearchParams(searchParams?.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        currentParams.set(key, value);
      }
    });

    return (
      <Link
        className={cn("", className)}
        href={`${href || ""}?${currentParams.toString()}`}
        replace={replace}
        scroll={scroll}
        ref={ref}
        {...props}
      />
    );
  },
);

QueryLink.displayName = "QueryLink";

export { QueryLink };
