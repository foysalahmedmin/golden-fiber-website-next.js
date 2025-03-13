"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";

const BayNowButton = forwardRef(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Button className={cn("", className)} {...props} ref={ref}>
      {children}
    </Button>
  );
});

BayNowButton.displayName = "BayNowButton";

export default BayNowButton;
