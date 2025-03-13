"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { forwardRef } from "react";

const trimPath = (path = "") => {
  return path?.replace(/^\/|\/$/g, "");
};

const QueryLink = forwardRef(
  (
    {
      href,
      query = {},
      replace = true,
      scroll = false,
      className,
      activeClassName,
      ...props
    },
    ref,
  ) => {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const currentParams = new URLSearchParams(searchParams?.toString());

    const isActive =
      (!href || trimPath(pathName) === trimPath(href)) &&
      Object.entries(query)?.every(
        ([key, value]) => currentParams.get(key) === value,
      );

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && !isActive) {
        currentParams.set(key, value);
      }
    });

    const endpoint = isActive
      ? ""
      : `${href || ""}?${currentParams.toString()}`;

    const Comp = isActive ? "button" : Link;
    return (
      <Link
        className={cn(className, {
          [cn("", activeClassName)]: isActive,
        })}
        href={endpoint}
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
