"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

const BayNowButton = forwardRef(({ className, children = <span>
      Bay Now
    </span>, ...props }, ref) => {
  return (
    <Button
      as={Link}
      href="/checkout"
      className={cn("", className)}
      {...props}
      ref={ref}
    >
      {children}
    </Button>
  );
});

BayNowButton.displayName = "AddToCardButton";

export default BayNowButton;
