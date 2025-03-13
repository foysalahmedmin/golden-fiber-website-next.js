"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "./Button";
import { QueryLink } from "./QueryLink";

const QueryPagination = forwardRef(
  (
    { href = "", pages = 0, currentPage = 0, className, pageButton, ...props },
    ref,
  ) => {
    const pagesArray = Array.from({ length: +pages }, (_, i) => i + 1);
    return (
      <div
        className={cn("primary inline-flex items-center gap-2", className)}
        {...props}
        ref={ref}
      >
        <Button
          as={QueryLink}
          href={href}
          query={{ page: +currentPage > 1 ? +currentPage - 1 : 1 }}
          className="rounded-full"
          shape="icon"
          disabled={+currentPage <= 1}
        >
          <ArrowLeft />
        </Button>
        <>
          {pagesArray.map((page) => (
            <PageButton
              href={href}
              key={page}
              pageNumber={page}
              currentPage={+currentPage}
              {...pageButton}
            />
          ))}
        </>
        <Button
          as={QueryLink}
          href={href}
          query={{ page: +currentPage < pages ? +currentPage + 1 : +pages }}
          className="rounded-full"
          shape="icon"
          disabled={+currentPage >= +pages}
        >
          <ArrowRight />
        </Button>
      </div>
    );
  },
);
QueryPagination.displayName = "QueryPagination";

export const PageButton = forwardRef(
  (
    {
      href = "",
      pageNumber,
      currentPage = 0,
      className,
      activeClassName,
      shape = "icon",
      size = "sm",
      variant = "outline",
      ...props
    },
    ref,
  ) => {
    const isActive = pageNumber === currentPage;
    return (
      <Button
        as={QueryLink}
        href={href}
        query={{ page: pageNumber }}
        className={cn("rounded-full text-sm", className, {
          [cn(
            "border-primary bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
            activeClassName,
          )]: isActive,
        })}
        shape={shape}
        size={size}
        variant={variant}
        {...props}
        ref={ref}
      >
        {pageNumber}
      </Button>
    );
  },
);
PageButton.displayName = "PageButton";

export { QueryPagination };
